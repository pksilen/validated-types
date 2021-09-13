import validator from 'validator';
import { stringValidators } from './stringValidators';

jest.mock('validator');

describe('stringValidators', () => {
  describe('boolean', () => {
    it('should validate boolean', () => {
      stringValidators.boolean('true');
      expect(validator.isBoolean).toHaveBeenCalledTimes(1);
      expect(validator.isBoolean).toHaveBeenCalledWith('true');
    });
  });
  describe('bic', () => {
    it('should validate BIC', () => {
      stringValidators.bic('bic');
      expect(validator.isBIC).toHaveBeenCalledTimes(1);
      expect(validator.isBIC).toHaveBeenCalledWith('bic');
    });
  });
  describe('btcAddress', () => {
    it('should validate BTC address', () => {
      stringValidators.btcAddress('btcAddress');
      expect(validator.isBtcAddress).toHaveBeenCalledTimes(1);
      expect(validator.isBtcAddress).toHaveBeenCalledWith('btcAddress');
    });
  });
  describe('creditCard', () => {
    it('should validate credit card number', () => {
      stringValidators.creditCard('creditCard');
      expect(validator.isCreditCard).toHaveBeenCalledTimes(1);
      expect(validator.isCreditCard).toHaveBeenCalledWith('creditCard');
    });
  });
  describe('ean', () => {
    it('should validate EAN code', () => {
      stringValidators.ean('ean');
      expect(validator.isEAN).toHaveBeenCalledTimes(1);
      expect(validator.isEAN).toHaveBeenCalledWith('ean');
    });
  });
  describe('email', () => {
    it('should validate email address', () => {
      stringValidators.email('email');
      expect(validator.isEmail).toHaveBeenCalledTimes(1);
      expect(validator.isEmail).toHaveBeenCalledWith('email');
    });
  });
  describe('ethereumAddress', () => {
    it('should validate Ethereum address', () => {
      stringValidators.ethereumAddress('ethereumAddress');
      expect(validator.isEthereumAddress).toHaveBeenCalledTimes(1);
      expect(validator.isEthereumAddress).toHaveBeenCalledWith('ethereumAddress');
    });
  });
  describe('hsl', () => {
    it('should validate HSL value', () => {
      stringValidators.hsl('hsl');
      expect(validator.isHSL).toHaveBeenCalledTimes(1);
      expect(validator.isHSL).toHaveBeenCalledWith('hsl');
    });
  });
  describe('hexColor', () => {
    it('should validate hex color value', () => {
      stringValidators.hexColor('color');
      expect(validator.isHexColor).toHaveBeenCalledTimes(1);
      expect(validator.isHexColor).toHaveBeenCalledWith('color');
    });
  });
  describe('isin', () => {
    it('should validate ISIN value', () => {
      stringValidators.isin('isin');
      expect(validator.isISIN).toHaveBeenCalledTimes(1);
      expect(validator.isISIN).toHaveBeenCalledWith('isin');
    });
  });
  describe('iban', () => {
    it('should validate IBAN value', () => {
      stringValidators.iban('iban');
      expect(validator.isIBAN).toHaveBeenCalledTimes(1);
      expect(validator.isIBAN).toHaveBeenCalledWith('iban');
    });
  });
  describe('ipv4', () => {
    it('should validate IP v4 address', () => {
      stringValidators.ipv4('ip');
      expect(validator.isIP).toHaveBeenCalledTimes(1);
      expect(validator.isIP).toHaveBeenCalledWith('ip', 4);
    });
  });
  describe('ipv6', () => {
    it('should validate IP v6 address', () => {
      stringValidators.ipv6('ip');
      expect(validator.isIP).toHaveBeenCalledWith('ip', 6);
    });
  });
  describe('iso31661Alpha2', () => {
    it('should validate ISO 31661 alpha 2 country code', () => {
      stringValidators.iso31661Alpha2('cc');
      expect(validator.isISO31661Alpha2).toHaveBeenCalledTimes(1);
      expect(validator.isISO31661Alpha2).toHaveBeenCalledWith('cc');
    });
  });
  describe('iso31661Alpha3', () => {
    it('should validate ISO 31661 alpha 3 country code', () => {
      stringValidators.iso31661Alpha3('cc');
      expect(validator.isISO31661Alpha3).toHaveBeenCalledTimes(1);
      expect(validator.isISO31661Alpha3).toHaveBeenCalledWith('cc');
    });
  });
  describe('iso8601', () => {
    it('should validate ISO 8601 timestamp', () => {
      stringValidators.iso8601('timestamp');
      expect(validator.isISO8601).toHaveBeenCalledTimes(1);
      expect(validator.isISO8601).toHaveBeenCalledWith('timestamp');
    });
  });
  describe('isrc', () => {
    it('should validate ISRC value', () => {
      stringValidators.isrc('isrc');
      expect(validator.isISRC).toHaveBeenCalledTimes(1);
      expect(validator.isISRC).toHaveBeenCalledWith('isrc');
    });
  });
  describe('issn', () => {
    it('should validate ISSN value', () => {
      stringValidators.issn('issn');
      expect(validator.isISSN).toHaveBeenCalledTimes(1);
      expect(validator.isISSN).toHaveBeenCalledWith('issn');
    });
  });
  describe('jwt', () => {
    it('should validate JWT', () => {
      stringValidators.jwt('jwt');
      expect(validator.isJWT).toHaveBeenCalledTimes(1);
      expect(validator.isJWT).toHaveBeenCalledWith('jwt');
    });
  });
  describe('latLong', () => {
    it('should validate latitude, longitude pair', () => {
      stringValidators.latLong('latLong');
      expect(validator.isLatLong).toHaveBeenCalledTimes(1);
      expect(validator.isLatLong).toHaveBeenCalledWith('latLong');
    });
  });
  describe('macAddress', () => {
    it('should validate MAC address', () => {
      stringValidators.macAddress('macAddress');
      expect(validator.isMACAddress).toHaveBeenCalledTimes(1);
      expect(validator.isMACAddress).toHaveBeenCalledWith('macAddress');
    });
  });
  describe('mimeType', () => {
    it('should validate MIME type', () => {
      stringValidators.mimeType('mimeType');
      expect(validator.isMimeType).toHaveBeenCalledTimes(1);
      expect(validator.isMimeType).toHaveBeenCalledWith('mimeType');
    });
  });
  describe('port', () => {
    it('should validate IP port', () => {
      stringValidators.port('port');
      expect(validator.isPort).toHaveBeenCalledTimes(1);
      expect(validator.isPort).toHaveBeenCalledWith('port');
    });
  });
  describe('rgbColor', () => {
    it('should validate RGB color', () => {
      stringValidators.rgbColor('rgbColor');
      expect(validator.isRgbColor).toHaveBeenCalledTimes(1);
      expect(validator.isRgbColor).toHaveBeenCalledWith('rgbColor');
    });
  });
  describe('semVer', () => {
    it('should validate semantic version', () => {
      stringValidators.semVer('semVer');
      expect(validator.isSemVer).toHaveBeenCalledTimes(1);
      expect(validator.isSemVer).toHaveBeenCalledWith('semVer');
    });
  });
  describe('uuid', () => {
    it('should validate UUID', () => {
      stringValidators.uuid('uuid');
      expect(validator.isUUID).toHaveBeenCalledTimes(1);
      expect(validator.isUUID).toHaveBeenCalledWith('uuid');
    });
  });
  describe('postalCode', () => {
    it('should validate postal code', () => {
      stringValidators.postalCode('postalCode');
      expect(validator.isPostalCode).toHaveBeenCalledTimes(1);
      expect(validator.isPostalCode).toHaveBeenCalledWith('postalCode', 'any');
    });
  });
  describe('mobileNumber', () => {
    it('should validate mobile phone number', () => {
      stringValidators.mobileNumber('mobileNumber');
      expect(validator.isMobilePhone).toHaveBeenCalledTimes(1);
      expect(validator.isMobilePhone).toHaveBeenCalledWith('mobileNumber', 'any');
    });
  });
  describe('alpha', () => {
    it('should validate alphabetic characters', () => {
      stringValidators.alpha('alpha');
      expect(validator.isAlpha).toHaveBeenCalledTimes(1);
      expect(validator.isAlpha).toHaveBeenCalledWith('alpha');
    });
  });
  describe('alphanumeric', () => {
    it('should validate alphanumeric characters', () => {
      stringValidators.alphanumeric('alphanumeric');
      expect(validator.isAlphanumeric).toHaveBeenCalledTimes(1);
      expect(validator.isAlphanumeric).toHaveBeenCalledWith('alphanumeric');
    });
  });
  describe('ascii', () => {
    it('should validate ascii characters', () => {
      stringValidators.ascii('ascii');
      expect(validator.isAscii).toHaveBeenCalledTimes(1);
      expect(validator.isAscii).toHaveBeenCalledWith('ascii');
    });
  });
  describe('base32', () => {
    it('should validate base32 value', () => {
      stringValidators.base32('base32');
      expect(validator.isBase32).toHaveBeenCalledTimes(1);
      expect(validator.isBase32).toHaveBeenCalledWith('base32');
    });
  });
  describe('base58', () => {
    it('should validate base58 value', () => {
      stringValidators.base58('base58');
      expect(validator.isBase58).toHaveBeenCalledTimes(1);
      expect(validator.isBase58).toHaveBeenCalledWith('base58');
    });
  });
  describe('base64', () => {
    it('should validate base64 value', () => {
      stringValidators.base64('base64');
      expect(validator.isBase64).toHaveBeenCalledTimes(1);
      expect(validator.isBase64).toHaveBeenCalledWith('base64');
    });
  });
  describe('dataUri', () => {
    it('should validate data URI', () => {
      stringValidators.dataUri('dataUri');
      expect(validator.isDataURI).toHaveBeenCalledTimes(1);
      expect(validator.isDataURI).toHaveBeenCalledWith('dataUri');
    });
  });
  describe('decimal', () => {
    it('should validate decimal value', () => {
      stringValidators.decimal('decimal');
      expect(validator.isDecimal).toHaveBeenCalledTimes(1);
      expect(validator.isDecimal).toHaveBeenCalledWith('decimal');
    });
  });
  describe('fqdn', () => {
    it('should validate FQDN', () => {
      stringValidators.fqdn('fqdn');
      expect(validator.isFQDN).toHaveBeenCalledTimes(1);
      expect(validator.isFQDN).toHaveBeenCalledWith('fqdn');
    });
  });
  describe('md4', () => {
    it('should validate MD4', () => {
      stringValidators.md4('md4');
      expect(validator.isHash).toHaveBeenCalledTimes(1);
      expect(validator.isHash).toHaveBeenCalledWith('md4', 'md4');
    });
  });
  describe('md5', () => {
    it('should validate MD5', () => {
      stringValidators.md5('md5');
      expect(validator.isHash).toHaveBeenCalledWith('md5', 'md5');
    });
  });
  describe('sha1', () => {
    it('should validate SHA1', () => {
      stringValidators.sha1('sha1');
      expect(validator.isHash).toHaveBeenCalledWith('sha1', 'sha1');
    });
  });
  describe('sha256', () => {
    it('should validate SHA256', () => {
      stringValidators.sha256('sha256');
      expect(validator.isHash).toHaveBeenCalledWith('sha256', 'sha256');
    });
  });
  describe('sha384', () => {
    it('should validate SHA384', () => {
      stringValidators.sha384('sha384');
      expect(validator.isHash).toHaveBeenCalledWith('sha384', 'sha384');
    });
  });
  describe('sha512', () => {
    it('should validate SHA512', () => {
      stringValidators.sha512('sha512');
      expect(validator.isHash).toHaveBeenCalledWith('sha512', 'sha512');
    });
  });
  describe('crc32', () => {
    it('should validate CRC32', () => {
      stringValidators.crc32('crc32');
      expect(validator.isHash).toHaveBeenCalledWith('crc32', 'crc32');
    });
  });
  describe('crc32b', () => {
    it('should validate CRC32b', () => {
      stringValidators.crc32b('crc32b');
      expect(validator.isHash).toHaveBeenCalledWith('crc32b', 'crc32b');
    });
  });
  describe('hex', () => {
    it('should validate hex value', () => {
      stringValidators.hex('hex');
      expect(validator.isHexadecimal).toHaveBeenCalledTimes(1);
      expect(validator.isHexadecimal).toHaveBeenCalledWith('hex');
    });
  });
  describe('ipv4Range', () => {
    it('should validate IPv4 range', () => {
      stringValidators.ipv4Range('ipv4Range');
      expect(validator.isIPRange).toHaveBeenCalledTimes(1);
      expect(validator.isIPRange).toHaveBeenCalledWith('ipv4Range', 4);
    });
  });
  describe('ipv6Range', () => {
    it('should validate IPv6 range', () => {
      stringValidators.ipv6Range('ipv6Range');
      expect(validator.isIPRange).toHaveBeenCalledWith('ipv6Range', 6);
    });
  });
  describe('json', () => {
    it('should validate JSON', () => {
      stringValidators.json('json');
      expect(validator.isJSON).toHaveBeenCalledTimes(1);
      expect(validator.isJSON).toHaveBeenCalledWith('json');
    });
  });
  describe('lowercase', () => {
    it('should validate lowercase characters', () => {
      stringValidators.lowercase('lowercase');
      expect(validator.isLowercase).toHaveBeenCalledTimes(1);
      expect(validator.isLowercase).toHaveBeenCalledWith('lowercase');
    });
  });
  describe('magnetUri', () => {
    it('should validate Magnet URI', () => {
      stringValidators.magnetUri('magnetUri');
      expect(validator.isMagnetURI).toHaveBeenCalledTimes(1);
      expect(validator.isMagnetURI).toHaveBeenCalledWith('magnetUri');
    });
  });
  describe('mongoId', () => {
    it('should validate Mongo id', () => {
      stringValidators.mongoId('mongoId');
      expect(validator.isMongoId).toHaveBeenCalledTimes(1);
      expect(validator.isMongoId).toHaveBeenCalledWith('mongoId');
    });
  });
  describe('numeric', () => {
    it('should validate numeric string', () => {
      stringValidators.numeric('numeric');
      expect(validator.isNumeric).toHaveBeenCalledTimes(1);
      expect(validator.isNumeric).toHaveBeenCalledWith('numeric');
    });
  });
  describe('octal', () => {
    it('should validate octal string', () => {
      stringValidators.octal('octal');
      expect(validator.isOctal).toHaveBeenCalledTimes(1);
      expect(validator.isOctal).toHaveBeenCalledWith('octal');
    });
  });
  describe('uppercase', () => {
    it('should validate uppercase character', () => {
      stringValidators.uppercase('uppercase');
      expect(validator.isUppercase).toHaveBeenCalledTimes(1);
      expect(validator.isUppercase).toHaveBeenCalledWith('uppercase');
    });
  });
  describe('strongPassword', () => {
    it('should validate strong password', () => {
      stringValidators.strongPassword('strongPassword');
      expect(validator.isStrongPassword).toHaveBeenCalledTimes(1);
      expect(validator.isStrongPassword).toHaveBeenCalledWith('strongPassword');
    });
  });
  describe('url', () => {
    it('should validate URL', () => {
      stringValidators.url('url');
      expect(validator.isURL).toHaveBeenCalledTimes(1);
      expect(validator.isURL).toHaveBeenCalledWith('url');
    });
  });
  describe('includes', () => {
    it('should validate string that includes another string', () => {
      const doesInclude = stringValidators.includes('url', 'ur');
      expect(doesInclude).toEqual(true);
    });
    it('should return false if not parameter supplied', () => {
      const doesInclude = stringValidators.includes('url');
      expect(doesInclude).toEqual(false);
    });
  });
  describe('match', () => {
    it('should validate string that match regexp', () => {
      const doesMatch = stringValidators.match('uuu', 'u+');
      expect(doesMatch).toEqual(true);
    });
    it('should return false if not parameter supplied', () => {
      const doesMatch = stringValidators.match('url');
      expect(doesMatch).toEqual(false);
    });
  });
  describe('isOneOf', () => {
    it('should validate string that contains at least one from the given list of strings', () => {
      const isOneOf = stringValidators.isOneOf('uuu', '["uuu", "aaa"]');
      expect(isOneOf).toEqual(true);
    });
  });
  describe('isNoneOf', () => {
    it('should validate string that contains none from the given list of strings', () => {
      const isNoneOf = stringValidators.isNoneOf('bbb', '["uuu", "aaa"]');
      expect(isNoneOf).toEqual(true);
    });
  });
  describe('startsWith', () => {
    it('should validate string that starts with another string', () => {
      const doesStart = stringValidators.startsWith('bbbaa', 'bb');
      expect(doesStart).toEqual(true);
    });
    it('should return false if not parameter supplied', () => {
      const doesStart = stringValidators.startsWith('url');
      expect(doesStart).toEqual(false);
    });
  });
  describe('endsWith', () => {
    it('should validate string that ends with another string', () => {
      const doesEnd = stringValidators.endsWith('aabbb', 'bb');
      expect(doesEnd).toEqual(true);
    });
    it('should return false if not parameter supplied', () => {
      const doesEnd = stringValidators.endsWith('url');
      expect(doesEnd).toEqual(false);
    });
  });
});
