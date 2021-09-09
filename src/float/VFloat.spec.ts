import { VFloat } from './VFloat';
import FloatValidationError from './FloatValidationError';
import FloatValidationSpecError from './FloatValidationSpecError';

describe('VFloat', () => {
  describe('createOrThrow', () => {
    it('should create a VFloat object successfully when value matches validation spec', () => {
      const float: VFloat<'0.5,10.5'> = VFloat.createOrThrow('0.5,10.5', 5.1);
      const value = float.value;
      expect(value).toEqual(5.1);
    });
    it('should throw when value is greater than maxValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 20.1);
      }).toThrow(FloatValidationError);
    });
    it('should throw FloatValidationError when value is less than minValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 0.4);
      }).toThrow(FloatValidationError);
    });
    it('should throw FloatValidationSpecError when minValue in validation spec is invalid', () => {
      expect(() => {
        VFloat.createOrThrow<'a,10.5'>('a,10.5', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should throw FloatValidationSpecError when maxValue in validation spec is invalid', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,a'>('0.5,a', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should throw FloatValidationSpecError when minValue in validation spec is missing', () => {
      expect(() => {
        VFloat.createOrThrow<',10.5'>(',10.5', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should throw FloatValidationSpecError when maxValue in validation spec is missing', () => {
      expect(() => {
        VFloat.createOrThrow<'10.5,'>('10.5,', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should throw FloatValidationSpecError when minValue and maxValue in validation spec are missing', () => {
      expect(() => {
        VFloat.createOrThrow<','>(',', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
  });
});
