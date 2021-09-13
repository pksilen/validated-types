import VBase from './VBase';

describe('VBase', () => {
  describe('registerCustomValidator', () => {
    it('should register new custom validator successfully', () => {
      VBase.registerCustomValidator('newValidator', (value) => value === 1);
      expect(VBase.getCustomValidator('newValidator')(1)).toEqual(true);
      expect(VBase.getCustomValidator('newValidator')(2)).toEqual(false);
    });
    it('should throw if custom float validator with the same name has already been registered', () => {
      VBase.registerCustomValidator('newValidator2', (value) => value === 1);
      expect(() => {
        VBase.registerCustomValidator('newValidator2', () => true);
      }).toThrow("Validator 'newValidator2' already exists");
    });
  });
});
