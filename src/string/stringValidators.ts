// noinspection MagicNumberJS

import validator from 'validator';
import { KnownLengthStringValidatorNames } from './KnownLengthStringValidatorNames';
import { UnknownLengthStringValidatorNames } from './UnknownLengthStringValidatorNames';
import { ParameterizedStringValidatorNames } from './ParameterizedStringValidatorNames';
import parseJSONArrayParameter from './parseJSONArrayParameter';

export const stringValidators: {
  [ValidatorName in
    | KnownLengthStringValidatorNames
    | UnknownLengthStringValidatorNames
    | ParameterizedStringValidatorNames]: (value: string, parameter?: string) => boolean;
} = {
  boolean: (value) => value.length <= 5 && validator.isBoolean(value),
  bic: (value) => value.length <= 11 && validator.isBIC(value),
  btcAddress: (value) => value.length <= 35 && validator.isBtcAddress(value),
  creditCard: (value) => value.length <= 19 && validator.isCreditCard(value),
  ean: (value) => value.length <= 13 && validator.isEAN(value),
  email: (value) => value.length <= 320 && validator.isEmail(value),
  ethereumAddress: (value) => value.length <= 42 && validator.isEthereumAddress(value),
  hsl: (value) => value.length <= 64 && validator.isHSL(value),
  hexColor: (value) => value.length <= 7 && validator.isHexColor(value),
  isin: (value) => value.length <= 12 && validator.isISIN(value),
  iban: (value) => value.length <= 42 && validator.isIBAN(value),
  ipv4: (value) => value.length <= 15 && validator.isIP(value, 4),
  ipv6: (value) => value.length <= 39 && validator.isIP(value, 6),
  iso31661Alpha2: (value) => value.length <= 2 && validator.isISO31661Alpha2(value),
  iso31661Alpha3: (value) => value.length <= 3 && validator.isISO31661Alpha3(value),
  iso8601: (value) => value.length <= 64 && validator.isISO8601(value),
  isrc: (value) => value.length <= 15 && validator.isISRC(value),
  issn: (value) => value.length <= 9 && validator.isISSN(value),
  jwt: (value) => value.length <= 8192 && validator.isJWT(value),
  latLong: (value) => value.length <= 64 && validator.isLatLong(value),
  macAddress: (value) => value.length <= 17 && validator.isMACAddress(value),
  mimeType: (value) => value.length <= 64 && validator.isMimeType(value),
  port: (value) => value.length <= 5 && validator.isPort(value),
  rgbColor: (value) => value.length <= 32 && validator.isRgbColor(value),
  semVer: (value) => value.length <= 32 && validator.isSemVer(value),
  uuid: (value) => value.length <= 36 && validator.isUUID(value),
  postalCode: (value) => value.length <= 32 && validator.isPostalCode(value, 'any'),
  creditCardExpiration: (value) =>
    value.length <= 7 && !!value.match(/^(0[1-9]|1[0-2])\/([0-9]{2}|[2-9][0-9]{3})$/),
  cvc: (value) => value.length <= 4 && !!value.match(/^[0-9]{3,4}$/),
  mobileNumber: (value) => value.length <= 32 && validator.isMobilePhone(value, 'any'),
  alpha: (value) => validator.isAlpha(value),
  alphanumeric: (value) => validator.isAlphanumeric(value),
  ascii: (value) => validator.isAscii(value),
  base32: (value) => validator.isBase32(value),
  base58: (value) => validator.isBase58(value),
  base64: (value) => validator.isBase64(value),
  dataUri: (value) => validator.isDataURI(value),
  decimal: (value) => validator.isDecimal(value),
  fqdn: (value) => validator.isFQDN(value),
  md4: (value) => validator.isHash(value, 'md4'),
  md5: (value) => validator.isHash(value, 'md5'),
  sha1: (value) => validator.isHash(value, 'sha1'),
  sha256: (value) => validator.isHash(value, 'sha256'),
  sha348: (value) => validator.isHash(value, 'sha384'),
  sha512: (value) => validator.isHash(value, 'sha512'),
  crc32: (value) => validator.isHash(value, 'crc32'),
  crc32b: (value) => validator.isHash(value, 'crc32b'),
  hex: (value) => validator.isHexadecimal(value),
  ipv4Range: (value) => validator.isIPRange(value, 4),
  ipv6Range: (value) => validator.isIPRange(value, 6),
  json: (value) => validator.isJSON(value),
  lowercase: (value) => validator.isLowercase(value),
  magnetUri: (value) => validator.isMagnetURI(value),
  mongoId: (value) => validator.isMongoId(value),
  numeric: (value) => validator.isNumeric(value),
  octal: (value) => validator.isOctal(value),
  uppercase: (value) => validator.isUppercase(value),
  strongPassword: (value) => validator.isStrongPassword(value),
  url: (value) => validator.isURL(value),
  includes: (value, parameter) => (parameter ? value.includes(parameter) : false),
  match: (value, parameter) => (parameter ? !!value.match(parameter) : false),
  isOneOf: (value, parameter) => {
    return parseJSONArrayParameter(parameter).includes(value);
  },
  isNoneOf: (value, parameter) => !parseJSONArrayParameter(parameter).includes(value),
  startsWith: (value, parameter) => (parameter ? value.startsWith(parameter) : false),
  endsWith: (value, parameter) => (parameter ? value.endsWith(parameter) : false),
};
