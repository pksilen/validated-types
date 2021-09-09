import ValidationError from '../error/ValidationError';
import { FloatValidationSpec } from './VFloat';

export default class FloatValidationError<ValidationSpec extends string> extends ValidationError {
  constructor(validationSpec: FloatValidationSpec<ValidationSpec>, value: number) {
    super(`Value ${value} is not a valid floating point number, validation spec: ${validationSpec}`);
  }
}
