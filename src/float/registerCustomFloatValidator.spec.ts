import registerCustomFloatValidator, { customFloatValidators } from './registerCustomFloatValidator';

for (const validatorName in customFloatValidators) {
  delete customFloatValidators[validatorName];
}

describe('registerCustomFloatValidator', () => {
  it('should register new custom float validator successfully', () => {
    registerCustomFloatValidator('newValidator', (value) => value === 1);
    expect(customFloatValidators['newValidator'](1)).toEqual(true);
    expect(customFloatValidators['newValidator'](2)).toEqual(false);
  });
  it('should throw if custom float validator with the same name has already been registered', () => {
    registerCustomFloatValidator('newValidator2', (value) => value === 1);
    expect(() => {
      registerCustomFloatValidator('newValidator2', () => true);
    }).toThrow();
  });
});
