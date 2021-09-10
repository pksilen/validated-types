import ValidationError from '../error/ValidationError';
import { StringValidationSpec } from './VString';

export default class StringValidationError<ValidationSpec extends string> extends ValidationError {
  constructor(validationSpec: StringValidationSpec<ValidationSpec>, value: string) {
    super(`Value ${value} is not a valid string according to validation spec: ${validationSpec}`);
  }
}
