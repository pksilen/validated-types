import IntValidationSpecError from './IntValidationSpecError';
import IntValidationError from './IntValidationError';
import { customIntValidators } from './registerCustomIntValidator';

export type IntValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? `${MinValue},${MaxValue},${DivisibleByValue}`
    : ValidationSpec extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : ValidationSpec extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : never;

export default class VInt<ValidationSpec extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VS extends string>(
    validationSpec: IntValidationSpec<VS>,
    value: number
  ): VInt<VS> | never {
    return new VInt<VS>(validationSpec, value);
  }

  static create<VS extends string>(validationSpec: IntValidationSpec<VS>, value: number): VInt<VS> | null {
    try {
      return new VInt<VS>(validationSpec, value);
    } catch {
      return null;
    }
  }

  protected constructor(validationSpec: IntValidationSpec<ValidationSpec>, value: number) {
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
