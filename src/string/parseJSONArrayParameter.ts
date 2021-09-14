import ValidationSpecError from '../error/ValidationSpecError';

export default function parseJSONArrayParameter(parameter: string | undefined): string[] {
  if (!parameter) {
    throw new ValidationSpecError(
      'Validator parameter must a JSON array of strings, for example ["abc", "xyz"]'
    );
  }

  try {
    const parameters = JSON.parse(parameter);
    if (!Array.isArray(parameters)) {
      throw new ValidationSpecError(
        'Validator parameter must a JSON array of strings, for example ["abc", "xyz"]'
      );
    }

    return parameters.map((param) => (typeof param === 'string' ? param : param.toString()));
  } catch {
    throw new ValidationSpecError(
      'Validator parameter must a JSON array of strings, for example ["abc", "xyz"]'
    );
  }
}
