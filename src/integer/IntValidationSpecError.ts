import ValidationSpecError from '../error/ValidationSpecError';

export default class IntValidationSpecError extends ValidationSpecError {
  constructor() {
    super(
      "Invalid integer validation spec. Spec must a string in form '<minValue>,<maxValue>[,<divisibleByValue>]' where minValue and maxValue are integers. DivisibleByValue is an optional integer value which must be non-zero. Alternatively validation spec is in form 'custom:<validatorName>', where validatorName is name of the validation function registered in call to registerCustomIntValidator"
    );
  }
}
