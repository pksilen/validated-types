# validated-types

`validated-types` is a library for Typescript to validate integer, float, string and array values.

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pksilen_validated-types&metric=alert_status)](https://sonarcloud.io/dashboard?id=pksilen_validated-types)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=pksilen_validated-types&metric=bugs)](https://sonarcloud.io/dashboard?id=pksilen_validated-types)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=pksilen_validated-types&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=pksilen_validated-types)
[![Downloads][downloads]][package]
[![MIT License][license-badge]][license]

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Introduction](#introduction)
  - [Validate Integers](#validated-integers)
  - [Validate Floats](#validated-floats)
  - [Validate Strings](#validated-string)
  - [Validate Arrays](#validated-arrays)
  - [Validate Objects](#validated-objects)
- [API Documentation](#api-documentation)
  - [VFloat](#vfloat)
  - [VInt](#vint)
  - [VString](#vstring)
  - [VArray](#varray)
  - [VSpecOf](#vspecof)
- [Feedback](#feedback)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
* Node >= 12.19
* Typescript >= 4.0.0

## <a name="installation"></a> Installation

```bash
npm install --save validated-types
```

## <a name="usage"></a> Usage

### <a name="introduction"></a> Introduction

Validated-types is a type value validation library for Typescript. You can validate values of integers, floats, strings and arrays.
For numbers, you can for example validate the minimum and maximum value. For strings, you can validate the length and also perform semantic validation
to validate if a string should be, for example, a valid URL, IP address or email address.

By using validated types for the parameters of your application's functions, you can rest assured that only proper values are ever passed to your function.
You don't have to do any validation work inside your functions, just use the value of already validated parameter. The validation of the value is done only once upon the construction of validated objects,
so there is no performance penalty in using the validated values as many times as you need.

You should create the validated int/float/string objects (i.e. VInt/VFloat/VString objects) in functions that receive unvalidated input data and then pass the validated values to the rest of the functions in your application.

Your application typically receives unvalidated input data from external sources in following scenarios:

- Reading command line arguments
- Reading environment variables
- Reading standard input
- Reading file(s) from file system
- Reading data from socket (network input)
- End-user input from user interface

### <a name="validated-integers"></a> Validate Integers

You can validate your integer, float and string type variables with `validated-types`.
For example, to create a validated integer which allows values between 1 and 10, you declare:

```ts
import { VInt } from 'validated-types';

function useInt(int: VInt<'1,10'>) {
  // use int here
  console.log(int.value);
}

const int: VInt<'1,10'> = VInt.createOrThrow('1,10', 5);
const possibleInt: VInt<'1,10'> | null = VInt.create('1,10', 12);

useInt(int); // prints to console: 5
useInt(possibleInt ?? VInt.create('1,10', 10)); // prints to console: 10
```

You can also register a custom validator:

```ts
import { VInt } from 'validated-types';

VInt.registerCustomValidator('isEven', (value) => value % 2 === 0);

const evenNumber: VInt<'custom:isEven'> = VInt.createOrThrow('custom:isEven', 2);
const possibleEvenNumber: VInt<'custom:isEven'> | null = VInt.create('custom:isEven', 1);
```

Custom validator must be registered before it is used by any validated types `create`, `createOrThrow` or `createOrError`method.
This means that you should register your custom validators as early as possible in your application code.
If custom validator is not registered, and it is used, an exception will be thrown.

### <a name="validated-floats"></a> Validate Floats

To create a validated float which allows positive values only, you declare:

```ts
import { VFloat } from 'validated-types';

function useFloat(float: VFloat<'positive'>) {
  // use float here
  console.log(float.value);
}

const float: VFloat<'positive'> = VFloat.createOrThrow('positive', 5.25);
const possibleFloat: VFloat<'positive'> | null = VFloat.create('positive', -5.25);

useFloat(float); // prints to console: 5.25
useFloat(possibleFloat ?? VFloat.create('positive', 1)); // prints to console: 1
```

### <a name="validated-strings"></a> Validate Strings

To create a validated string which allows URLs with minimum length of one and maximum length of 1024 characters, you declare:

```ts
import { VString } from 'validated-types';

function useUrl(url: VString<'1,1024,url'>) {
  // use URL here
  console.log(url.value);
}

const url: VString<'1,1024,url'> = VString.createOrThrow('1,1024,url', 'https://www.mydomain.com');
const possibleUrl: VString<'1,1024,url'> | null = VString.create('1,1024,url', 'invalid URL');

useUrl(url); // prints to console: https://www.mydomain.com
useUrl(possibleUrl ?? VString.create('1,1024,url', 'https://google.com')); // prints to console: https://google.com
```

You can combine up to 5 different string validators together. Multiple validators are given as a tuple which can have 2-5 elements. The first element of the tuple should validate the length of the string, if needed. Rest of the elements in tuple should not validate the length of string anymore.
Below example contains 4 validators that validate following string:

- is at least 1 characters long
- is at most 1024 characters long
- is lower case string
- is valid URL
- URL starts with _https_
- URL ends with _.html_

```ts
import { SpecOf, VString } from 'validated-types';

type Url = VString<['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html']>;
const urlVSpec: VSpecOf<Url> = ['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html'];

function useUrl(url: Url) {
  // use URL here
  console.log(url.value);
}

const url: Url = VString.createOrThrow(urlSpec, 'https://server.domain.com:8080/index.html');
const possibleUrl: Url | null = VString.create(urlVSpec, 'invalid URL');

useUrl(url); // prints to console: https://server.domain.com:8080/index.html
useUrl(possibleUrl ?? VString.create(urlVSpec, 'https://server.domain.com:8080/index.html')); // prints to console: https://server.domain.com:8080/index.html
```

### <a name="validated-arrays"></a> Validate Arrays
To create a validated array of numbers which allows array length to be from 0 to 10 and requires all array elements to be unique, you declare:

```ts
import { VArray } from 'validated-types';

function useArray(array: VArray<'0,10,unique', number>) {
  // use array here
  console.log(array.value);
}

const array: VArray<'0,10,unique', number> = VArray.createOrThrow('0,10,unique', [1, 2, 3]);
const possibleArray: VArray<'0,10,unique', number> | null = VArray.create('0,10,unique', [1, 2, 2]);

useArray(array); // prints to console: [1, 2, 3]
useArray(possibleArray ?? VArray.create('0,10,unique', [3, 4, 5])); // prints to console: [3, 4, 5]
```

You can also create an array of validated objects, for example below example validates an array of from 1 to max 10 unique email addresses:
```ts
import { VArray } from 'validated-types';

function useArray(array: VArray<'1,10,unique', VString<'email'>>) {
  // use array here
  console.log(array.forEach(elem => elem.value));
}

const email: VString<'email'> = VString.createOrThrow('email', 'test@example.com');
const email2: VString<'email'> = VString.createOrThrow('email', 'test2@example.com');
const array: VArray<'1,10,unique', VString<'email'>> = VArray.createOrThrow('1,10,unique', [email, email2]);

useArray(array); // prints to console: 'test@example.com' and 'test2@example.com'
```

### <a name="validated-objects"></a> Validate Objects

You can also create validated objects, for example:

```ts
type Person = {
  firstName: VString<1, 64>;
  lastName: VString<1, 64>;
  nickNames: VString<1, 64>[];
  email: VString<'email'>;
  password: VString<'8,1024,strongPassword'>;
  age: VInt<0, 255>;
  interestPercent: VFloat<'0,100'>;
};
```

You can assign type aliases to your validated types:

types.ts

```ts
import { VFloat, VInt, VString } from 'validated-types';

export type Name = VString<1, 64>;
export type Email = VString<'email'>;
export type Password = VString<'8,1024,strongPassword'>;
export type Age = VInt<0, 255>;
export type Percent = VFloat<'0,100'>;
```

person.ts

```ts
import { Age, Email, Name, Password, Percent } from 'types';

type Person = {
  firstName: Name;
  lastName: Name;
  nickNames: Name[];
  email: Email;
  password: Password;
  age: Age;
  interestPercent: Percent;
};
```

## <a name="api-documentation"></a> API documentation

### <a name="vfloat"></a> VFloat

```ts
class VFloat {
  static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void;
  static createOrThrow(validationSpec: string, value: number, varName?: string): VFloat | never;
  static create(validationSpec: string, value: number, varName?: string): VFloat | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VFloat<VSpec>, null] | [null, Error];
  get value(): number;
}
```

#### VFloat.registerCustomValidator()

Registers a custom validator with given name. `validateFunc` receives a float value as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### VFloat.createOrThrow()

Creates a new validated float value object or throws a `ValidationError` exception if supplied value is invalid.
`validationSpec` is a string of following form `'[<minValue>],[<maxValue>] | negative | positive | custom:<custom_validator_name>'`.

`validationSpec` examples:

- '0,100'
- '100,'
- ',0'
- 'positive'
- 'negative'
- 'custom:isUsShoeSize'

If `minValue` is missing, `Number.MIN_VALUE` is used.
If `maxValue` is missing, `Number.MAX_VALUE` is used.
If `varName` is supplied, it is mentioned in possible `ValidationError` thrown.

#### VFloat.create()

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### VFloat.createOrError()

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VFloat, null]` on success and tuple `[null, Error]` on validation failure.
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [float, err] = VFloat.createOrError<'1,10'>('1,10', 1);
if (err) {
  // handle error here
}
```

#### value

Returns the valid float value.

### <a name="vint"></a> VInt

```ts
class VInt {
  static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void;
  static createOrThrow(validationSpec: string, value: number, varName?: string): VInt | never;
  static create(validationSpec: string, value: number, varName?: string): VInt | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VInt<VSpec>, null] | [null, Error];
  get value(): number;
}
```

#### VInt.registerCustomValidator()

Registers a custom validator with given name. `validateFunc` receives a number as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### VInt.createOrThrow()

Creates a new validated integer value object or throws a `ValidationError` exception if supplied value is invalid.
`validationSpec` is a string of following form `'[<minValue>],[<maxValue>][,<divisibleByValue>] | negative | positive | custom:<custom_validator_name>'`.

`validationSpec` examples:

- '0,100'
- '0,100,2'
- '100,'
- ',0'
- ','
- 'positive'
- 'negative'
- 'custom:isEven'

If `minValue` is missing, `Number.MIN_SAFE_INTEGER` is used.
If `maxValue` is missing, `Number.MAX_SAFE_INTEGER` is used.
If `varName` is supplied, it is mentioned in possible `ValidationError` thrown.

#### VInt.create()

Same as `VInt.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### VInt.createOrError()

Same as `VInt.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VInt, null]` on success and tuple `[null, Error]` on validation failure
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [int, err] = VInt.createOrError<'1,10'>('1,10', 1);
if (err) {
  // handle error here
}
```

#### value

Returns the valid integer value.

### <a name="vstring"></a> VString

```ts
class VString {
  static registerCustomValidator(validatorName: string, validateFunc: (value: string) => boolean): void;
  static createOrThrow(validationSpec: string, value: number, varName?: string): VString | never;
  static create(validationSpec: string, value: number, varName?: string): VString | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VString<VSpec>, null] | [null, Error];
  get value(): string;
}
```

#### VString.registerCustomValidator()

Registers a custom validator with given name. `validateFunc` receives a string value as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### VString.createOrThrow()

Creates a new validated integer value object or throws a `ValidationError` exception if supplied value is invalid.
`validationSpec` is a string of following form `'[<minLength>],<maxLength>[,<unknown_length_validator_name>[,<parameter>]] | <known_length_validator_name> | custom:<custom_validator_name>'`.

Possible value for `<unknown_length_validator_name>`:

- alpha
- alphanumeric
- ascii
- base32
- base58
- base64
- dataUri
- decimal
- fqdn
- md4
- md5
- sha1
- sha256
- sha384
- sha512
- crc32
- crc32b
- hex
- ipv4Range
- ipv6Range
- json
- lowercase
- magnetUri
- mongoId
- numeric
- octal
- uppercase
- strongPassword
- url
- includes (requires `parameter`)
- match (requires a RegExp string `parameter`)
- isOneOf (requires JSON string array `parameter`)
- isNoneOf (requires JSON string array `parameter`)
- startsWith (requires `parameter`)
- endsWith (requires `parameter`)

Possible values for `<known_length_validator_name>`:

- boolean
- bic
- btcAddress
- creditCard
- ean
- email
- ethereumAddress
- hsl
- hexColor
- isin
- iban
- ipv4
- ipv6
- iso31661Alpha2
- iso31661Alpha3
- iso8601
- isrc
- issn
- jwt
- latLong
- macAddress
- mimeType
- port
- rgbColor
- semVer
- uuid
- postalCode
- creditCardExpiration
- cvc
- mobileNumber

More information about validators can be found in [validator.js documentation](https://github.com/validatorjs/validator.js/)
If you need a new built-in validator, please [open a new issue](https://github.com/pksilen/validated-types/issues) about that.

`validationSpec` examples:

- '0,100'
- ',100'
- '1,1024,url'
- '1,1024,startsWith,https'
- 'email'
- 'custom:isSupplierName'

If `minLength` is missing, 0 is used.
If `varName` is supplied, it is mentioned in possible `ValidationError` thrown.

#### VString.create()

Same as `VString.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### VString.createOrError()

Same as `VString.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VString, null]` on success and tuple `[null, Error]` on validation failure
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [str, err] = VString.createOrError<'1,10'>('1,10', 'abc');
if (err) {
  // handle error here
}
```

#### value

Returns the valid string value.

### <a name="varray"></a> VArray

```ts
class VArray<VSpec extends string, T> {
  static registerCustomValidator(validatorName: string, validateFunc: (value: T[]) => boolean): void;
  static createOrThrow(validationSpec: string, value: T[], varName?: string): VArray | never;
  static create(validationSpec: string, value: T[], varName?: string): VArray | null;
  static createOrError(
    validationSpec: string,
    value: T[],
    varName?: string
  ): [VArray<VSpec>, null] | [null, Error];
  get value(): T[];
}
```

`T` is the type of elements in the array.

#### VArray.registerCustomValidator()

Registers a custom validator with given name. `validateFunc` receives an array as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### VArray.createOrThrow()

Creates a new validated array value object or throws a `ValidationError` exception if supplied value is invalid.
`validationSpec` is a string of following form `'[<minLength>],<maxLength>[,unique] | custom:<custom_validator_name>'`.

`validationSpec` examples:

- '0,100'
- ',100'
- '1,10,unique'
- 'custom:includesSomething'

If `minLength` is missing, 0 is used.
If `varName` is supplied, it is mentioned in possible `ValidationError` thrown.

#### VArray.create()

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### VArray.createOrError()

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VArray, null]` on success and tuple `[null, Error]` on validation failure.
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [array err] = VArray.createOrError<'1,10', number>('1,10', [1]);
if (err) {
  // handle error here
}
```

#### value

Returns the validated array.

### <a name="vspecof"></a> VSpecOf

Extracts the validation spec type of the validated type.

For example:

```ts
type Month = VInt<'1,12'>);
const monthVSpec: VSpecOf<Month> = '1,12';
const month: Month = VInt.createOrThrow(monthVSpec, 1);

type Percent = VFloat<'0,100'>;
const percentVSpec: VSpecOf<Percent> = '0,100';
const percent: Percent = VFloat.createOrThrow(percentVSpec, 25.0);

type Url = VString<['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html']>;
const urlVSpec: VSpecOf<Url> = ['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html'];
const url: Url = VString.createOrThrow(urlVSpec, 'https://server.domain.com:8080/index.html');
```

## <a name="feedback"></a> Feedback

If you want to report a bug, please [create a new issue](https://github.com/pksilen/validated-types/issues) about that.

If you want to request a new feature, for example, a new type of validator for string, please [create a new issue](https://github.com/pksilen/validated-types/issues) about that.

## <a name="license"></a> License

[MIT](https://github.com/pksilen/validated-types/blob/main/LICENSE)

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/validated-types/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/validated-types.svg?style=flat-square
[package]: https://www.npmjs.com/package/validated-types
[downloads]: https://img.shields.io/npm/dm/validated-types
[build]: https://img.shields.io/circleci/project/github/pksilen/validated-types/main.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/validated-types/tree/main
[coverage]: https://img.shields.io/codecov/c/github/pksilen/validated-types/main.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/validated-types
