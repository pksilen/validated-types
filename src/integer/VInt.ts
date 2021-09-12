import IntValidationSpecError from './IntValidationSpecError';
import IntValidationError from './IntValidationError';
import { customIntValidators } from './registerCustomIntValidator';

export type IntValidationSpec<ValidationSpec extends string> =
  ValidationSpec extends `${infer MinValue},${infer MaxValue},${infer DivisibleByValue}`
    ? `${MinValue},${MaxValue},${DivisibleByValue}`
    : ValidationSpec extends `${infer MinValue},${infer MaxValue}`
    ? `${MinValue},${MaxValue}`
    : ValidationSpec extends `custom:${infer ValidatorName}`
    ? `custom:${ValidatorName}`
    : never;

export default class VInt<ValidationSpec extends string> {
  private readonly validatedValue: number;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): VInt<VSpec> | never {
    return new VInt<VSpec>(validationSpec, value, varName);
  }

  static create<VSpec extends string>(
    validationSpec: IntValidationSpec<VSpec>,
    value: number
  ): VInt<VSpec> | null {
    try {
      return new VInt<VSpec>(validationSpec, value);
    } catch {
      return null;
    }
  }

  protected constructor(validationSpec: IntValidationSpec<ValidationSpec>, value: number, varName?: string) {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customIntValidators[validatorName]) {
        throw new IntValidationSpecError('Custom int validator not registered with name: ' + validatorName);
      }
      if (customIntValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new IntValidationError(
          varName
            ? `Value '${varName}' does not match validator: ${validatorName}`
            : `Value does not match validator: ${validatorName}`
        );
      }
    }

    const [minValueStr, maxValueStr, divisibleByValueStr] = validationSpec.split(',');
    let minValue = parseInt(minValueStr, 10);
    let maxValue = parseInt(maxValueStr, 10);
    const divisibleByValue = parseInt(divisibleByValueStr, 10);

    if (minValueStr === '') {
      minValue = Number.MIN_SAFE_INTEGER;
    }

    if (maxValueStr === '') {
      maxValue = Number.MAX_SAFE_INTEGER;
    }

    if (isNaN(minValue)) {
      throw new IntValidationSpecError('Invalid minValue specified in validation spec');
    }

    if (isNaN(maxValue)) {
      throw new IntValidationSpecError('Invalid maxValue specified in validation spec');
    }

    if (divisibleByValueStr && (isNaN(divisibleByValue) || divisibleByValue === 0)) {
      throw new IntValidationSpecError('Invalid divisibleByValue specified in validation spec');
    }

    if (Number.isInteger(value)) {
      throw new IntValidationError(
        varName ? `Value '${varName}'is not an integer` : 'Value is not an integer'
      );
    }

    if (value < minValue || value > maxValue) {
      throw new IntValidationError(
        varName
          ? `Value '${varName}' is not in allowed range: [${minValue}, ${maxValue}]`
          : `Value is not in allowed range: [${minValue}, ${maxValue}]`
      );
    }

    if (divisibleByValueStr && value % divisibleByValue !== 0) {
      throw new IntValidationError(
        varName
          ? `Value '${varName}' is not divisible by: ${divisibleByValue}`
          : `Value is not divisible by: ${divisibleByValue}`
      );
    }

    this.validatedValue = value;
  }

  get value(): number {
    return this.validatedValue;
  }
}
