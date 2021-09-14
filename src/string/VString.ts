import { UnknownLengthStringValidatorNames } from './UnknownLengthStringValidatorNames';
import { KnownLengthStringValidatorNames } from './KnownLengthStringValidatorNames';
import { ParameterizedStringValidatorNames } from './ParameterizedStringValidatorNames';
import { stringValidators } from './stringValidators';
import VBase from '../base/VBase';
import ValidationSpecError from '../error/ValidationSpecError';
import ValidationError from '../error/ValidationError';

export type StringValidationSpecWithLength<ValidationSpec extends string | undefined> =
  ValidationSpec extends undefined
    ? undefined
    : ValidationSpec extends `${infer MinLength},${infer MaxLength},${infer StringValidatorName},${infer Parameter}`
    ? StringValidatorName extends ParameterizedStringValidatorNames
      ? `${MinLength},${MaxLength},${StringValidatorName},${Parameter}`
      : { errorMessage: `Invalid string validator name: ${StringValidatorName}` }
    : ValidationSpec extends `${infer MinLength},${infer MaxLength},${infer StringValidatorName}`
    ? StringValidatorName extends UnknownLengthStringValidatorNames
      ? `${MinLength},${MaxLength},${StringValidatorName}`
      : { errorMessage: `Invalid string validator name: ${StringValidatorName}` }
    : ValidationSpec extends `${infer MinLength},${infer MaxLength}`
    ? `${MinLength},${MaxLength}`
    : ValidationSpec extends `custom:${infer CustomValidatorName}`
    ? `custom:${CustomValidatorName}`
    : ValidationSpec extends `${infer KnownLengthStringValidatorName}`
    ? KnownLengthStringValidatorName extends KnownLengthStringValidatorNames
      ? `${KnownLengthStringValidatorName}`
      : { errorMessage: `Invalid string validator name: ${KnownLengthStringValidatorName}` }
    : never;

export type StringValidationSpec<ValidationSpec extends string | undefined> = ValidationSpec extends undefined
  ? undefined
  : ValidationSpec extends `${infer StringValidatorName},${infer Parameter}`
  ? StringValidatorName extends ParameterizedStringValidatorNames
    ? `${StringValidatorName},${Parameter}`
    : { errorMessage: `Invalid string validator name: ${StringValidatorName}` }
  : ValidationSpec extends `${infer StringValidatorName}`
  ? StringValidatorName extends UnknownLengthStringValidatorNames
    ? `${StringValidatorName}`
    : { errorMessage: `Invalid string validator name: ${StringValidatorName}` }
  : ValidationSpec extends `custom:${infer CustomValidatorName}`
  ? `custom:${CustomValidatorName}`
  : ValidationSpec extends `${infer KnownLengthStringValidatorName}`
  ? KnownLengthStringValidatorName extends KnownLengthStringValidatorNames
    ? `${KnownLengthStringValidatorName}`
    : { errorMessage: `Invalid string validator name: ${KnownLengthStringValidatorName}` }
  : never;

export default class VString<ValidationSpec extends string | string[]> extends VBase {
  private readonly validatedValue: string;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends [string, string]>(
    validationSpec: [StringValidationSpecWithLength<VSpec[0]>, StringValidationSpec<VSpec[1]>],
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends [string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends [string, string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>,
      StringValidationSpec<VSpec[3]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends [string, string, string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>,
      StringValidationSpec<VSpec[3]>,
      StringValidationSpec<VSpec[4]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string | string[]>(
    validationSpec: VSpec extends string
      ? StringValidationSpecWithLength<VSpec>
      :
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>,
              StringValidationSpec<VSpec[3]>,
              StringValidationSpec<VSpec[4]>
            ]
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>,
              StringValidationSpec<VSpec[3]>
            ]
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>
            ]
          | [StringValidationSpecWithLength<VSpec[0]>, StringValidationSpec<VSpec[1]>],

    value: string,
    varName?: string
  ): VString<VSpec> | never {
    return new VString<VSpec>(validationSpec, value, varName);
  }

  static create<VSpec extends string>(
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): VString<VSpec> | null;

  static create<VSpec extends [string, string]>(
    validationSpec: [StringValidationSpecWithLength<VSpec[0]>, StringValidationSpec<VSpec[1]>],
    value: string,
    varName?: string
  ): VString<VSpec> | null;

  static create<VSpec extends [string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | null;

  static create<VSpec extends [string, string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>,
      StringValidationSpec<VSpec[3]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | null;

  static create<VSpec extends [string, string, string, string, string]>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec[0]>,
      StringValidationSpec<VSpec[1]>,
      StringValidationSpec<VSpec[2]>,
      StringValidationSpec<VSpec[3]>,
      StringValidationSpec<VSpec[4]>
    ],
    value: string,
    varName?: string
  ): VString<VSpec> | null;

  static create<VSpec extends string | string[]>(
    validationSpec: VSpec extends string
      ? StringValidationSpecWithLength<VSpec>
      :
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>,
              StringValidationSpec<VSpec[3]>,
              StringValidationSpec<VSpec[4]>
            ]
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>,
              StringValidationSpec<VSpec[3]>
            ]
          | [
              StringValidationSpecWithLength<VSpec[0]>,
              StringValidationSpec<VSpec[1]>,
              StringValidationSpec<VSpec[2]>
            ]
          | [StringValidationSpecWithLength<VSpec[0]>, StringValidationSpec<VSpec[1]>],

