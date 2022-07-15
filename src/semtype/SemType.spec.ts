import SemType from './SemType';

function func(val: SemType<boolean, 'isInternalCall'>) {
  // NOOP
}

type IsInternalCall = SemType<boolean, 'isInternalCall'>;
const test = new SemType<boolean, 'isInternalCall'>({ isInternalCall: true });
func(test);

describe('SemVar', () => {
  describe('constructor', () => {
    it('should create an SemVar object successfully', () => {
      const isInternalCall: IsInternalCall = new SemType({ isInternalCall: true });
      expect(isInternalCall).toBeInstanceOf(SemType);
    });
  });
  describe('value', () => {
    it('should return the value encapsulated by SemVar object successfully', () => {
      const isInternalCall: IsInternalCall = new SemType('isInternalCall', true);
      expect(isInternalCall.value).toBe(true);
    });
  });
});
