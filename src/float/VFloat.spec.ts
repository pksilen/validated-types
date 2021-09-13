// noinspection MagicNumberJS

import VFloat from './VFloat';

VFloat.registerCustomValidator('is5_1', (value) => value === 5.1);

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
    it('should create a VFloat object successfully when value is validated as positive', () => {
      const float: VFloat<'positive'> = VFloat.createOrThrow('positive', 5.1);
      expect(float.value).toEqual(5.1);
    });
    it('should create a VFloat object successfully when value is validated as negative', () => {
      const float: VFloat<'negative'> = VFloat.createOrThrow('negative', -5.1);
      expect(float.value).toEqual(5.1);
    });
    it('should throw ValidationError when value is greater than maxValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 20.1);
      }).toThrow('Value is not in allowed range: [0.5, 10.5]');
    });
    it('should throw ValidationError when value is less than minValue specified in validation spec', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,10.5'>('0.5,10.5', 0.4);
      }).toThrow('Value is not in allowed range: [0.5, 10.5]');
    });
    it('should throw ValidationError when value is not validated as positive', () => {
      expect(() => {
        VFloat.createOrThrow<'positive'>('positive', -0.4);
      }).toThrow('Value must be positive');
    });
    it('should throw ValidationError when value is not validated as negative', () => {
      expect(() => {
        VFloat.createOrThrow<'negative'>('negative', 0.4);
      }).toThrow('Value must be negative');
    });
    it('should throw ValidationError when custom validation function call evaluates to false for the value', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:is5_1'>('custom:is5_1', 0.4);
      }).toThrow('Value does not match custom float validator: is5_1');
    });
    it('should throw ValidationSpecError when minValue in validation spec is invalid', () => {
      expect(() => {
        VFloat.createOrThrow<'a,10.5'>('a,10.5', 0.4);
      }).toThrow('Invalid minValue specified in validation spec: a,10.5');
    });
    it('should throw ValidationSpecError when maxValue in validation spec is invalid', () => {
      expect(() => {
        VFloat.createOrThrow<'0.5,a'>('0.5,a', 0.4);
      }).toThrow('Invalid maxValue specified in validation spec: 0.5,a');
    });
    it('should throw ValidationSpecError when custom validator is not registered', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:not_registered'>('custom:not_registered', 0.4);
      }).toThrow('Custom validator not registered with name: not_registered');
    });
    it('should use Number.MIN_VALUE as minValue when minValue in validation spec is missing', () => {
      const float = VFloat.createOrThrow<',10.5'>(',10.5', Number.MIN_VALUE);
      expect(float.value).toEqual(Number.MIN_VALUE);
    });
    it('should use Number.MAX_VALUE as maxValue when maxValue in validation spec is missing', () => {
      const float = VFloat.createOrThrow<'10.5,'>('10.5,', Number.MAX_VALUE);
      expect(float.value).toEqual(Number.MAX_VALUE);
    });
    it('should use Number.MIN_VALUE and Number.MAX_VALUE as minValue and maxValue when minValue and maxValue in validation spec are missing', () => {
      const float1 = VFloat.createOrThrow<','>(',', Number.MIN_VALUE);
      const float2 = VFloat.createOrThrow<','>(',', Number.MAX_VALUE);
      expect(float1.value).toEqual(Number.MIN_VALUE);
      expect(float2.value).toEqual(Number.MAX_VALUE);
    });
    it('should throw ValidationSpecError with variable name when value is not in specified range', () => {
      expect(() => {
        VFloat.createOrThrow<'0,10'>('0,10', Number.MAX_VALUE, 'varName');
      }).toThrow("Value in 'varName' is not in allowed range: [0, 10]");
    });
    it('should throw ValidationSpecError with variable name when value is not positive', () => {
      expect(() => {
        VFloat.createOrThrow<'positive'>('positive', -1.2, 'varName');
      }).toThrow("Value in 'varName' is not positive");
    });
    it('should throw ValidationSpecError with variable name when value is not negative', () => {
      expect(() => {
        VFloat.createOrThrow<'negative'>('negative', 1.2, 'varName');
      }).toThrow("Value in 'varName' is not negative");
    });
    it('should throw ValidationSpecError with variable name when using custom validator', () => {
      expect(() => {
        VFloat.createOrThrow<'custom:is5_1'>('custom:is5_1', 4, 'varName');
      }).toThrow("Value in 'varName' does not match custom validator: is5_1");
    });
  });
  describe('create', () => {
    it('should create a VFloat object successfully when value matches validation spec', () => {
      const possibleFloat: VFloat<'0.5,10.5'> | null = VFloat.create('0.5,10.5', 5.1);
      expect(possibleFloat?.value).toEqual(5.1);
    });
    it('should return null when value does not match validation spec', () => {
      const possibleFloat: VFloat<'0.5,10.5'> | null = VFloat.create('0.5,10.5', 0.3);
      expect(possibleFloat).toEqual(null);
    });
  });
});
