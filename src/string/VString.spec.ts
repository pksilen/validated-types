// noinspection MagicNumberJS

import registerCustomStringValidator from './registerCustomStringValidator';
import VString from './VString';
import StringValidationError from './StringValidationError';
import StringValidationSpecError from './StringValidationSpecError';

registerCustomStringValidator('is5', (value) => value === '5');

describe('VString', () => {
  describe('createOrThrow', () => {
    it('should create a VString object successfully when value matches validation spec', () => {
      const string1: VString<'0,10'> = VString.createOrThrow('0,10', 'abc');
      const string2: VString<'0,10,alpha'> = VString.createOrThrow('0,10,alpha', 'abc');
      const string3: VString<'ipv4'> = VString.createOrThrow('ipv4', '127.0.0.1');
      const string4: VString<'0,10,includes,abc'> = VString.createOrThrow('0,10,includes,abc', ' abc');

      expect(string1.value).toEqual('abc');
      expect(string2.value).toEqual('abc');
      expect(string3.value).toEqual('127.0.0.1');
      expect(string4.value).toEqual(' abc');
    });
    it('should create a VString object successfully when validation spec contains whitespace', () => {
      const string: VString<' 0 , 10 '> = VString.createOrThrow(' 0 , 10 ', 'abc');
      expect(string.value).toEqual('abc');
    });
    it('should create a VString object successfully when custom validation function call evaluates to true for the value', () => {
      const string: VString<'custom:is5'> = VString.createOrThrow('custom:is5', '5');
      expect(string.value).toEqual('5');
    });
    it('should throw StringValidationError when value length is greater than maxLength specified in validation spec', () => {
      expect(() => {
        VString.createOrThrow<'0,5'>('0,5', '123456');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationError when value length is less than minLength specified in validation spec', () => {
      expect(() => {
        VString.createOrThrow<'5,10'>('5,10', 'abc');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationError when value does not match unknown length validator', () => {
      expect(() => {
        VString.createOrThrow<'0,10,alpha', 'url'>([`0,10,alpha`, 'url'], 'abc123');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationError when value does not match known length validator', () => {
      expect(() => {
        VString.createOrThrow<'boolean'>('boolean', 'abc123');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationError when value does not match parameterized validator', () => {
      expect(() => {
        VString.createOrThrow<'0,10,match,ab+'>('0,10,match,ab+', 'xyz');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationError when custom validation function call evaluates to false for the value', () => {
      expect(() => {
        VString.createOrThrow<'custom:is5'>('custom:is5', 'abc');
      }).toThrow(StringValidationError);
    });
    it('should throw StringValidationSpecError when minLength in validation spec is invalid', () => {
      expect(() => {
        VString.createOrThrow<'a,10'>('a,10', 'abc');
      }).toThrow(StringValidationSpecError);
    });
    it('should throw StringValidationSpecError when maxLength in validation spec is invalid', () => {
      expect(() => {
        VString.createOrThrow<'0,a'>('0,a', 'abc');
      }).toThrow(StringValidationSpecError);
    });
    it('should throw StringValidationSpecError when custom validator is not registered', () => {
      expect(() => {
        VString.createOrThrow<'custom:not_registered'>('custom:not_registered', 4);
      }).toThrow(StringValidationSpecError);
    });
    it('should use Number.MIN_SAFE_INTEGER as minValue when minValue in validation spec is missing', () => {
      const int = VString.createOrThrow<',10'>(',10', Number.MIN_SAFE_INTEGER);
      expect(int.value).toEqual(Number.MIN_SAFE_INTEGER);
    });
    it('should use Number.MAX_SAFE_INTEGER as maxValue when maxValue invalidation spec is missing', () => {
      const int = VString.createOrThrow<'10,'>('10,', Number.MAX_SAFE_INTEGER);
      expect(int.value).toEqual(Number.MAX_SAFE_INTEGER);
    });
    it('should use Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER as minValue and maxValue when minValue and maxValue in validation spec are missing', () => {
      const int1 = VString.createOrThrow<','>(',', Number.MIN_SAFE_INTEGER);
      const int2 = VString.createOrThrow<','>(',', Number.MAX_SAFE_INTEGER);
      expect(int1.value).toEqual(Number.MIN_SAFE_INTEGER);
      expect(int2.value).toEqual(Number.MAX_SAFE_INTEGER);
    });
  });
});
