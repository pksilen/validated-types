# validated-types

`validated-types` is a library for Typescript to create types for validated integer, float, string and array values.
It also allows of creating semantic types and declare variables with semantic types. 

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
  - [Validate Strings](#validated-strings)
  - [Validate Arrays](#validated-arrays)
  - [Validate Objects](#validated-objects)
  - [Create Semantic Types/Variables](#create-semantic-types)
  - [Create Semantic Validated Integers](#create-semantic-validated-integers)
  - [Create Semantic Validated Floats](#create-semantic-validated-floats)
  - [Create Semantic Validated Strings](#create-semantic-validated-strings)
- [API Documentation](#api-documentation)
  - [VFloat](#vfloat)
    - [registerCustomValidator](#vfloat-registerCustomValidator)
    - [createOrThrow](#vfloat-createOrThrow)
    - [create](#vfloat-create)
    - [createOrError](#vfloat-createOrError)
    - [value](#vfloat-value)
  - [VInt](#vint)
    - [registerCustomValidator](#vint-registerCustomValidator)
    - [createOrThrow](#vint-createOrThrow)
    - [create](#vint-create)
    - [createOrError](#vint-createOrError)
    - [value](#vint-value)
  - [VString](#vstring)
    - [registerCustomValidator](#vstring-registerCustomValidator)
    - [createOrThrow](#vstring-createOrThrow)
    - [create](#vstring-create)
    - [createOrError](#vstring-createOrError)
    - [value](#vstring-value)
  - [VArray](#varray)
    - [registerCustomValidator](#varray-registerCustomValidator)
    - [createOrThrow](#varray-createOrThrow)
    - [create](#varray-create)
    - [createOrError](#varray-createOrError)
    - [value](#varray-value)
  - [SemType](#SemType)
    - [constructor](#SemType-constructor)
    - [value](#SemType-value)
  - [SemVInt](#SemVInt)
  - [SemVFloat](#SemVFloat)
  - [SemVString](#SemVString)
  - [VSpecOf](#vspecof)
- [Feedback](#feedback)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
* Typescript >= 4.1.0

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

You should create the validated integer, float, string and array objects in functions that receive unvalidated input data and then pass the validated values to the rest of the functions in your application.

Your application typically receives unvalidated input data from external sources in following scenarios:

- Reading command line arguments
- Reading environment variables
- Reading standard input
- Reading file(s) from file system
- Reading data from socket (network input)
- End-user input from user interface

You can also create semantic types and semantically typed variables using `SemType`. Using semantic types, you
can differentiate between multiple types of the same basic type. For example, If a function accepts two boolean arguments, it is possible
that the calling function gives those two arguments in wrong order, but you never notice it, because it does not generate a compilation error.
Using semantic types, you can differentiate between those two boolean types by giving them two different semantic names. 
Semantic name is just any string describing the purpose of type/variable.

The library contains static factory methods in the classes forr creating a new instance of the specific class.
There are different factory methods available. You can choose which factory method to use depending on your
application need. The factory methods are following:

- `tryCreate(...)` creates a validated value object or throws an exception
- `createOrThrow(...)` is same as above, i.e. creates a validated value object or throws an exception
- `create(...)` creates a validated value object or returns `null`. Use this method if you don't need the error reason
- `createOrError(...)` creates a validated value object or returns an error object, always returns a pair (is similar to Golang returning an error)

### <a name="validated-integers"></a> Validate Integers

You can validate your integer, float and string type variables with `validated-types`.
For example, to create a validated integer which allows values between 1 and 10, you declare:

```ts
import { VInt } from 'validated-types';

function useInt(int: VInt<'1,10'>) {
  // use int here
  console.log(int.value);
}

const int = VInt.tryCreate<'1,10'>('1,10', 5);
const maybeInt = VInt.create<'1,10'>('1,10', 12); // Returns null

useInt(int); // prints to console: 5
useInt(maybeInt ?? VInt.tryCreate('1,10', 10)); // prints to console: 10
```

You can also register a custom validator:

```ts
import { VInt } from 'validated-types';

VInt.registerCustomValidator('isEven', (value) => value % 2 === 0);

const evenNumber = VInt.tryCreate<'custom:isEven'>('custom:isEven', 2);
const maybeEvenNumber = VInt<'custom:isEven'>.create('custom:isEven', 1);
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

const float = VFloat.tryCreate<'positive'>('positive', 5.25);
const maybeFloat = VFloat<'positive'>.create('positive', -5.25); // returns null

useFloat(float); // prints to console: 5.25
useFloat(maybeFloat ?? VFloat.tryCreate('positive', 1)); // prints to console: 1
```

### <a name="validated-strings"></a> Validate Strings

To create a validated string which allows URLs with minimum length of one and maximum length of 1024 characters, you declare:

```ts
import { VString } from 'validated-types';

function useUrl(url: VString<'1,1024,url'>) {
  // use URL here
  console.log(url.value);
}

const url = VString.tryCreate<'1,1024,url'>('1,1024,url', 'https://www.mydomain.com');
const maybeUrl = VString<'1,1024,url'>.create('1,1024,url', 'invalid URL'); // Returns null

useUrl(url); // prints to console: https://www.mydomain.com
useUrl(maybeUrl ?? VString.tryCreate('1,1024,url', 'https://google.com')); // prints to console: https://google.com
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

const url: Url = VString.tryCreate(urlVSpec, 'https://server.domain.com:8080/index.html');
const maybeUrl: Url | null = VString.create(urlVSpec, 'invalid URL'); // Returns null

useUrl(url); // prints to console: https://server.domain.com:8080/index.html
useUrl(maybeUrl ?? VString.tryCreate(urlVSpec, 'https://server.domain.com:8080/index.html')); // prints to console: https://server.domain.com:8080/index.html
```

### <a name="validated-arrays"></a> Validate Arrays
To create a validated array of numbers which allows array length to be from 0 to 10 and requires all array elements to be unique, you declare:

```ts
import { VArray } from 'validated-types';

function useArray(array: VArray<'0,10,unique', number>) {
  // use array here
  console.log(array.value);
}

const array = VArray.tryCreate<'0,10,unique', number>('0,10,unique', [1, 2, 3]);
const maybeArray = VArray<'0,10,unique', number>.create('0,10,unique', [1, 2, 2]);

useArray(array); // prints to console: [1, 2, 3]
useArray(maybeArray ?? VArray.tryCreate('0,10,unique', [3, 4, 5])); // prints to console: [3, 4, 5]
```

You can also create an array of validated objects, for example below example validates an array of from 1 to max 10 unique email addresses:
```ts
import { VArray } from 'validated-types';

type EmailAddresses =  VArray<'1,10,unique', VString<'email'>>;
const emailAddressesVSpec: VSpecOf<EmailAddresses> = '1,10,unique';

function sendEmails(emailAddresses: EmailAddresses, subject: string, body: string) {
  console.log(emailAddresses.forEach(emailAddress=> emailAddress.value));
}

const emailAddress = VString.tryCreate<'email'>('email', 'test@example.com');
const emailAddress2 = VString.tryCreate<'email'>('email', 'test2@example.com');
const emailAddresses: EmailAddresses = VArray.tryCreate(emailAddressesVSpec, [emailAddress, emailAddress2]);

sendEmails(emailAddresses, 'subj', 'body'); // prints to console: 'test@example.com' and 'test2@example.com'
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

### <a name="create-semantic-types"></a> Create Semantic Types/Variables

Semantic types and variables let you differentiate between variables of same type. The differentiation is done
by assigning a semantic name to the type. Following example declares two semantic variables of `boolean` type with two different semantic names.

```ts
import { SemType } from 'validated-types';

type IsRecursiveCall = SemType<boolean, 'isRecursiveCall'>
type IsInternalCall = SemType<boolean, 'isInternalCall'>;

function myFunc(isRecursiveCall: IsRecursiveCall, isInternalCall: IsInternalCall) {
  console.log(isRecursiveCall.value);
  console.log(isInternalCall.value);
}

const isRecursiveCall = false;
const isInternalCall = true;

// Only this will succeed
myFunc(new SemType({ isRecursiveCall }), new SemType({ isInternalCall }));

// These will fail during compilation
myFunc(new SemType({ isInternalCall }), new SemType({ isRecursiveCall }));
myFunc(true, true);
myFunc(new SemType('isSomethingElse', true), new SemType('isInternalCall', true));
myFunc(new SemType('isRecursiveCall', false), new SemType('isSomethingElse', true));
myFunc(new SemType('isSomethingElse', true), new SemType('isSomethingElse', true));
```

You can use a validated type as a semantic type also. In the below example, a function takes two semantic parameters
which both have the same base type `VString<'1,64'>`.

```ts
import { SemType, VString } from 'validated-types';

type Name = VString<'1,64'>;
const nameVSpec: VSpecOf<Name> = '1,64';
type FirstName = SemType<Name, 'firstName'>;
type LastName = SemType<Name, 'lastName'>;

function myFunc(firstName: FirstName, lastName: LastName) {
  console.log(firstName.value);
  console.log(lastName.value);
}

const firstName: Name = VString.tryCreate(nameVSpec, 'John');
const lastName: Name = VString.tryCreate(nameVSpec, 'Doe');

type Name2 = VString<'1,65'>
const name2VSpec: VSpecOf<Name> = '1,64';
const firstName2: Name2 = VString.tryCreate(name2VSpec, 'John');
const lastName2: Name2 = VString.tryCreate(name2VSpec, 'Doe');

// Only this will succeed where 'firstName' and 'lastName' are given in correct order with correct validated type
myFunc(new SemType({ firstName }), new SemType({ lastName }));

// These below will fail during compilation
myFunc(new SemType({ lastName }), new SemType({ firstName }));
myFunc(new SemType({ firstName: firstName2 }), new SemType({ lastName: lastName2 }));
myFunc('John', 'Doe');
myFunc(firstName, lastName);
```

### <a name="create-semantic-validated-integers"></a> Create Semantic Validated Integers

```ts
import { SemVInt } from 'validated-types';

type HttpPort = SemVInt<'httpPort', '1,65535'>;
const httpPort: HttpPort = SemVInt.tryCreate('httpPort', '1,65535', 8080);
console.log(httpPort.value); // Prints 8080
```

### <a name="create-semantic-validated-floats"></a> Create Semantic Validated Floats

```ts
import { SemVFloat } from 'validated-types';

type LoanInterest = SemVFloat<'loanInterest', '0,100'>;
const loanInterest: LoanInterest = SemVFloat.tryCreate('loanInterest', '0,100', 4.99);
console.log(loanInterest.value); // Prints 4.99
```

### <a name="create-semantic-validated-strings"></a> Create Semantic Validated Strings

```ts
import { SemVString } from 'validated-types';

type LoginUrl = SemVString<'loginUrl', '1,8192,url'>;
const loginUrl: LoginUrl = SemVString.tryCreate('loginUrl', '1,8192,url', "https://server.com");
console.log(loginUrl.value) // Prints https://server.com
```

## <a name="api-documentation"></a> API documentation

### <a name="vfloat"></a> VFloat

```ts
class VFloat<VSpec extends string> {
  static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void;
  
  static createOrThrow(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | never;
  static tryCreate(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | never;
  static create(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VFloat<VSpec>, null] | [null, Error];
  get value(): number;
}
```

#### <a name="vfloat-registerCustomValidator"></a> VFloat.registerCustomValidator
`static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void`

Registers a custom validator with given name. `validateFunc` receives a float value as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### <a name="vfloat-createOrThrow"></a>VFloat.createOrThrow and VFloat.tryCreate
`static createOrThrow(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | never`
`static tryCreate(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | never`

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

#### <a name="vfloat-create"></a>VFloat.create
`static create(validationSpec: string, value: number, varName?: string): VFloat<VSpec> | null`

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### <a name="vfloat-createOrError"></a>VFloat.createOrError
`static createOrError(validationSpec: string, value: number, varName?: string): [VFloat<VSpec>, null] | [null, Error]`

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VFloat, null]` on success and tuple `[null, Error]` on validation failure.
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [float, err] = VFloat.createOrError<'1,10'>('1,10', 1);
if (err) {
  // handle error here
}
```

#### <a name="vfloat-value"></a>value
`get value(): number`

Returns the valid float value.

### <a name="vint"></a> VInt

```ts
class VInt<VSpec extends string> {
  static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void;
  static createOrThrow(validationSpec: string, value: number, varName?: string): VInt<VSpec> | never;
  static tryCreate(validationSpec: string, value: number, varName?: string): VInt<VSpec> | never;
  static create(validationSpec: string, value: number, varName?: string): VInt<VSpec> | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VInt<VSpec>, null] | [null, Error];
  get value(): number;
}
```

#### <a name="vint-registerCustomValidator"></a>VInt.registerCustomValidator
`static registerCustomValidator(validatorName: string, validateFunc: (value: number) => boolean): void`

Registers a custom validator with given name. `validateFunc` receives a number as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### <a name="vint-createOrThrow"></a>VInt.createOrThrow and VInt.tryCreate
`static createOrThrow(validationSpec: string, value: number, varName?: string): VInt<VSpec> | never`
`static tryCreate(validationSpec: string, value: number, varName?: string): VInt<VSpec> | never`

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

#### <a name="vint-create"></a>VInt.create
`static create(validationSpec: string, value: number, varName?: string): VInt<VSpec> | null`

Same as `VInt.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### <a name="vint-createOrError"></a> VInt.createOrError
`static createOrError(validationSpec: string, value: number, varName?: string): [VInt<VSpec>, null] | [null, Error]`

Same as `VInt.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VInt, null]` on success and tuple `[null, Error]` on validation failure
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [int, err] = VInt.createOrError<'1,10'>('1,10', 1);
if (err) {
  // handle error here
}
```

#### <a name="vint-value"></a> value
`get value(): number`

Returns the valid integer value.

### <a name="vstring"></a> VString

```ts
class VString<VSpec extends string> {
  static registerCustomValidator(validatorName: string | string[], validateFunc: (value: string) => boolean): void;
  static createOrThrow(validationSpec: string | string[], value: number, varName?: string): VString<VSpec> | never;
  static tryCreate(validationSpec: string | string[], value: number, varName?: string): VString<VSpec> | never;
  static create(validationSpec: string | string[], value: number, varName?: string): VString<VSpec> | null;
  static createOrError(
    validationSpec: string,
    value: number,
    varName?: string
  ): [VString<VSpec>, null] | [null, Error];
  get value(): string;
}
```

#### <a name="vstring-registerCustomValidator"></a>VString.registerCustomValidator
`static registerCustomValidator(validatorName: string, validateFunc: (value: string) => boolean): void`

Registers a custom validator with given name. `validateFunc` receives a string value as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### <a name="vstring-createOrThrow"></a>VString.createOrThrow and VString.tryCreate
`static createOrThrow(validationSpec: string, value: number, varName?: string): VString<VSpec> | never`
`static tryCreate(validationSpec: string, value: number, varName?: string): VString<VSpec> | never`

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
- numericRange (requires `parameter`in format: `<minValue>-<maxValue>`, e.g. 1-65535)

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

#### <a name="vstring-create"></a>VString.create
`static create(validationSpec: string, value: number, varName?: string): VString<VSpec> | null`

Same as `VString.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### <a name="vstring-createOrErrorr"></a>VString.createOrError
`static createOrError(validationSpec: string, value: number, varName?: string): [VString<VSpec>, null] | [null, Error]`

Same as `VString.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VString, null]` on success and tuple `[null, Error]` on validation failure
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [str, err] = VString.createOrError<'1,10'>('1,10', 'abc');
if (err) {
  // handle error here
}
```

#### <a name="vstring-value"></a>value
`get value(): string`

Returns the valid string value.

### <a name="varray"></a> VArray
 
`T` is the type of elements in the array.

```ts
class VArray<VSpec extends string, T> {
  static registerCustomValidator(validatorName: string, validateFunc: (value: T[]) => boolean): void;
  static createOrThrow(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | never;
  static tryCreate(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | never;
  static create(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | null;
  static createOrError(
    validationSpec: string,
    value: T[],
    varName?: string
  ): [VArray<VSpec, T>, null] | [null, Error];
  get value(): T[];
}
```

#### <a name="varray-registerCustomValidator"></a> VArray.registerCustomValidator
`static registerCustomValidator(validatorName: string, validateFunc: (value: T[]) => boolean): void`

Registers a custom validator with given name. `validateFunc` receives an array as parameter and returns boolean based on success of validation.
You must register your custom validator before using it in any of the `create` functions.

#### <a name="varray-createOrThrow"></a>VArray.createOrThrow and VArray.tryCreate
`static createOrThrow(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | never`
`static tryCreate(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | never`

Creates a new validated array value object or throws a `ValidationError` exception if supplied value is invalid.
`validationSpec` is a string of following form `'[<minLength>],<maxLength>[,unique] | custom:<custom_validator_name>'`.

`validationSpec` examples:

- '0,100'
- ',100'
- '1,10,unique'
- 'custom:includesSomething'

If `minLength` is missing, 0 is used.
If `varName` is supplied, it is mentioned in possible `ValidationError` thrown.

#### <a name="varray-create"></a>VArray.create
`static create(validationSpec: string, value: T[], varName?: string): VArray<VSpec, T> | null`

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns `null`.
This method is useful if you don't care about the error message, but just want to know if validation succeeded or not.

#### <a name="varray-createOrError"></a>VArray.createOrError
`static createOrError(validationSpec: string, value: T[], varName?: string): [VArray<VSpec, T>, null] | [null, Error]`

Same as `VFloat.createOrThrow`, but instead of throwing on validation failure, it returns a tuple `[VArray, null]` on success and tuple `[null, Error]` on validation failure.
This method is useful for Go language style of programming where you get a 2-tuple return value where the last element in tuple contains the possible error.
For example:

```ts
const [array, err] = VArray.createOrError<'1,10', number>('1,10', [1]);
if (err) {
  // handle error here
}
```

#### <a name="varray-value"></a>value
`get value(): T[]`

Returns the validated array.

### <a name="SemType"></a> SemType
`T` is the type of Semantic variable. 

```ts
type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

class SemType<T, N extends string> {
  constructor(semanticName: SemName<N>, value: T);
  constructor(semType: { [K in SemName<N>]: T });
  get value(): T;
}
```

#### <a name="SemType-constructor"></a> constructor
`constructor(semanticName: SemName<N>, value: T)`  
`constructor(semType: { [K in SemName<N>]: T });`

Creates a new semantic variable with semantic name `semanticName` and with value of type `T`.

#### <a name="SemType-value"></a> value
`get value(): T`
Get the value of semantic variable.

### <a name="SemVInt"></a> SemVInt

```ts
type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

class SemVInt<Name extends string, VSpec extends string> {
  static tryCreate<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): SemVInt<Name, VSpec> | never; // Throws on error

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number
  ): SemVInt<Name, VSpec> | null; // Returns null on error

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: IntValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [SemVInt<Name, VSpec>, null] | [null, Error] // Returns a pair [null, Error] on error
}
```

### <a name="SemVFloat"></a> SemVFloat

```ts
type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

class SemVFloat<Name extends string, VSpec extends string> {
  static tryCreate<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): SemVFloat<Name, VSpec> | never; // Throws on error

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number
  ): SemVFloat<Name, VSpec> | null // Returns null on error

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: FloatValidationSpec<VSpec>,
    value: number,
    varName?: string
  ): [SemVFloat<Name, VSpec>, null] | [null, Error]; // Returns a pair [null, Error] on error
}
```

### <a name="SemVString"></a> SemVString

```ts
type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

class SemVString<Name extends string, VSpec extends string | string[]> {
  static tryCreate<Name extends string, VSpec extends string | string[]>(
    semanticName: SemName<Name>,
    validationSpec: string | string[],
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | never; // Throws on error

  static create<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: string | string[],
    value: string,
    varName?: string
  ): SemVString<Name, VSpec> | null; // Returns null on error

  static createOrError<Name extends string, VSpec extends string>(
    semanticName: SemName<Name>,
    validationSpec: string | string[],
    value: string,
    varName?: string
  ): [SemVString<Name, VSpec>, null] | [null, Error]; // Returns a pair [null, Error] on error
}
```
### <a name="vspecof"></a> VSpecOf

Extracts the validation spec type of the validated type.

For example:

```ts
type Month = VInt<'1,12'>;
const monthVSpec: VSpecOf<Month> = '1,12';
const month: Month = VInt.tryCreate(monthVSpec, 1);

type Percent = VFloat<'0,100'>;
const percentVSpec: VSpecOf<Percent> = '0,100';
const percent: Percent = VFloat.tryCreate(percentVSpec, 25.0);

type Url = VString<['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html']>;
const urlVSpec: VSpecOf<Url> = ['1,1024,lowercase', 'url', 'startsWith,https', 'endsWith,.html'];
const url: Url = VString.tryCreate(urlVSpec, 'https://server.domain.com:8080/index.html');
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
