import ValidationSpecError from '../error/ValidationSpecError';

export default class StringValidationSpecError extends ValidationSpecError {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}
