import IntValidationSpecError from './IntValidationSpecError';
import IntValidationError from './IntValidationError';

export type IntValidationSpec<MinValueMaxValueDivisibleByValue extends string> =
  MinValueMaxValueDivisibleByValue extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? `${MinValue},${MaxValue},${DivisibleByValue}`
    : MinValueMaxValueDivisibleByValue extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : never;

export class VInt<MinValueMaxValueDivisibleByValue extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<ValidationSpec extends string>(
    validationSpec: IntValidationSpec<ValidationSpec>,
    value: number
  ): VInt<ValidationSpec> | never {
    return new VInt<ValidationSpec>(validationSpec, value);
  }

  protected constructor(validationSpec: IntValidationSpec<MinValueMaxValueDivisibleByValue>, value: number) {
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
