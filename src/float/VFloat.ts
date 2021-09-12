import FloatValidationSpecError from './FloatValidationSpecError';
import FloatValidationError from './FloatValidationError';
import { customFloatValidators } from './registerCustomFloatValidator';

export type FloatValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : ValidationSpec extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : never;

export default class VFloat<ValidationSpec extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): VFloat<VSpec> | never {
    return new VFloat<VSpec>(validationSpec, value, varName);
  }

  static create<VSpec extends string>(
    validationSpec: FloatValidationSpec<VSpec>,
    value: number
  ): VFloat<VSpec> | null {
    try {
      return new VFloat<VSpec>(validationSpec, value);
    } catch {
      return null;
    }
  }

  protected constructor(
    validationSpec: FloatValidationSpec<ValidationSpec>,
    value: number,
    varName?: string
  ) {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customFloatValidators[validatorName]) {
        throw new FloatValidationSpecError(
          'Custom float validator not registered with name: ' + validatorName
        );
      }
      if (customFloatValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new FloatValidationError(
          varName
            ? `Value '${varName} does not match validator: ${validatorName}`
            : `Value does not match validator: ${validatorName}`
        );
      }
    }

    const [minValueStr, maxValueStr] = validationSpec.split(',');
    let minValue = parseFloat(minValueStr);
    let maxValue = parseFloat(maxValueStr);

    if (minValueStr === '') {
      minValue = Number.MIN_VALUE;
    }

    if (maxValueStr === '') {
      maxValue = Number.MAX_VALUE;
    }

    if (isNaN(minValue)) {
      throw new FloatValidationSpecError('Invalid minValue specified in validation spec');
    }

    if (isNaN(maxValue)) {
      throw new FloatValidationSpecError('Invalid maxValue specified in validation spec');
    }

    if (value >= minValue && value <= maxValue) {
      this.validatedValue = value;
    } else {
      throw new FloatValidationError(
        varName
          ? `Value '${varName}' is not in allowed range: [${minValue}, ${maxValue}]`
          : `Value is not in allowed range: [${minValue}, ${maxValue}]`
      );
    }
  }

  get value(): number {
    return this.validatedValue;
  }
}
