import ValidationSpecError from '../error/ValidationSpecError';

export default class StringValidationSpecError extends ValidationSpecError {
  constructor() {
    super(
      "Invalid string validation spec. Spec must a string in form '[<minLength>],<maxLength>[,<unknowLengthStringValidatorName>]' or '<knowLengthStringValidatorName>' or '[<minLength>],<maxLength>,<parameterizedStringValidatorName>,<parameter>'. Alternatively validation spec is in form 'custom:<validatorName>', where validatorName is name of the validation function registered in call to registerCustomStringValidator"
    );
  }
}
