import SemVString from './SemVString';

type LoginUrl = SemVString<'loginUrl', '1,8192,url'>;

describe('SemVInt', () => {
  describe('tryCreate', () => {
    it('should create a semantic validated integer successfully', () => {
      const loginUrl: LoginUrl = SemVString.tryCreate('loginUrl', '1,8192,url', 'https://server.com');
      expect(loginUrl.value).toBe('https://server.com');
    });
  });
  describe('crate', () => {
    it('should create a semantic validated integer successfully', () => {
      const loginUrl: LoginUrl | null = SemVString.create('loginUrl', '1,8192,url', 'https://server.com');
      expect(loginUrl?.value).toBe('https://server.com');
    });
  });
  describe('crateOrError', () => {
    it('should create a semantic validated integer successfully', () => {
      const [loginUrl, error] = SemVString.createOrError<'loginUrl', '1,8192,url'>(
        'loginUrl',
        '1,8192,url',
        'https://server.com'
      );
      expect(loginUrl?.value).toBe('https://server.com');
      expect(error).toBe(null);
    });
  });
});
