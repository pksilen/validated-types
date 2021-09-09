import VFloat from './VFloat';

describe('FloatValidationError', () => {
  it('should have a proper error message', () => {
    try {
      VFloat.createOrThrow<'0,10'>('0,10', 40.25);
    } catch (error: any) {
      expect(error.message).toEqual(
        'Value 40.25 is not a valid floating point number, validation spec: 0,10'
      );
    }
  });
});
