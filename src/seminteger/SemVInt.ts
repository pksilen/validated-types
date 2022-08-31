import SemType, { SemName } from '../semtype/SemType';
import VInt, { IntValidationSpec } from '../integer/VInt';

export default class SemVInt<Name extends string, VSpec extends string> {
  protected readonly semanticValue: SemType<VInt<VSpec>, Name>;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): SemVInt<Name, VSpec> | never {
    return new SemVInt(semanticName, VInt.tryCreate(validationSpec, value, varName));
  }

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number
  ): SemVInt<Name, VSpec> | null {
    try {
      return new SemVInt(semanticName, VInt.tryCreate(validationSpec, value));
    } catch {
      return null;
    }
  }

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [SemVInt<Name, VSpec>, null] | [null, Error] {
    try {
      return [new SemVInt(semanticName, VInt.tryCreate(validationSpec, value, varName)), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  constructor(semanticName: SemName<Name>, value: VInt<VSpec>) {
    this.semanticValue = new SemType(semanticName, value);
  }

  get value(): number {
    return this.semanticValue.value.value;
  }
}
