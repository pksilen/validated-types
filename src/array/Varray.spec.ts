// noinspection MagicNumberJS

import VArray from './VArray';
import VString from '../string/VString';

VArray.registerCustomValidator<number[]>('has5', (value) => value.includes(5));

describe('VArray', () => {
  describe('createOrThrow', () => {
    it('should create a VArray object successfully when value matches validation spec', () => {
      const array: VArray<'0,10', number> = VArray.createOrThrow('0,10', [5]);
      expect(array.value).toEqual([5]);
    });
    it('should create a VArray object successfully when custom validation function call evaluates to true for the value', () => {
      const array: VArray<'custom:has5', number> = VArray.createOrThrow('custom:has5', [4, 5]);
      expect(array.value).toEqual([4, 5]);
    });
    it('should create a VArray object successfully when values are validated as unique', () => {
      const array: VArray<'0,10,unique', number> = VArray.createOrThrow('0,10,unique', [4, 5, 6]);
      expect(array.value).toEqual([4, 5, 6]);
    });
    it('should throw validation error when values are other validated objects (VString) and are not unique', () => {
      const email: VString<'email'> = VString.createOrThrow('email', 'test@example.com');
      const email2: VString<'email'> = VString.createOrThrow('email', 'test@example.com');
      expect(() => {
        VArray.createOrThrow<'0,10,unique', VString<'email'>>('0,10,unique', [email, email2]);
      }).toThrow('Values are not unique');
    });
    it('should throw a ValidationError when values are not validated as unique', () => {
      expect(() => {
        VArray.createOrThrow<'0,10,unique', number>('0,10,unique', [4, 4, 6]);
      }).toThrow('Values are not unique');
    });
    it('should throw a ValidationError with varName when values are not validated as unique', () => {
      expect(() => {
        VArray.createOrThrow<'0,10,unique', number>('0,10,unique', [4, 4, 6], 'varName');
      }).toThrow("Values in 'varName' are not unique");
    });
  });
  describe('create', () => {
    it('should create a VArray object successfully when value matches validation spec', () => {
      const array: VArray<'0,10', number> | null = VArray.create('0,10', [5]);
      expect(array?.value).toEqual([5]);
    });
    it('should return null when value does not match validation spec', () => {
      const array: VArray<'2,10', number> | null = VArray.create('2,10', [5]);
      expect(array).toBeNull();
    });
  });
  describe('createOrError', () => {
    it('should create a VArray object successfully when value matches validation spec', () => {
      const [array, error]: [VArray<'1,10', number> | null, Error | null] = VArray.createOrError('1,10', [5]);
      expect(array?.value).toEqual([5]);
      expect(error).toBeNull();
    });
    it('should return error when value does not match validation spec', () => {
      const [float, error]: [VArray<'2,10', number> | null, Error | null] = VArray.createOrError('2,10', [5]);
      expect(float).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
