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
import { VInt } from 'validated-types';

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
import { VInt } from 'validated-types';

VInt.registerCustomValidator('isEven', (value) => value % 2 === 0 )

const evenNumber : VInt<'custom:isEven'> = VInt.createOrThrow('custom:isEven', 2);
const possibleEvenNumber: VInt<'custom:isEven'> | null = VInt.create('custom:isEven', 1);
```

Custom validator must be registered before it is used by any validated types `create` or `createOrThrow` method.
This means that you should register your custom validators as early as possible in your application code.
If custom validator is not registered, and it is used, an exception will be thrown.

To create a validated float which allows positive values only, you declare:

```ts
import { VFloat } from 'validated-types';

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
import { VString } from 'validated-types';

function useUrl(url: VString<'1,1024,url'>) {
  // use URL here
  console.log(url.value);
}

const string: VString<'1,1024,url'> = VString.createOrThrow('1,1024,url', 'https://www.mydomain.com');
const possibleString: VString<'1,1024,url'> | null = VString.create('1,1024,url', 'invalid URL');

useUrl(url);
useUrl(possibleUrl ?? VString.create('1,1024,url', 'https://google.com'));
```

You can combine up to 5 different string validators together, for example:
```ts
import { SpecOf, VInt } from 'validated-types';

type Url = ['0,255,lowercase', 'url', 'startsWith,https', 'endsWith,.html'] 
const urlSpec: SpecOf<Url> = ['0,255,lowercase', 'url', 'startsWith,https', 'endsWith,.html'];

function useUrl(url: Url) {
  // use URL here
  console.log(url.value);
}

const url: Url = VString.createOrThrow(urlSpec, 'https://server.domain.com:8080/index.html');
const possibleString: Url | null = VString.create(urlSpec, 'invalid URL');

useUrl(url);
useUrl(possibleUrl ?? VString.create(urlSpec, 'https://server.domain.com:8080/index.html'));
```


By using validated types for the parameters of  your application's functions', you can rest assured that only proper values are ever passed to your function.
You don't have to do any validation work inside your functions, just use the value of already validated parameter. The validation of the value is done only once upon the construction of validated objects,
so there is no performance penalty in using the validated values as many times as you need.

You should create the validated int/float/string objects (VInt/VFloat/VString) in functions that receive unvalidated input data and then pass the validated values to the rest of the functions in your application.

Your application typically receives unvalidated input data in following scenarios:
* Reading command line arguments
* Reading environment variables
* Reading standard input
* Reading files from file system
* Reading data from socket (Network input)
* End-user input from user interface 

You can also create validated objects, for example:
```ts
type Person = {
  firstName: VString<1,64>;
  lastName: VString<1,64>;
  nickNames: VString<1,64>[];
  email: VString<'email'>;
  password: VString<'strongPassword'>;
  age: VInt<0,255>;
  interestPercent: VFloat<'0,100'>;
}
```

```ts
// Defined in types.ts
type Name = VString<1,64>;
type Email = VString<'email'>;
type Password = VString<'8,1024,strongPassword'>
type Age = VInt<0,255>;
type Percent = VFloat<'0,100'>;

// Defined in Person.ts
type Person = {
  firstName: Name;
  lastName: Name;
  nickNames: Name[];
  email: Email;
  password: Password;
  age: Age;
  interestPercent: Percent;
}
```

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/validated-types/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/validated-types.svg?style=flat-square
[package]: https://www.npmjs.com/package/validated-types
[downloads]: https://img.shields.io/npm/dm/validated-types
[build]: https://img.shields.io/circleci/project/github/pksilen/validated-types/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/validated-types/tree/master
