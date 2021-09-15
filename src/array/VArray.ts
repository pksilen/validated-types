import VBase from '../base/VBase';
import ValidationError from '../error/ValidationError';

export type ArrayValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinLength},${infer MaxLength},unique`
    ? `${MinLength},${MaxLength},unique`
    : ValidationSpec extends `${infer MinLength},${infer MaxLength}`
    ? `${MinLength},${MaxLength}`
    : ValidationSpec extends `custom:${infer CustomValidatorName}`
    ? `custom:${CustomValidatorName}`
    : never;

export default class VArray<ValidationSpec extends string, T> extends VBase<T[]> {
  private readonly validatedValue: T[];

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string, T>(
    validationSpec: ArrayValidationSpec<VSpec>,
    value: T[],
    varName?: string
  ): VArray<VSpec, T> | never {
    return new VArray<VSpec, T>(validationSpec, value, varName);
  }

  static create<VSpec extends string, T>(
    validationSpec: ArrayValidationSpec<VSpec>,
    value: T[],
    varName?: string
  ): VArray<VSpec, T> | null {
    try {
      return new VArray<VSpec, T>(validationSpec, value, varName);
    } catch {
      return null;
    }
  }

  static createOrError<VSpec extends string, T>(
    validationSpec: ArrayValidationSpec<VSpec>,
    value: T[],
    varName?: string
  ): [VArray<VSpec, T>, null] | [null, Error] {
    try {
      return [new VArray<VSpec, T>(validationSpec, value, varName), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  protected constructor(validationSpec: ArrayValidationSpec<ValidationSpec>, value: T[], varName?: string) {
    super();
    const validationSpecAsStr = validationSpec as string;
    VBase.validateByCustomValidator(validationSpecAsStr, value, varName);
    VBase.validateLength(validationSpec, value, varName);
    this.validateUniqueArrayElements(validationSpec, value, varName);
    this.validatedValue = value;
  }

  private validateUniqueArrayElements(validationSpec: string, values: T[], varName?: string) {
    if (validationSpec.includes(',')) {
      const [, , unique] = validationSpec.split(',');

      if (unique === 'unique') {
        const set = new Set();
        values.forEach((value) => {
          if (value instanceof VBase) {
            set.add(value.value);
          } else {
            set.add(value);
          }
        });

        if (set.size < values.length) {
          throw new ValidationError(
            varName ? `Values in '${varName}' are not unique` : `Values are not unique`
          );
        }
      }
    }
  }

  get value(): T[] {
    return this.validatedValue;
  }
}
