import SemVFloat from './SemVFloat';

type LoanInterest = SemVFloat<'loanInterest', '0,100'>;

describe('SemVFloat', () => {
  describe('tryCreate', () => {
    it('should create a semantic validated integer successfully', () => {
      const loanInterest: LoanInterest = SemVFloat.tryCreate('loanInterest', '0,100', 4.99);
      expect(loanInterest.value).toBeCloseTo(4.99, 2);
    });
  });
  describe('crate', () => {
    it('should create a semantic validated integer successfully', () => {
      const loanInterest: LoanInterest | null = SemVFloat.create('loanInterest', '0,100', 4.99);
      expect(loanInterest?.value).toBeCloseTo(4.99, 2);
    });
  });
  describe('crateOrError', () => {
    it('should create a semantic validated integer successfully', () => {
      const [loanInterest, error] = SemVFloat.createOrError<'loanInterest', '0,100'>(
        'loanInterest',
        '0,100',
        4.99
      );
      expect(loanInterest?.value).toBeCloseTo(4.99, 2);
      expect(error).toBe(null);
    });
  });
});