    value: string,
    varName?: string
  ): VString<VSpec> | null {
    try {
      return new VString<VSpec>(validationSpec, value, varName);
    } catch {
      return null;
    }
  }

  protected constructor(
    validationSpec: ValidationSpec extends string
      ? StringValidationSpecWithLength<ValidationSpec>
      :
          | [
              StringValidationSpecWithLength<ValidationSpec[0]>,
              StringValidationSpec<ValidationSpec[1]>,
              StringValidationSpec<ValidationSpec[2]>,
              StringValidationSpec<ValidationSpec[3]>,
              StringValidationSpec<ValidationSpec[4]>
            ]
          | [
              StringValidationSpecWithLength<ValidationSpec[0]>,
              StringValidationSpec<ValidationSpec[1]>,
              StringValidationSpec<ValidationSpec[2]>,
              StringValidationSpec<ValidationSpec[3]>
            ]
          | [
              StringValidationSpecWithLength<ValidationSpec[0]>,
              StringValidationSpec<ValidationSpec[1]>,
              StringValidationSpec<ValidationSpec[2]>
            ]
          | [StringValidationSpecWithLength<ValidationSpec[0]>, StringValidationSpec<ValidationSpec[1]>],
    value: string,
    varName?: string
  ) {
    super();
    if (Array.isArray(validationSpec)) {
      VString.validateValueWithValidationSpec(validationSpec[0], value, varName, true);
      validationSpec.slice(1).forEach((vSpec) => {
        VString.validateValueWithValidationSpec(vSpec, value, varName, false);
      });
    } else {
      VString.validateValueWithValidationSpec(validationSpec, value, varName, true);
    }

    this.validatedValue = value;
  }

  get value(): string {
    return this.validatedValue;
  }

  private static validateValueWithValidationSpec(
    validationSpec: string,
    value: string,
    varName: string | undefined,
    shouldValidateLength: boolean
  ) {
    if (validationSpec === undefined) {
      return;
    }

    if (shouldValidateLength) {
      VString.validateLength(validationSpec, value, varName);
    }

    VBase.validateByCustomValidator(validationSpec, value, varName);
    VString.validateByValidator(validationSpec, value, shouldValidateLength, varName);
  }

  private static validateLength(validationSpec: string, value: string, varName?: string): void | never {
    if (validationSpec.includes(',')) {
      const [minLengthStr, maxLengthStr] = validationSpec.split(',');
      let minLength = parseInt(minLengthStr, 10);
      const maxLength = parseInt(maxLengthStr, 10);

      if (minLengthStr === '') {
        minLength = 0;
      }

      if (isNaN(minLength)) {
        throw new ValidationSpecError('Invalid minLength specified in validation spec');
      }

      if (isNaN(maxLength)) {
        throw new ValidationSpecError('Invalid maxLength specified in validation spec');
      }

      if (value.length < minLength) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is shorter than required minimum length: ${minLength}`
            : `Value is shorter than required minimum length: ${minLength}`
        );
      }

      if (value.length > maxLength) {
        throw new ValidationError(
          varName
            ? `Value in '${varName}' is longer than allowed maximum length: ${maxLength}`
            : `Value is longer than allowed maximum length: ${maxLength}`
        );
      }
    }
  }

  private static validateByValidator(
    validationSpec: string,
    value: string,
    shouldValidateLength: boolean,
    varName?: string
  ): void | number {
    let validatorName, parameter;

    if (validationSpec.startsWith('custom:')) {
      return;
    }

    if (validationSpec.includes(',')) {
      if (shouldValidateLength) {
        let restOfParameter;
        [, , validatorName, parameter, ...restOfParameter] = validationSpec.split(',');
        parameter = restOfParameter.length > 0 ? parameter + ',' + restOfParameter.join(',') : parameter;
      } else {
        [validatorName, parameter] = validationSpec.split(',');
      }
    } else {
      validatorName = validationSpec;
    }

    if (validatorName && !(stringValidators as any)[validatorName](value, parameter)) {
      throw new ValidationError(
        varName
          ? `Value in '${varName}' does not match validator: ${validatorName}`
          : `Value does not match validator: ${validatorName}`
      );
    }
  }
}
