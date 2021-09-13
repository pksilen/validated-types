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

export default class VString<
  ValidationSpec extends string,
  ValidationSpec2 extends string | undefined = undefined,
  ValidationSpec3 extends string | undefined = undefined,
  ValidationSpec4 extends string | undefined = undefined,
  ValidationSpec5 extends string | undefined = undefined
> extends VBase {
  private validatedValue: string = '';

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string>(
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string,
    varName?: string
  ): VString<VSpec> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string, VSpec2 extends string>(
    validationSpec: [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>],
    value: string,
    varName?: string
  ): VString<VSpec, VSpec2> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<VSpec extends string, VSpec2 extends string, VSpec3 extends string>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>
    ],
    value: string,
    varName?: string
  ): VString<VSpec, VSpec2, VSpec3> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<
    VSpec extends string,
    VSpec2 extends string,
    VSpec3 extends string,
    VSpec4 extends string
  >(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>,
      StringValidationSpec<VSpec4>
    ],
    value: string,
    varName?: string
  ): VString<VSpec, VSpec2, VSpec3, VSpec4> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<
    VSpec extends string,
    VSpec2 extends string,
    VSpec3 extends string,
    VSpec4 extends string,
    VSpec5 extends string
  >(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>,
      StringValidationSpec<VSpec4>,
      StringValidationSpec<VSpec5>
    ],
    value: string,
    varName?: string
  ): VString<VSpec, VSpec2, VSpec3, VSpec4, VSpec5> | never;

  // this will throw if invalid value is given that don't match the validation spec
  static createOrThrow<
    VSpec extends string,
    VSpec2 extends string | undefined = undefined,
    VSpec3 extends string | undefined = undefined,
    VSpec4 extends string | undefined = undefined,
    VSpec5 extends string | undefined = undefined
  >(
    validationSpec:
      | StringValidationSpecWithLength<VSpec>
      | [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>]
      | [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>, StringValidationSpec<VSpec3>]
      | [
          StringValidationSpecWithLength<VSpec>,
          StringValidationSpec<VSpec2>,
          StringValidationSpec<VSpec3>,
          StringValidationSpec<VSpec4>
        ]
      | [
          StringValidationSpecWithLength<VSpec>,
          StringValidationSpec<VSpec2>,
          StringValidationSpec<VSpec3>,
          StringValidationSpec<VSpec4>,
          StringValidationSpec<VSpec5>
        ],
    value: string,
    varName?: string
  ): VString<VSpec, VSpec2 | undefined, VSpec3 | undefined, VSpec4 | undefined> | never {
    if (typeof validationSpec === 'object' && Array.isArray(validationSpec)) {
      return new VString<
        VSpec,
        VSpec2 | undefined,
        VSpec3 | undefined,
        VSpec4 | undefined,
        VSpec5 | undefined
      >(validationSpec, value, varName);
    } else {
      return new VString<VSpec, VSpec2 | undefined>([validationSpec, undefined], value, varName);
    }
  }

  static create<VSpec extends string>(
    validationSpec: StringValidationSpecWithLength<VSpec>,
    value: string
  ): VString<VSpec> | null;

  static create<VSpec extends string, VSpec2 extends string>(
    validationSpec: [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>],
    value: string
  ): VString<VSpec, VSpec2> | null;

  static create<VSpec extends string, VSpec2 extends string, VSpec3 extends string>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>
    ],
    value: string
  ): VString<VSpec, VSpec2, VSpec3> | null;

  static create<VSpec extends string, VSpec2 extends string, VSpec3 extends string, VSpec4 extends string>(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>,
      StringValidationSpec<VSpec4>
    ],
    value: string
  ): VString<VSpec, VSpec2, VSpec3, VSpec4> | null;

  static create<
    VSpec extends string,
    VSpec2 extends string,
    VSpec3 extends string,
    VSpec4 extends string,
    VSpec5 extends string
  >(
    validationSpec: [
      StringValidationSpecWithLength<VSpec>,
      StringValidationSpec<VSpec2>,
      StringValidationSpec<VSpec3>,
      StringValidationSpec<VSpec4>,
      StringValidationSpec<VSpec5>
    ],
    value: string
  ): VString<VSpec, VSpec2, VSpec3, VSpec4, VSpec5> | null;

  static create<
    VSpec extends string,
    VSpec2 extends string | undefined = undefined,
    VSpec3 extends string | undefined = undefined,
    VSpec4 extends string | undefined = undefined,
    VSpec5 extends string | undefined = undefined
  >(
    validationSpec:
      | StringValidationSpecWithLength<VSpec>
      | [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>]
      | [StringValidationSpecWithLength<VSpec>, StringValidationSpec<VSpec2>, StringValidationSpec<VSpec3>]
      | [
          StringValidationSpecWithLength<VSpec>,
          StringValidationSpec<VSpec2>,
          StringValidationSpec<VSpec3>,
          StringValidationSpec<VSpec4>
        ]
      | [
          StringValidationSpecWithLength<VSpec>,
          StringValidationSpec<VSpec2>,
          StringValidationSpec<VSpec3>,
          StringValidationSpec<VSpec4>,
          StringValidationSpec<VSpec5>
        ],
    value: string
  ): VString<VSpec, VSpec2 | undefined, VSpec3 | undefined, VSpec4 | undefined> | null {
    try {
      if (typeof validationSpec === 'object' && Array.isArray(validationSpec)) {
        return new VString<
          VSpec,
          VSpec2 | undefined,
          VSpec3 | undefined,
          VSpec4 | undefined,
          VSpec5 | undefined
        >(validationSpec, value);
      } else {
        return new VString<VSpec, VSpec2 | undefined>([validationSpec, undefined], value);
      }
    } catch {
      return null;
    }
  }

  protected constructor(
    validationSpecs:
      | [StringValidationSpecWithLength<ValidationSpec>, StringValidationSpec<ValidationSpec2>]
      | [
          StringValidationSpecWithLength<ValidationSpec>,
          StringValidationSpec<ValidationSpec2>,
          StringValidationSpec<ValidationSpec3>
        ]
      | [
          StringValidationSpecWithLength<ValidationSpec>,
          StringValidationSpec<ValidationSpec2>,
          StringValidationSpec<ValidationSpec3>,
          StringValidationSpec<ValidationSpec4>
        ]
      | [
          StringValidationSpecWithLength<ValidationSpec>,
          StringValidationSpec<ValidationSpec2>,
          StringValidationSpec<ValidationSpec3>,
          StringValidationSpec<ValidationSpec4>,
          StringValidationSpec<ValidationSpec5>
        ],
    value: string,
    varName?: string
  ) {
    super();
    const [validationSpecWithLength, ...otherValidationSpecs] = validationSpecs;
    this.validateValueWithValidationSpec(validationSpecWithLength, value, varName, true);
    otherValidationSpecs.forEach((validationSpec) => {
      this.validateValueWithValidationSpec(validationSpec, value, varName, false);
    });
    this.validatedValue = value;
  }

  get value(): string {
    return this.validatedValue;
  }

  private validateValueWithValidationSpec(
    validationSpec:
      | StringValidationSpecWithLength<ValidationSpec>
      | StringValidationSpec<ValidationSpec2 | ValidationSpec3 | ValidationSpec4 | ValidationSpec5>,
    value: string,
    varName: string | undefined,
    shouldValidateLength: boolean
  ) {
    if (validationSpec === undefined) {
      return;
    }

    if (shouldValidateLength) {
      VString.validateLength(validationSpec as string, value, varName);
    }

    VBase.validateByCustomValidator(validationSpec as string, value, varName);
    VString.validateByValidator(validationSpec as string, value, shouldValidateLength, varName);
    this.validatedValue = value;
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
