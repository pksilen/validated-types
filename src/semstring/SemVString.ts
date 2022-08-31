import SemType, { SemName } from '../semtype/SemType';
import VString, {
  FiveStringValidationSpecs,
  FourStringValidationSpecs,
  StringValidationSpecs,
  StringValidationSpecWithLength,
  ThreeStringValidationSpecs,
  TwoStringValidationSpecs,
} from '../string/VString';

export default class SemVString<Name extends string, VSpec extends string | string[]> {
  protected readonly semanticValue: SemType<VString<VSpec>, Name>;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends [string, string]>(
    semanticName: SemName<Name>,
    validationSpec: TwoStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends [string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: ThreeStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends [string, string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: FourStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never;

  static tryCreate<Name extends string, VSpec extends string | string[]>(
    semanticName: SemName<Name>,
    validationSpec: VSpec extends string
      ? StringValidationSpecWithLength<VSpec>
      : StringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never {
    return new SemVString(semanticName, new VString(validationSpec, value, varName));
  }

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null;

  static create<Name extends string, VSpec extends [string, string]>(
    semanticName: SemName<Name>,
    validationSpec: TwoStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null;

  static create<Name extends string, VSpec extends [string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: ThreeStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null;

  static create<Name extends string, VSpec extends [string, string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: FourStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null;

  static create<Name extends string, VSpec extends [string, string, string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: FiveStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null;

  static create<Name extends string, VSpec extends string | string[]>(
    semanticName: SemName<Name>,
    validationSpec: VSpec extends string
      ? StringValidationSpecWithLength<VSpec>
      : StringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null {
    try {
      return new SemVString(semanticName, new VString(validationSpec, value, varName));
    } catch {
      return null;
    }
  }

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error];

  static createOrError<Name extends string, VSpec extends [string, string]>(
    semanticName: SemName<Name>,
    validationSpec: TwoStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error];

  static createOrError<Name extends string, VSpec extends [string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: ThreeStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error];

  static createOrError<Name extends string, VSpec extends [string, string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: FourStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error];

  static createOrError<Name extends string, VSpec extends [string, string, string, string, string]>(
    semanticName: SemName<Name>,
    validationSpec: FiveStringValidationSpecs<VSpec>,
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error];

  static createOrError<Name extends string, VSpec extends string | string[]>(
    semanticName: SemName<Name>,
    validationSpec: VSpec extends string
      ? StringValidationSpecWithLength<VSpec>
      : StringValidationSpecs<VSpec>,

    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error] {
    try {
      return [new SemVString(semanticName, new VString(validationSpec, value, varName)), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  constructor(semanticName: SemName<Name>, value: VString<VSpec>) {
    this.semanticValue = new SemType(semanticName, value);
  }

  get value(): string {
    return this.semanticValue.value.value;
  }
}
