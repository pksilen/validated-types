import ValidationSpecError from '../error/ValidationSpecError';

export default class FloatValidationSpecError extends ValidationSpecError {
  constructor() {
    super(
      "Invalid float validation spec. Spec must a string in form '<minValue>,<maxValue>' where minValue and maxValue are floats or in form 'custom:<validatorName>', where validatorName is name of the validator registered with a call to registerCustomFloatValidtor"
    );
  }
}
