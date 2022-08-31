import SemVInt from './SemVInt';

type HttpPort = SemVInt<'httpPort', '1,65535'>;

describe('SemVInt', () => {
  describe('tryCreate', () => {
    it('should create a semantic validated integer successfully', () => {
      const httpPort: HttpPort = SemVInt.tryCreate('httpPort', '1,65535', 8080);
      expect(httpPort.value).toBe(8080);
    });
  });
  describe('crate', () => {
    it('should create a semantic validated integer successfully', () => {
      const httpPort: HttpPort | null = SemVInt.create('httpPort', '1,65535', 8080);
      expect(httpPort?.value).toBe(8080);
    });
  });
  describe('crateOrError', () => {
    it('should create a semantic validated integer successfully', () => {
      const [httpPort, error] = SemVInt.createOrError<'httpPort', '1,65535'>('httpPort', '1,65535', 8080);
      expect(httpPort?.value).toBe(8080);
      expect(error).toBe(null);
    });
  });
});
