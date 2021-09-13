# validated-types

`validated-types` is a library for Typescript to validate integer, float, string and array values

[![version][version-badge]][package]
[![build][build]][circleci]
[![Downloads][downloads]][package]
[![MIT License][license-badge]][license]

## Installation

```bash
npm install --save validated-types
```

## Usage

You can validate your integer, float and string type variables with `validated-types`.
For example, to create a validated integer which allows values between 1 and 10, you declare:

```ts
function useInt(int: VInt<'1,10'>) {
  // use int here
  console.log(int.value);
}

const int: VInt<'1,10'> = VInt.createOrThrow('1,10', 5);
const possibleInt: VInt<'1,10'> | null = VInt.create('1,10', 12);

useInt(int);
useInt(possibleInt ?? VInt.create('1,10', 10));
```

You can also register a custom validator:
```ts

VInt.registerCustomValidator('isEven', (value) => value % 2 === 0 )

const evenNumber : VInt<'custom:isEven'> = VInt.createOrThrow('custom:isEven', 2);
const possibleEvenNumber: VInt<'custom:isEven'> | null = VInt.create('custom:isEven', 1);
```

To create a validated float which allows positive values only, you declare:

```ts
function useFloat(float: VFloat<'positive'>) {
  // use float here
  console.log(float.value);
}

const float: VFloat<'positive'> = VFloat.createOrThrow('positive', 5.25);
const possibleFloat: VFloat<'positive'> | null = VFloat.create('positive', -5.25);

useFloat(float);
useFloat(possibleFloat ?? VFloat.create('positive', 1));
```

To create a validated string which allows URLs with minimum length of one and maximum length of 1024 characters, you declare:

```ts
function useString(string: VString<'1,1024,url'>) {
  // use string here
  console.log(string.value);
}

const string: VString<'1,1024,url'> = VString.createOrThrow('1,1024,url', 'https://www.mydomain.com');
const possibleString: VFloat<'1,1024,url'> | null = VFloat.create('1,1024,url', 'invalid URL');

useString(string);
useString(possibleString ?? VString.create('1,1024,url', 'https://google.com'));
```

By using validated types in your application's functions' parameters, you can rest assured that only proper values are ever passed to your function.

You should create the validated int/float/string objects (VInt/VFloat/VString) in functions that receive unvalidated input data and then pass those validated values to the other functions in your application.

Your application typically receives unvalidated input data in following scenarios:
* Reading command line arguments
* Reading environment variables
* Reading standard input
* Reading files from file system
* Reading data from socket (Network input)

You can also create validated objects, for example:
```ts
type VPerson = {
  firstName: VString<1,64>;
  lastName: VString<1,64>;
  email: VString<'email'>;
  password: VString<'strongPassword'>;
  age: VInt<0,255>;
  interestPercent: VFloat<'0,100'>;
}
```

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/validated-types/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/validated-types.svg?style=flat-square
[package]: https://www.npmjs.com/package/validated-types
[downloads]: https://img.shields.io/npm/dm/validated-types
[build]: https://img.shields.io/circleci/project/github/pksilen/validated-types/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/validated-types/tree/master
