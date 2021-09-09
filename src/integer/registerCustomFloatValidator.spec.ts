import registerCustomIntValidator, { customIntValidators } from './registerCustomIntValidator';

for (const validatorName in customIntValidators) {
  delete customIntValidators[validatorName];
}

describe('registerCustomIntValidator', () => {
  it('should register new custom int validator successfully', () => {
    registerCustomIntValidator('newValidator', (value) => value === 1);
    expect(customIntValidators['newValidator'](1)).toEqual(true);
    expect(customIntValidators['newValidator'](2)).toEqual(false);
  });
  it('should throw if custom int validator with the same name has already been registered', () => {
    registerCustomIntValidator('newValidator2', (value) => value === 1);
    expect(() => {
      registerCustomIntValidator('newValidator2', () => true);
    }).toThrow();
  });
});
