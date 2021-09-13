import ValidationSpecError from '../error/ValidationSpecError';
import ValidationError from '../error/ValidationError';

type CustomValidator = (value: number | string) => boolean;

type CustomValidators = {
  [validatorName: string]: CustomValidator;
};

export default class VBase {
  private static readonly customValidators: CustomValidators = {};

  static registerCustomValidator(validatorName: string, validateFunc: CustomValidator): void | never {
    if (this.customValidators[validatorName]) {
      throw new Error(`Validator '${validatorName}' already exists`);
    }

    this.customValidators[validatorName] = validateFunc;
  }

  static getCustomValidator(validatorName: string): CustomValidator {
    return VBase.customValidators[validatorName];
  }

  protected static validateByCustomValidator(
    validationSpec: string,
    value: string | number,
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
}
