import VBase from '../base/VBase';
import ValidationError from '../error/ValidationError';
import ValidationSpecError from '../error/ValidationSpecError';

export type IntValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? `${MinValue},${MaxValue},${DivisibleByValue}`
    : ValidationSpec extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : ValidationSpec extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : ValidationSpec extends `${infer IntValidatorName}`
    ? IntValidatorName extends 'positive' | 'negative'
      ? `${IntValidatorName}`
      : { errorMessage: `Invalid int validator name: ${IntValidatorName}` }
    : never;

export default class VInt<VSpec extends string> extends VBase<number> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): VInt<VSpec> | never {
    return new VInt(validationSpec, value, varName);
  }

  static create<VSpec extends string>(
    validationSpec: IntValidationSpec<VSpec>,
    value: number
  ): VInt<VSpec> | null {
    try {
      return new VInt(validationSpec, value);
    } catch {
      return null;
    }
  }

  static createOrError<VSpec extends string>(
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [VInt<VSpec>, null] | [null, Error] {
    try {
      return [new VInt(validationSpec, value, varName), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  protected constructor(
    private readonly validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ) {
    super();
    const validationSpecAsStr = this.validationSpec as unknown as string;
    VBase.validateByCustomValidator(validationSpecAsStr, value, varName);
    VBase.validateNumericRange(
      validationSpecAsStr,
      value,
      parseInt,
      [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      varName
    );
    VBase.validatePositiveValue(validationSpecAsStr, value, varName);
    VBase.validateNegativeValue(validationSpecAsStr, value, varName);
    VInt.validateDivisibleByValue(validationSpecAsStr, value, varName);
    VInt.validateInteger(value, varName);
    this.validatedValue = value;
  }

  get value(): number {
    return this.validatedValue;
  }

  private static validateDivisibleByValue(
    validationSpec: string,
    value: number,
    varName?: string
  ): void | never {
    if (validationSpec.includes(',')) {
      const [, , divisibleByValueStr] = validationSpec.split(',');
      const divisibleByValue = parseInt(divisibleByValueStr, 10);

      if (divisibleByValueStr && (isNaN(divisibleByValue) || divisibleByValue === 0)) {
        throw new ValidationSpecError(
          'Invalid divisibleByValue specified in validation spec: ' + validationSpec
        );
      }

      if (divisibleByValueStr && value % divisibleByValue !== 0) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is not divisible by: ${divisibleByValue}`
            : `Value is not divisible by: ${divisibleByValue}`
        );
      }
    }
  }

  private static validateInteger(value: number, varName?: string): void | never {
    if (!Number.isInteger(value)) {
      throw new ValidationError(
        varName ? `Value in '${varName}' is not an integer` : 'Value is not an integer'
      );
    }
  }
}
