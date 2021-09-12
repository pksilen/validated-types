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
  static createOrThrow<VS extends string>(
    validationSpec: FloatValidationSpec<VS>,
    value: number
  ): VFloat<VS> | never {
    return new VFloat<VS>(validationSpec, value);
  }

  static create<VS extends string>(
    validationSpec: FloatValidationSpec<VS>,
    value: number
  ): VFloat<VS> | null {
    try {
      return new VFloat<VS>(validationSpec, value);
    } catch {
      return null;
    }
  }

  protected constructor(validationSpec: FloatValidationSpec<ValidationSpec>, value: number) {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customFloatValidators[validatorName]) {
        throw new FloatValidationSpecError();
      }
      if (customFloatValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new FloatValidationError(validationSpec, value);
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

    if (isNaN(minValue) || isNaN(maxValue)) {
      throw new FloatValidationSpecError();
    }

    if (value >= minValue && value <= maxValue) {
      this.validatedValue = value;
    } else {
      throw new FloatValidationError(validationSpec, value);
    }
  }

  get value(): number {
    return this.validatedValue;
  }
}
