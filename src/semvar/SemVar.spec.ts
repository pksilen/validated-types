import SemVar from './SemVar';

function func(val: SemVar<boolean, 'isInternalCall'>) {
  // NOOP
}

type IsInternalCall = SemVar<boolean, 'isInternalCall'>;
const test = new SemVar<boolean, 'isInternalCall'>({ isInternalCall: true });
func(test);

describe('SemVar', () => {
  describe('constructor', () => {
    it('should create an SemVar object successfully', () => {
      const isInternalCall: IsInternalCall = new SemVar({ isInternalCall: true });
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
