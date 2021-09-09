import FloatValidationSpecError from './FloatValidationSpecError';
import FloatValidationError from './FloatValidationError';

export type FloatValidationSpec<MinValueMaxValue extends string> =
  MinValueMaxValue extends `${infer MinValue},${infer MaxValue}` ? `${MinValue},${MaxValue}` : never;

export class VFloat<MinValueMaxValue extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<ValidationSpec extends string>(
    validationSpec: FloatValidationSpec<ValidationSpec>,
    value: number
  ): VFloat<ValidationSpec> | never {
    return new VFloat<ValidationSpec>(validationSpec, value);
  }

  protected constructor(validationSpec: FloatValidationSpec<MinValueMaxValue>, value: number) {
    const [minValueStr, maxValueStr] = validationSpec.split(',');
    let minValue = parseFloat(minValueStr);
    let maxValue = parseFloat(maxValueStr);

    if (minValueStr === '') {
      minValue = Number.MIN_VALUE;
    }

    if (maxValueStr === '') {
      maxValue = Number.MAX_VALUE
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
