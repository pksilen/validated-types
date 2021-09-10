import { UnknownLengthStringValidatorNames } from './UnknownLengthStringValidatorNames';
import { KnownLengthStringValidatorNames } from './KnownLengthStringValidatorNames';
import { ParameterizedStringValidatorNames } from './ParameterizedStringValidatorNames';
import StringValidationError from './StringValidationError';
import { customStringValidators } from './registerCustomStringValidator';
import StringValidationSpecError from './StringValidationSpecError';
import { stringValidators } from './stringValidators';
import IntValidationSpecError from '../integer/IntValidationSpecError';

export type StringValidationSpec<ValidationString extends string> =
  ValidationString extends `${infer MinLength},${infer MaxLength},${infer StringValidatorName},${infer Parameter}`
    ? StringValidatorName extends ParameterizedStringValidatorNames
      ? `${MinLength},${MaxLength},${StringValidatorName},${Parameter}`
      : never
    : ValidationString extends `${infer MinLength},${infer MaxLength},${infer StringValidatorName}`
    ? StringValidatorName extends UnknownLengthStringValidatorNames
      ? `${MinLength},${MaxLength},${StringValidatorName}`
      : never
    : ValidationString extends `${infer MinLength},${infer MaxLength}`
    ? `${MinLength},${MaxLength}`
    : ValidationString extends `${infer KnownLengthStringValidatorName}`
    ? KnownLengthStringValidatorName extends KnownLengthStringValidatorNames
      ? `${KnownLengthStringValidatorName}`
      : never
    : ValidationString extends `custom:${infer CustomValidatorName}`
    ? `custom:${CustomValidatorName}`
    : never;

export default class VString<ValidationString extends string> {
  private readonly validatedValue: string;

  constructor(private readonly validationSpec: StringValidationSpec<ValidationString>, value: string) {
    if (validationSpec.startsWith('custom:')) {
      const [, validatorName] = validationSpec.split(':');
      if (!customStringValidators[validatorName]) {
        throw new StringValidationSpecError();
      }
      if (customStringValidators[validatorName](value)) {
        this.validatedValue = value;
        return;
      } else {
        throw new StringValidationError(validationSpec, value);
      }
    }

    let minLength = 0;
    let maxLength = Number.MAX_SAFE_INTEGER;
    let validatorName;
    let parameter;

    if (validationSpec.includes(',')) {
      let minLengthStr;
      let maxLengthStr;
      [minLengthStr, maxLengthStr, validatorName, parameter] = validationSpec.split(',');
      minLength = parseInt(minLengthStr, 10);
      maxLength = parseInt(maxLengthStr, 10);

      if (minLengthStr === '') {
        minLength = 0;
      }

      if (isNaN(minLength) || isNaN(maxLength)) {
        throw new StringValidationSpecError();
      }
    } else {
      validatorName = validationSpec;
    }

    if (
      value.length >= minLength &&
      value.length <= maxLength &&
      stringValidators[validatorName](value, parameter)
    ) {
      this.validatedValue = value;
    } else {
      throw new StringValidationError(validationSpec, value);
    }
  }

  get value(): string {
    return this.validatedValue;
  }
}
