export const customFloatValidators: { [validatorName: string]: (value: number) => boolean } = {};

// throws if customer validator with the same name is already registered
export default function registerCustomFloatValidator(
  validatorName: string,
  validateFunc: (value: number) => boolean
): void | never {
  if (customFloatValidators[validatorName]) {
    throw new Error(`Validator '${validatorName}' already exists`);
  }

  customFloatValidators[validatorName] = validateFunc;
}
