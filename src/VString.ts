type TSVersion = '4.1.2';

type ExtractSemver<SemverString extends string> =
  SemverString extends `${infer Major}.${infer Minor}.${infer Patch}`
    ? { major: Major; minor: Minor; patch: Patch }
    : never;

type TS = ExtractSemver<TSVersion>;
const ts: TS = { major: '4', minor: '1', patch: '2' };

const validationFunctions = {
  isAscii: () => true,
};

type StringValidationSpec<ValidationString extends string> =
  ValidationString extends `${infer MaxLength},${infer ValidationFunctionName}`
    ? ValidationFunctionName extends 'isAscii' | 'jee'
      ? `${MaxLength},${ValidationFunctionName}`
      : never
    : never;

export default class VString<ValidationString extends string> {
  private readonly _value: string | null;

  constructor(private readonly validationSpec: StringValidationSpec<ValidationString>, stringValue: string) {
    const maxLength = parseInt(this.validationSpec[0]);

    if (stringValue.length <= maxLength && (validationFunctions as any)[this.validationSpec[1]]) {
      this._value = stringValue;
    } else {
      this._value = null;
    }
  }

  get value(): string | null {
    return this._value;
  }
}

type NumberValidationSpec<ValidationString extends string> =
  ValidationString extends `${infer Type},${infer MinValue},${infer MaxValue}`
    ? Type extends 'int' | 'float'
      ? [Type, MinValue, MaxValue]
      : never
    : never;

export class VNumber<ValidationString extends string> {
  private readonly _value: string | null;

  constructor(private readonly validationSpec: StringValidationSpec<ValidationString>, _value: string) {
    const maxLength = parseInt(this.validationSpec[0]);

    if (_value.length <= maxLength && (validationFunctions as any)[this.validationSpec[1]]) {
      this._value = _value;
    } else {
      this._value = null;
    }
  }

  get value(): string | null {
    return this._value;
  }
}

const jee: VString<'64,jee'> = new VString('64,jee', 'jee');
