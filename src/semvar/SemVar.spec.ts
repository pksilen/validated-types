import SemVar from './SemVar';

type IsInternalCall = SemVar<boolean, 'isInternalCall'>;

describe('SemVar', () => {
  describe('constructor', () => {
    it('should create an SemVar object successfully', () => {
      const isInternalCall: IsInternalCall = new SemVar('isInternalCall', true);
      expect(isInternalCall).toBeInstanceOf(SemVar);
    });
  });
  describe('value', () => {
    it('should return the value encapsulated by SemVar object successfully', () => {
      const isInternalCall: IsInternalCall = new SemVar('isInternalCall', true);
      expect(isInternalCall.value).toBe(true);
    });
  });
});
