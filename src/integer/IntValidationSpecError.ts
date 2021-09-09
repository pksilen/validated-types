import ValidationSpecError from '../error/ValidationSpecError';

export default class IntValidationSpecError extends ValidationSpecError {
  constructor() {
    super(
      "Invalid integer validation spec. Spec must a string in form '<minValue>,<maxValue>[,<divisibleByValue>]' where minValue and maxValue are integers"
    );
  }
}
