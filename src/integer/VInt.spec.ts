// noinspection MagicNumberJS

import { VInt } from './VInt';
import IntValidationError from './IntValidationError';
import IntValidationSpecError from './IntValidationSpecError';
import { VFloat } from '../float/VFloat';
import registerCustomFloatValidator from '../float/registerCustomFloatValidator';
import FloatValidationError from '../float/FloatValidationError';
import FloatValidationSpecError from '../float/FloatValidationSpecError';

registerCustomFloatValidator('is5', (value) => value === 5);

describe('VInt', () => {
  describe('createOrThrow', () => {
    it('should create a VInt object successfully when value matches validation spec', () => {
      const int1: VInt<'0,10'> = VInt.createOrThrow('0,10', 5);
      const int2: VInt<'0,10,'> = VInt.createOrThrow('0,10,', 5);
      expect(int1.value).toEqual(5);
      expect(int2.value).toEqual(5);
    });
    it('should create a VInt object successfully when validation spec contains whitespace', () => {
      const int: VInt<' 0 , 10 '> = VInt.createOrThrow(' 0 , 10 ', 5);
      expect(int.value).toEqual(5);
    });
    it('should create a VInt object successfully when validation spec contains divisibleByValue', () => {
      const int: VInt<'0,10,5'> = VInt.createOrThrow('0,10,5', 5);
      expect(int.value).toEqual(5);
    });
    it('should create a VInt object successfully when custom validation function call evaluates to true for the value', () => {
      const int: VFloat<'custom:is5'> = VFloat.createOrThrow('custom:is5', 5);
      expect(int.value).toEqual(5);
    });
    it('should throw IntValidationError when value is greater than maxValue specified in validation spec', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', 20);
      }).toThrow(IntValidationError);
    });
    it('should throw IntValidationError when value is less than minValue specified in validation spec', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', -1);
      }).toThrow(IntValidationError);
    });
    it('should throw IntValidationError when value is a floating point number', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', 5.1);
      }).toThrow(IntValidationError);
    });
    it('should throw IntValidationError when value is not divisible by value giving in validation spec', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,5'>('0,10,5', 3);
      }).toThrow(IntValidationError);
    });
    it('should throw FloatValidationError when custom validation function call evaluates to false for the value', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:is5'>('custom:is5', 3);
      }).toThrow(FloatValidationError);
    });
    it('should throw IntValidationSpecError when minValue in validation spec is invalid', () => {
      expect(() => {
        VInt.createOrThrow<'a,10'>('a,10', 0);
      }).toThrow(IntValidationSpecError);
    });
    it('should throw IntValidationSpecError when maxValue in validation spec is invalid', () => {
      expect(() => {
        VInt.createOrThrow<'0,a'>('0,a', 0);
      }).toThrow(IntValidationSpecError);
    });
    it('should throw IntValidationSpecError when divisibleByValue is zero', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,0'>('0,10,0', 0);
      }).toThrow(IntValidationSpecError);
    });
    it('should throw IntValidationSpecError when divisibleByValue is invalid', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,a'>('0,10,a', 0);
      }).toThrow(IntValidationSpecError);
    });
    it('should throw FloatValidationSpecError when custom validator is not registered', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:not_registered'>('custom:not_registered', 4);
      }).toThrow(FloatValidationSpecError);
    });
    it('should use Number.MIN_SAFE_INTEGER as minValue when minValue in validation spec is missing', () => {
      const int = VInt.createOrThrow<',10'>(',10', Number.MIN_SAFE_INTEGER);
      expect(int.value).toEqual(Number.MIN_SAFE_INTEGER);
    });
    it('should use Number.MAX_SAFE_INTEGER as maxValue when maxValue invalidation spec is missing', () => {
      const int = VInt.createOrThrow<'10,'>('10,', Number.MAX_SAFE_INTEGER);
      expect(int.value).toEqual(Number.MAX_SAFE_INTEGER);
    });
    it('should use Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER as minValue and maxValue when minValue and maxValue in validation spec are missing', () => {
      const int1 = VInt.createOrThrow<','>(',', Number.MIN_SAFE_INTEGER);
      const int2 = VInt.createOrThrow<','>(',', Number.MAX_SAFE_INTEGER);
      expect(int1.value).toEqual(Number.MIN_SAFE_INTEGER);
      expect(int2.value).toEqual(Number.MAX_SAFE_INTEGER);
    });
  });
});
