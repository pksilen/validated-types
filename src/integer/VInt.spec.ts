// noinspection MagicNumberJS

import VInt from './VInt';

VInt.registerCustomValidator('is5', (value) => value === 5);

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
      const int: VInt<'custom:is5'> = VInt.createOrThrow('custom:is5', 5);
      expect(int.value).toEqual(5);
    });
    it('should throw ValidationError when value is not an integer', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', 5.1);
      }).toThrow('Value is not an integer');
    });
    it('should throw ValidationError when value is greater than maxValue specified in validation spec', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', 20);
      }).toThrow('Value is not in allowed range: [0, 10]');
    });
    it('should throw ValidationError when value is not divisible by value giving in validation spec', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,5'>('0,10,5', 3);
      }).toThrow('Value is not divisible by: 5');
    });
    it('should throw ValidationSpecError when divisibleByValue is zero', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,0'>('0,10,0', 0);
      }).toThrow('Invalid divisibleByValue specified in validation spec: 0,10,0');
    });
    it('should throw ValidationSpecError when divisibleByValue is invalid', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,a'>('0,10,a', 0);
      }).toThrow('Invalid divisibleByValue specified in validation spec: 0,10,a');
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
    it('should throw ValidationSpecError with variable name when value is not an integer', () => {
      expect(() => {
        VInt.createOrThrow<'0,10'>('0,10', 5.5, 'varName');
      }).toThrow("Value in 'varName' is not an integer");
    });
    it('should throw IntValidationSpecError with variable name when value is not divisible by given value', () => {
      expect(() => {
        VInt.createOrThrow<'0,10,5'>('0,10,5', 6, 'varName');
      }).toThrow("Value in 'varName' is not divisible by: 5");
    });
  });
  describe('create', () => {
    it('should create a VInt object successfully when value matches validation spec', () => {
      const possibleInt: VInt<'0,10'> | null = VInt.create('0,10', 5);
      expect(possibleInt?.value).toEqual(5);
    });
    it('should return null when value does not match validation spec', () => {
      const possibleInt: VInt<'0,10'> | null = VInt.create('0,10', 11);
      expect(possibleInt).toBeNull();
    });
  });
  describe('createOrError', () => {
    it('should create a VInt object successfully when value matches validation spec', () => {
      const [int, error]: [VInt<'5,10'> | null, Error | null] = VInt.createOrError('5,10', 5);
      expect(int?.value).toEqual(5);
      expect(error).toBeNull();
    });
    it('should return error when value does not match validation spec', () => {
      const [int, error]: [VInt<'0,10'> | null, Error | null] = VInt.createOrError('0,10', -1);
      expect(int).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
