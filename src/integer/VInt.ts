import IntValidationSpecError from './IntValidationSpecError';
import throwError from '../error/throwError';
import IntValidationError from './IntValidationError';

export type IntValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? [MinValue, MaxValue, DivisibleByValue]
    : never;

export class VInt<ValidationSpec extends string> {
  private readonly _value: number | null;

  constructor(private readonly validationSpec: IntValidationSpec<ValidationSpec>, _value: number) {
    const minValue = parseInt(this.validationSpec[0], 10);
    const maxValue = parseInt(this.validationSpec[1], 10);
    const divisible = this.validationSpec[2];
    const divisibleByValue = parseInt(divisible, 10);

    if (
      isNaN(minValue) ||
      isNaN(maxValue) ||
      (divisible !== undefined && (isNaN(divisibleByValue) || divisibleByValue === 0))
    ) {
      throw new IntValidationSpecError();
    }

    if (
      Number.isInteger(_value) &&
      _value >= minValue &&
      _value <= maxValue &&
      (!divisible || (divisible && _value % divisibleByValue === 0))
    ) {
      this._value = _value;
    } else {
      this._value = null;
    }
  }

  get value(): number | null {
    return this._value;
  }

  get valueOrThrow(): number {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._value ?? throwError(new IntValidationError(this.validationSpec, this._value!));
  }
}
