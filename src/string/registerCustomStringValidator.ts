export const customStringValidators: { [validatorName: string]: (value: string) => boolean } = {};

// throws if customer validator with the same name is already registered
export default function registerCustomStringValidator(
  validatorName: string,
  validateFunc: (value: string) => boolean
): void | never {
  if (customStringValidators[validatorName]) {
    throw new Error(`Validator '${validatorName}' already exists`);
  }

  customStringValidators[validatorName] = validateFunc;
}
