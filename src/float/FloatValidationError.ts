import ValidationError from '../error/ValidationError';

export default class FloatValidationError<ValidationSpec extends string> extends ValidationError {}
