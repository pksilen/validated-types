import stringValidationFunctions from './stringValidationFunctions';

type StringValidationSpec<ValidationString extends string> =
  ValidationString extends `${infer MaxLength},${infer ValidationFunctionName}`
    ? ValidationFunctionName extends 'isAscii'
      ? `${MaxLength},${ValidationFunctionName}`
      : never
    : never;

export default class VString<ValidationString extends string> {
  private readonly _value: string | null;

  constructor(private readonly validationSpec: StringValidationSpec<ValidationString>, stringValue: string) {
    const maxLength = parseInt(this.validationSpec[0]);
    if (isNaN(maxLength)) {
      throw new Error('Invalid string validation string, maxLength must be a number');
    }

    if (stringValue.length <= maxLength && (stringValidationFunctions as any)[this.validationSpec[1]]()) {
      this._value = stringValue;
    } else {
      this._value = null;
    }
  }

  get value(): string | null {
    return this._value;
  }
}
