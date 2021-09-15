import ValidationSpecError from '../error/ValidationSpecError';
import ValidationError from '../error/ValidationError';

type CustomValidator<T> = (value: T) => boolean;

type CustomValidators<T> = {
  [validatorName: string]: CustomValidator<T>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default abstract class VBase<T> {
  private static readonly customValidators: CustomValidators<any> = {};

  static registerCustomValidator<T>(validatorName: string, validateFunc: CustomValidator<T>): void | never {
    if (this.customValidators[validatorName]) {
      throw new Error(`Validator '${validatorName}' already exists`);
    }

    this.customValidators[validatorName] = validateFunc;
  }

  static getCustomValidator(validatorName: string): CustomValidator<any> {
    return VBase.customValidators[validatorName];
  }

  protected static validateByCustomValidator<T>(
    validationSpec: string,
    value: string | number | T[],
    varName?: string
  ): void | never {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!VBase.customValidators[validatorName]) {
        throw new ValidationSpecError('Custom validator not registered with name: ' + validatorName);
      }
      if (!VBase.customValidators[validatorName](value)) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' does not match custom validator: ${validatorName}`
            : `Value does not match custom validator: ${validatorName}`
        );
      }
    }
  }

  protected static validateNumericRange(
    validationSpec: string,
    value: number,
    parseNumber: (str: string) => number,
    [defaultMinValue, defaultMaxValue]: [number, number],
    varName?: string
  ): void | never {
    if (validationSpec.includes(',')) {
      const [minValueStr, maxValueStr] = validationSpec.split(',');
      let minValue = parseNumber(minValueStr);
      let maxValue = parseNumber(maxValueStr);

      if (minValueStr === '') {
        minValue = defaultMinValue;
      }

      if (maxValueStr === '') {
        maxValue = defaultMaxValue;
      }

      if (isNaN(minValue)) {
        throw new ValidationSpecError('Invalid minValue specified in validation spec: ' + validationSpec);
      }

      if (isNaN(maxValue)) {
        throw new ValidationSpecError('Invalid maxValue specified in validation spec: ' + validationSpec);
      }

      if (value < minValue || value > maxValue) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is not in allowed range: [${minValue}, ${maxValue}]`
            : `Value is not in allowed range: [${minValue}, ${maxValue}]`
        );
      }
    }
  }

  protected static validatePositiveValue(
    validationSpec: string,
    value: number,
    varName?: string
  ): void | never {
    if (validationSpec === 'positive' && value <= 0) {
      throw new ValidationError(
        varName ? `Value in '${varName}' must be positive` : `Value must be positive`
      );
    }
  }

  protected static validateNegativeValue(
    validationSpec: string,
    value: number,
    varName?: string
  ): void | never {
    if (validationSpec === 'negative' && value >= 0) {
      throw new ValidationError(
        varName ? `Value in '${varName}' must be negative` : `Value must be negative`
      );
    }
  }

  protected static validateLength<T>(
    validationSpec: string,
    value: string | T[],
    varName?: string
  ): void | never {
    if (validationSpec.includes(',')) {
      const [minLengthStr, maxLengthStr] = validationSpec.split(',');
      let minLength = parseInt(minLengthStr, 10);
      const maxLength = parseInt(maxLengthStr, 10);

      if (minLengthStr === '') {
        minLength = 0;
      }

      if (isNaN(minLength)) {
        throw new ValidationSpecError('Invalid minLength specified in validation spec');
      }

      if (isNaN(maxLength)) {
        throw new ValidationSpecError('Invalid maxLength specified in validation spec');
      }

      if (value.length < minLength) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is shorter than required minimum length: ${minLength}`
            : `Value is shorter than required minimum length: ${minLength}`
        );
      }

      if (value.length > maxLength) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is longer than allowed maximum length: ${maxLength}`
            : `Value is longer than allowed maximum length: ${maxLength}`
        );
      }
    }
  }

  abstract get value(): T;
}
