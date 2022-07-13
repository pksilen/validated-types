import VBase from '../base/VBase';

export type FloatValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : ValidationSpec extends `custom:${infer CustomValidatorName}`
    ? `custom:${CustomValidatorName}`
    : ValidationSpec extends `${infer FloatValidatorName}`
    ? FloatValidatorName extends 'positive' | 'negative'
      ? `${FloatValidatorName}`
      : { errorMessage: `Invalid float validator name: ${FloatValidatorName}` }
    : never;

export default class VFloat<ValidationSpec extends string> extends VBase<number> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): VFloat<VSpec> | never {
    return new VFloat<VSpec>(validationSpec, value, varName);
  }

  static create<VSpec extends string>(
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): VFloat<VSpec> | null {
    try {
      return new VFloat<VSpec>(validationSpec, value, varName);
    } catch {
      return null;
    }
  }

  static createOrError<VSpec extends string>(
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [VFloat<VSpec>, null] | [null, Error] {
    try {
      return [new VFloat<VSpec>(validationSpec, value, varName), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  protected constructor(
    private readonly validationSpec: FloatValidationSpec<ValidationSpec>,
    value: number,
    varName?: string
  ) {
    super();
    const validationSpecAsStr = validationSpec as string;
    VBase.validateByCustomValidator(validationSpecAsStr, value, varName);
    VBase.validateNumericRange(
      validationSpecAsStr,
      value,
      parseFloat,
      [Number.MIN_VALUE, Number.MAX_VALUE],
      varName
    );
    VBase.validatePositiveValue(validationSpecAsStr, value, varName);
    VBase.validateNegativeValue(validationSpecAsStr, value, varName);
    this.validatedValue = value;
  }

  get value(): number {
    return this.validatedValue;
  }
}
