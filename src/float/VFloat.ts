import FloatValidationSpecError from './FloatValidationSpecError';
import throwError from '../error/throwError';
import FloatValidationError from './FloatValidationError';

export type FloatValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue}` ? [MinValue, MaxValue] : never;

export class VFloat<ValidationSpec extends string> {
  private readonly _value: number | null;

  constructor(private readonly validationSpec: FloatValidationSpec<ValidationSpec>, _value: number) {
    const minValue = parseFloat(this.validationSpec[0]);
    const maxValue = parseFloat(this.validationSpec[1]);

    if (isNaN(minValue) || isNaN(maxValue)) {
      throw new FloatValidationSpecError();
    }

    if (_value >= minValue && _value <= maxValue) {
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
    return this._value ?? throwError(new FloatValidationError(this.validationSpec, this._value!))
  }
}
