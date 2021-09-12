import { UnknownLengthStringValidatorNames } from './UnknownLengthStringValidatorNames';
import { KnownLengthStringValidatorNames } from './KnownLengthStringValidatorNames';
import { ParameterizedStringValidatorNames } from './ParameterizedStringValidatorNames';
import StringValidationError from './StringValidationError';
import { customStringValidators } from './registerCustomStringValidator';
import StringValidationSpecError from './StringValidationSpecError';
import { stringValidators } from './stringValidators';

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
> {
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
    const [validationSpecWithLength, ...otherValidationSpecs] = validationSpecs;
    this.validateValueWithValidationSpec(validationSpecWithLength, value, varName, true);

    otherValidationSpecs.forEach((validationSpec) => {
      this.validateValueWithValidationSpec(validationSpec, value, varName, false);
    });
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

    if (typeof validationSpec === 'object') {
      throw new StringValidationSpecError(validationSpec.errorMessage);
    }

    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customStringValidators[validatorName]) {
        throw new StringValidationSpecError(
          'Custom string validator not registered with name: ' + validatorName
        );
      }
      if (customStringValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new StringValidationError(
          varName
            ? `Value '${varName}' does not match validator: ${validatorName}`
            : `Value does not match validator: ${validatorName}`
        );
      }
    }

    let minLength = 0;
    let maxLength = Number.MAX_SAFE_INTEGER;
    let validatorName;
    let parameter;

    if (validationSpec.includes(',')) {
      if (shouldValidateLength) {
        let minLengthStr;
        let maxLengthStr;
        [minLengthStr, maxLengthStr, validatorName, parameter] = validationSpec.split(',');
        minLength = parseInt(minLengthStr, 10);
        maxLength = parseInt(maxLengthStr, 10);

        if (minLengthStr === '') {
          minLength = 0;
        }

        if (isNaN(minLength)) {
          throw new StringValidationSpecError('Invalid minLength specified in validation spec');
        }

        if (isNaN(maxLength)) {
          throw new StringValidationSpecError('Invalid maxLength specified in validation spec');
        }
      } else {
        [validatorName, parameter] = validationSpec.split(',');
      }
    } else {
      validatorName = validationSpec;
    }

    if (!stringValidators[validatorName]) {
      throw new StringValidationSpecError('Invalid string validator name: ' + validatorName);
    }

    if (value.length < minLength) {
      throw new StringValidationError(
        varName
          ? `Value '${varName}' is shorter than required minimum length: ${minLength}`
          : `Value is shorter than required minimum length: ${minLength}`
      );
    }

    if (value.length > maxLength) {
      throw new StringValidationError(
        varName
          ? `Value '${varName}' is longer than allowed maximum length: ${maxLength}`
          : `Value is longer than allowed maximum length: ${maxLength}`
      );
    }

    if (!stringValidators[validatorName](value, parameter)) {
      throw new StringValidationError(
        varName
          ? `Value '${varName}' does not match validator: ${maxLength}`
          : `Value does not match validator: ${maxLength}`
      );
    }

    this.validatedValue = value;
  }
}
