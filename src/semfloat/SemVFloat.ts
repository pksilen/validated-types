import SemType, { SemName } from '../semtype/SemType';
import VFloat, { FloatValidationSpec } from '../float/VFloat';

export default class SemVFloat<Name extends string, VSpec extends string> {
  protected readonly semanticValue: SemType<VFloat<VSpec>, Name>;

  // this will throw if invalid value is given that don't match the validation spec
  static tryCreate<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): SemVFloat<Name, VSpec> | never {
    return new SemVFloat(semanticName, VFloat.tryCreate(validationSpec, value, varName));
  }

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number
  ): SemVFloat<Name, VSpec> | null {
    try {
      return new SemVFloat(semanticName, VFloat.tryCreate(validationSpec, value));
    } catch {
      return null;
    }
  }

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [SemVFloat<Name, VSpec>, null] | [null, Error] {
    try {
      return [new SemVFloat(semanticName, VFloat.tryCreate(validationSpec, value, varName)), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  constructor(semanticName: SemName<Name>, value: VFloat<VSpec>) {
    this.semanticValue = new SemType(semanticName, value);
  }

  get value(): number {
    return this.semanticValue.value.value;
  }
}
