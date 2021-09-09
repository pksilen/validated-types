import FloatValidationSpecError from './FloatValidationSpecError';
import FloatValidationError from './FloatValidationError';
import { customFloatValidators } from './registerCustomFloatValidator';

export type FloatValidationSpec<MinValueMaxValueOrCustomValidator extends string> =
  MinValueMaxValueOrCustomValidator extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : MinValueMaxValueOrCustomValidator extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : never;

export default class VFloat<MinValueMaxValueOrCustomValidator extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<ValidationSpec extends string>(
    validationSpec: FloatValidationSpec<ValidationSpec>,
    value: number
  ): VFloat<ValidationSpec> | never {
    return new VFloat<ValidationSpec>(validationSpec, value);
  }

  protected constructor(
    validationSpec: FloatValidationSpec<MinValueMaxValueOrCustomValidator>,
    value: number
  ) {
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
