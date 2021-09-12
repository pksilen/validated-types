import ValidationError from '../error/ValidationError';

export default class StringValidationError extends ValidationError {
  constructor(validationSpec: string, value: string) {
    super(`Value ${value} is not a valid string according to validation spec: ${validationSpec}`);
  }
}
