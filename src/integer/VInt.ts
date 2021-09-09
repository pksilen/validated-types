import IntValidationSpecError from './IntValidationSpecError';
import IntValidationError from './IntValidationError';
import { customIntValidators } from './registerCustomIntValidator';

export type IntValidationSpec<MinValueMaxValueDivisibleByValueOrCustomValidator extends string> =
  MinValueMaxValueDivisibleByValueOrCustomValidator extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? `${MinValue},${MaxValue},${DivisibleByValue}`
    : MinValueMaxValueDivisibleByValueOrCustomValidator extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : MinValueMaxValueDivisibleByValueOrCustomValidator extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : never;

export default class VInt<MinValueMaxValueDivisibleByValue extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<ValidationSpec extends string>(
    validationSpec: IntValidationSpec<ValidationSpec>,
    value: number
  ): VInt<ValidationSpec> | never {
    return new VInt<ValidationSpec>(validationSpec, value);
  }

  protected constructor(validationSpec: IntValidationSpec<MinValueMaxValueDivisibleByValue>, value: number) {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customIntValidators[validatorName]) {
        throw new IntValidationSpecError();
      }
      if (customIntValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new IntValidationError(validationSpec, value);
      }
    }

    const [minValueStr, maxValueStr, divisibleByValueStr] = validationSpec.split(',');
    let minValue = parseInt(minValueStr, 10);
    let maxValue = parseInt(maxValueStr, 10);
    const divisibleByValue = parseInt(divisibleByValueStr, 10);

    if (minValueStr === '') {
      minValue = Number.MIN_SAFE_INTEGER;
    }

    if (maxValueStr === '') {
      maxValue = Number.MAX_SAFE_INTEGER;
    }

    if (
      isNaN(minValue) ||
      isNaN(maxValue) ||
      (divisibleByValueStr && (isNaN(divisibleByValue) || divisibleByValue === 0))
    ) {
      throw new IntValidationSpecError();
    }

    if (
      Number.isInteger(value) &&
      value >= minValue &&
      value <= maxValue &&
      (!divisibleByValueStr || (divisibleByValueStr && value % divisibleByValue === 0))
    ) {
      this.validatedValue = value;
    } else {
      throw new IntValidationError(validationSpec, value);
    }
  }

  get value(): number {
    return this.validatedValue;
  }
}
