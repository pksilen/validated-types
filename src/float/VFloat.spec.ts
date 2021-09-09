// noinspection MagicNumberJS

import VFloat from './VFloat';
import FloatValidationError from './FloatValidationError';
import FloatValidationSpecError from './FloatValidationSpecError';
import registerCustomFloatValidator from './registerCustomFloatValidator';

registerCustomFloatValidator('is5_1', (value) => value === 5.1);

describe('VFloat', () => {
  describe('createOrThrow', () => {
    it('should create a VFloat object successfully when value matches validation spec', () => {
      const float: VFloat<'0.5,10.5'> = VFloat.createOrThrow('0.5,10.5', 5.1);
      expect(float.value).toEqual(5.1);
    });
    it('should create a VFloat object successfully when validation spec contains whitespace', () => {
      const float: VFloat<' 0.5 , 10.5 '> = VFloat.createOrThrow(' 0.5 , 10.5 ', 5.1);
      expect(float.value).toEqual(5.1);
    });
    it('should create a VFloat object successfully when custom validation function call evaluates to true for the value', () => {
      const float: VFloat<'custom:is5_1'> = VFloat.createOrThrow('custom:is5_1', 5.1);
      expect(float.value).toEqual(5.1);
    });
    it('should throw FloatValidationError when value is greater than maxValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 20.1);
      }).toThrow(FloatValidationError);
    });
    it('should throw FloatValidationError when value is less than minValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 0.4);
      }).toThrow(FloatValidationError);
    });
    it('should throw FloatValidationError when custom validation function call evaluates to false for the value', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:is5_1'>('custom:is5_1', 0.4);
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
    it('should throw FloatValidationSpecError when custom validator is not registered', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:not_registered'>('custom:not_registered', 0.4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should use Number.MIN_VALUE as minValue when minValue in validation spec is missing', () => {
      const float = VFloat.createOrThrow<',10.5'>(',10.5', Number.MIN_VALUE);
      expect(float.value).toEqual(Number.MIN_VALUE);
    });
    it('should use Number.MAX_VALUE as maxValue when maxValue invalidation spec is missing', () => {
      const float = VFloat.createOrThrow<'10.5,'>('10.5,', Number.MAX_VALUE);
      expect(float.value).toEqual(Number.MAX_VALUE);
    });
    it('should use Number.MIN_VALUE and Number.MAX_VALUE as minValue and maxValue when minValue and maxValue in validation spec are missing', () => {
      const float1 = VFloat.createOrThrow<','>(',', Number.MIN_VALUE);
      const float2 = VFloat.createOrThrow<','>(',', Number.MAX_VALUE);
      expect(float1.value).toEqual(Number.MIN_VALUE);
      expect(float2.value).toEqual(Number.MAX_VALUE);
    });
  });
});
