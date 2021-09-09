import FloatValidationSpecError from './FloatValidationSpecError';
import FloatValidationError from './FloatValidationError';

export type FloatValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue}` ? `${MinValue},${MaxValue}` : never;

export class VFloat<MinValueMaxValue extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VS extends string>(
    validationSpec: FloatValidationSpec<VS>,
    value: number
  ): VFloat<VS> | never {
    return new VFloat<VS>(validationSpec, value);
  }

  protected constructor(private readonly validationSpec: FloatValidationSpec<MinValueMaxValue>, value: number) {
    const [minValueStr, maxValueStr] = this.validationSpec.split(',');
    const minValue = parseFloat(minValueStr);
    const maxValue = parseFloat(maxValueStr);

    if (isNaN(minValue) || isNaN(maxValue)) {
      throw new FloatValidationSpecError();
    }

    if (value >= minValue && value <= maxValue) {
      this.validatedValue = value;
    } else {
      throw new FloatValidationError(this.validationSpec, value);
    }
  }

  get value(): number {
    return this.validatedValue;
  }
}
