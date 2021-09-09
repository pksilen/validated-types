export const customIntValidators: { [validatorName: string]: (value: number) => boolean } = {};

// throws if customer validator with the same name is already registered
export default function registerCustomIntValidator(
  validatorName: string,
  validateFunc: (value: number) => boolean
): void | never {
  if (customIntValidators[validatorName]) {
    throw new Error(`Validator '${validatorName}' already exists`);
  }

  customIntValidators[validatorName] = validateFunc;
}
