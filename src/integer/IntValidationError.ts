import ValidationError from '../error/ValidationError';
import { IntValidationSpec } from './VInt';

export default class IntValidationError<ValidationSpec extends string> extends ValidationError {
  constructor(validationSpec: IntValidationSpec<ValidationSpec>, value: number) {
    super(`Value: ${value} is not a valid integer, validation spec: ${validationSpec}`);
  }
}
