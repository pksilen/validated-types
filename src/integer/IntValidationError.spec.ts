import { VInt } from './VInt';

describe('IntValidationError', () => {
  it('should have a proper error message', () => {
    try {
      VInt.createOrThrow<'0,10'>('0,10', 11);
    } catch (error: any) {
      expect(error.message).toEqual(
        'Value 11 is not a valid integer, validation spec: 0,10'
      );
    }
  });
});
