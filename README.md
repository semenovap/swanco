# swanco

[![CircleCI branch](https://img.shields.io/circleci/project/github/semenovap/swanco/master.svg?label=circleci)](https://circleci.com/gh/semenovap/swanco)
[![npm](https://img.shields.io/npm/v/swanco.svg?label=npm%20package)](https://www.npmjs.com/package/swanco)
[![node](https://img.shields.io/node/v/swanco.svg?label=require%20node)](https://nodejs.org)
[![License](https://img.shields.io/npm/l/swanco.svg)](/LICENSE)

This project is a small tool, which generates an Angular module from a [Swagger 2.0 specification](https://swagger.io/specification).

## Key features
- Generate complete API module, which contains enums, models and services
- Generate services only, as a part of another module
- Generate models only (It can be useful, when you use WebSocket instant XHR requests) 

## Requirements
The generator requires NodeJS `10.12.0` or later and has a few dependencies:
- [commander](https://www.npmjs.com/package/commander)
- [handlebars](https://www.npmjs.com/package/handlebars)
- [lodash.camelcase](https://www.npmjs.com/package/lodash.camelcase)
- [lodash.groupby](https://www.npmjs.com/package/lodash.groupby)
- [lodash.isequal](https://www.npmjs.com/package/lodash.isequal)
- [lodash.kebabcase](https://www.npmjs.com/package/lodash.kebabcase)
- [lodash.orderby](https://www.npmjs.com/package/lodash.orderby)
- [lodash.uniqby](https://www.npmjs.com/package/lodash.uniqby)
- [lodash.upperfirst](https://www.npmjs.com/package/lodash.upperfirst)

## Installation
```bash
npm install --save-dev swanco
```

## Usage

### Options

`--input`, `-i`   URL or local path to the file with specification in JSON format

`--output`, `-o`  Path to write generated content, default: `src/app/api`

`--auth`          Basic authentication credentials, like `user:password`

`--skip-services` Do not create services content

`--skip-module`   Do not create module file

`--hide-report`   Do not show results of files generation

`--version`       Show version number

`--help`          Show help

### Run directly
```bash
node_modules/.bin/swanco -i <path_to_swagger_json> [-o <output_dir>]
```

### Run as npm script
Add script bellow to `package.json` and execute `npm run swanco`
```json
{
  "scripts": {
    "swanco": "swanco -i <path_to_swagger_json> [-o <output_dir>]"
  }
}
```

### Run as a module
Usage as a module, it is an asynchronous function, which returns a promise.
```javascript
// JavaScript
const swanco = require('swanco');

swanco({ input: '<path_to_swagger_json>' }).then(
  () => { /* do something */ },
  err => console.error(err.message)
);
```
```typescript
// TypeScript
import * as swanco from 'swanco';

swanco({ input: '<path_to_swagger_json>' }).then(
  () => { /* do something */ },
  err => console.error(err.message)
);
```

## Example

The commands bellow will generate an API module for [Swagger's PetStore example](http://petstore.swagger.io), assuming [Angular CLI](https://cli.angular.io) is installed globally:

```bash
ng new petstore
cd petstore
npm install --save-dev swanco
node_modules/.bin/swanco -i http://petstore.swagger.io/v2/swagger.json
```

It generates api module bellow:

```
petstore
+-- src
    +-- app
        +-- api
            +-- enums
            |   +-- index.ts 
            |   +-- order-status.enum.ts 
            |   +-- pet-status.enum.ts 
            +-- models
            |   +-- api-response.model.ts
            |   +-- category.model.ts
            |   +-- index.ts
            |   +-- order.model.ts
            |   +-- pet.model.ts
            |   +-- tag.model.ts
            |   +-- user.model.ts
            +-- services
            |   +-- index.ts
            |   +-- pet.service.ts
            |   +-- store.service.ts
            |   +-- user.service.ts
            +-- api.module.ts
            +-- config.service.ts
            +-- index.ts
            +-- variables.ts
```

## Bug report

If you have any problems in use, please, create new issue with example.
