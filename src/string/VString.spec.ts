// noinspection MagicNumberJS

import registerCustomStringValidator from './registerCustomStringValidator';
import VString from './VString';
import StringValidationError from './StringValidationError';
import StringValidationSpecError from './StringValidationSpecError';

registerCustomStringValidator('is5', (value) => value === '5');

describe('VString', () => {
  describe('createOrThrow', () => {
    it('should create a VString object successfully when value matches validation spec containing min length and max length validators', () => {
      const string: VString<'0,10'> = VString.createOrThrow('0,10', 'abc');
      expect(string.value).toEqual('abc');
    });
    it('should create a VString object successfully when value matches validation spec containing min length, max length and unknown length validators ', () => {
      const string: VString<'0,10,alpha'> = VString.createOrThrow('0,10,alpha', 'abc');
      expect(string.value).toEqual('abc');
    });
    it('should create a VString object successfully when value matches validation spec containing known length validator', () => {
      const string: VString<'ipv4'> = VString.createOrThrow('ipv4', '127.0.0.1');
      expect(string.value).toEqual('127.0.0.1');
    });
    it('should create a VString object successfully when value matches validation spec containing parameterized validator', () => {
      const string: VString<'0,10,includes,abc'> = VString.createOrThrow('0,10,includes,abc', ' abc');
      expect(string.value).toEqual(' abc');
    });
    it('should create a VString object successfully when value matches multiple validation specs', () => {
      const string: VString<'0,255,lowercase', 'url', 'startsWith,https', 'endsWith,.html'> =
        VString.createOrThrow(
          ['0,255,lowercase', 'url', 'startsWith,https', 'endsWith,.html'],
          'https://apiserver.domain.com:8080/index.html'
        );

      expect(string.value).toEqual('https://apiserver.domain.com:8080/index.html');
    });
    it('should throw StringValidationError when value has multiple validation specs and value does not match one of them', () => {
      expect(() => {
        VString.createOrThrow<'0,10,lowercase', 'url', 'startsWith,https', 'endsWith,.html'>(
          ['0,10,lowercase', 'url', 'startsWith,https', 'endsWith,.html'],
          'http://apiserver.domain.com:8080/index.html'
        );
      }).toThrow(StringValidationError);
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
        VString.createOrThrow<'0,10,alpha'>(`0,10,alpha`, 'abc123');
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
        VString.createOrThrow<'custom:not_registered'>('custom:not_registered', '4');
      }).toThrow(StringValidationSpecError);
    });
    it('should use 0 as minLength when minLength in validation spec is missing', () => {
      const string = VString.createOrThrow<',10'>(',10', '');
      expect(string.value).toEqual('');
    });
    it('should throw StringValidationSpecError when maxLength in validation spec is missing', () => {
      expect(() => {
        VString.createOrThrow<'10,'>('10,', 'abc');
      }).toThrow(StringValidationSpecError);
    });
    it('should return VString object successfully when isOneOf validator is used', () => {
      const string = VString.createOrThrow<'0,10,isOneOf,["abc","xyz"]'>('0,10,isOneOf,["abc","xyz"]', 'abc');
      expect(string.value).toEqual('abc');
    });
  });
});
