# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.5](https://github.com/semenovap/swanco/compare/v4.0.4...v4.0.5) (2020-04-11)

### [4.0.4](https://github.com/semenovap/swanco/compare/v4.0.3...v4.0.4) (2020-04-11)


### Bug Fixes

* **bin:** disable linter for index pages ([d023150](https://github.com/semenovap/swanco/commit/d023150ca044f575ddf8536754a3358a487d607f))
* **model:** remove extra new line from template ([575d19f](https://github.com/semenovap/swanco/commit/575d19fffa64524f3730a386e04270d3189eb0f7))
* **service:** remove extra white spaces from template ([e631cda](https://github.com/semenovap/swanco/commit/e631cda040d872a17c0fb484a05141f063f82ad4))

### [4.0.3](https://github.com/semenovap/swanco/compare/v4.0.2...v4.0.3) (2020-03-18)


### Bug Fixes

* **service:** add values for content-type and accept headers ([399b480](https://github.com/semenovap/swanco/commit/399b480729920138837c2fb870a973d38a858fe8))
* **service:** remove deprecated property ([c1a5d77](https://github.com/semenovap/swanco/commit/c1a5d774d3160381bb6bf7ceace10aea2c15ffc8))
* **service:** typisation error of operation security ([34291eb](https://github.com/semenovap/swanco/commit/34291ebb71694e5b5ec77ed8e03fe7cc3ee40616))

### [4.0.2](https://github.com/semenovap/swanco/compare/v4.0.1...v4.0.2) (2020-03-03)


### Bug Fixes

* **service:** check type of form data parameter ([e315f03](https://github.com/semenovap/swanco/commit/e315f03f26cf08acd74a9efd5a1c4e7db7ce1f5f))

### [4.0.1](https://github.com/semenovap/swanco/compare/v4.0.0...v4.0.1) (2020-02-27)


### Bug Fixes

* **service:** add generics to services methods with response type text, blob and arraybuffer ([0192f08](https://github.com/semenovap/swanco/commit/0192f08fa4922f7e1aebd816200549f8365762d3))
* **service:** void response type was generated instead basic type ([7eaffd1](https://github.com/semenovap/swanco/commit/7eaffd14af3c913b7d5591c413032821eadc60b3))

## [4.0.0](https://github.com/semenovap/swanco/compare/v3.0.1...v4.0.0) (2020-02-26)


### ⚠ BREAKING CHANGES

* **service:** You should import generated API module to the App module

### Features

* **bin:** call directly or as a module ([89c4697](https://github.com/semenovap/swanco/commit/89c4697a81fadceb35e44d51f2fe9e3487149b3c))
* **config:** exclude API config service from the application-level injection ([78c0836](https://github.com/semenovap/swanco/commit/78c0836ccef1042ecf1704f7e78b61f54248f287))
* **service:** exclude API services from the application-level injection ([96d0130](https://github.com/semenovap/swanco/commit/96d0130c9a238ecbb082227220a2c20a983ae6cb))


### Bug Fixes

* **service:** set type of authorization token ([cc0e973](https://github.com/semenovap/swanco/commit/cc0e973e5fb032e4979f131e8390b994b038879d))
* **service:** support all response types: json, text, blob and arraybuffer ([20fb861](https://github.com/semenovap/swanco/commit/20fb861b16dbce8dd13651c6c875f0eebced7693))

### [3.0.1](https://github.com/semenovap/swanco/compare/v3.0.0...v3.0.1) (2020-01-03)


### Bug Fixes

* **enum:** override "is array" property for different cases ([ca48de6](https://github.com/semenovap/swanco/commit/ca48de669f2bd2ea8d3a9d27912b99e18f35330f))
* **model:** clear exists models before fetch ([77176c9](https://github.com/semenovap/swanco/commit/77176c9cf1290051a8854d85986c678a88fd5e92))
* **service:** add operation to default service if there are no tags ([e118ff9](https://github.com/semenovap/swanco/commit/e118ff98bb4c3049ec7c28893246496f81234771))
* **service:** check exist security definition ([4e16383](https://github.com/semenovap/swanco/commit/4e16383606951261269a3be46381f17e70bc927f))
* **service:** enum as response from server ([e0b22fe](https://github.com/semenovap/swanco/commit/e0b22fe7b9e40f543a9c2723d33e526b67860343))
* **service:** use default response if there is no response with code 200 ([22541bc](https://github.com/semenovap/swanco/commit/22541bcc269d49de6c7923b82f89ec40c24c1122))
* **type:** undefined object ([93ce65b](https://github.com/semenovap/swanco/commit/93ce65bb3e3b59ad3fb0d12929daf07c1e07eb40))
* **util:** recursive file generation ([581b318](https://github.com/semenovap/swanco/commit/581b318d07c02f1610fa5c767e03b460f5c8f81b))

## [3.0.0](https://github.com/semenovap/swanco/compare/v2.2.0...v3.0.0) (2019-11-20)


### ⚠ BREAKING CHANGES

* **model:** Some generics will be broken, because they were based
on object without additional properties. Properties, which provide
additional information about type are converted to HashMap objects.

### Bug Fixes

* **doc:** remove symbol ([ed23003](https://github.com/semenovap/swanco/commit/ed23003))
* **type:** rollback typisation error of binary files ([1465826](https://github.com/semenovap/swanco/commit/1465826))


### Features

* **model:** strict typing of maps fields ([170e4c8](https://github.com/semenovap/swanco/commit/170e4c8))
* **service:** add security, which was defined globally ([cd2decb](https://github.com/semenovap/swanco/commit/cd2decb))

## [2.2.0](https://github.com/semenovap/swanco/compare/v2.1.1...v2.2.0) (2019-09-29)


### Bug Fixes

* **service:** add null value for empty body of POST and PUT requests ([e751ff8](https://github.com/semenovap/swanco/commit/e751ff8))


### Features

* **service:** add string enum as response of http request ([7b3393e](https://github.com/semenovap/swanco/commit/7b3393e))

### [2.1.1](https://github.com/semenovap/swanco/compare/v2.1.0...v2.1.1) (2019-08-01)


### Bug Fixes

* **bin:** hide stack trace errors ([93932a1](https://github.com/semenovap/swanco/commit/93932a1))
* **doc:** add variables file into the example of the readme file ([8a3b4e6](https://github.com/semenovap/swanco/commit/8a3b4e6))
* **service:** support Angular 8.2 and TypeScript 3.5 ([cb66aca](https://github.com/semenovap/swanco/commit/cb66aca))

## [2.1.0](https://github.com/semenovap/swanco/compare/v2.0.1...v2.1.0) (2019-07-31)


### Bug Fixes

* **enum:** add underscore to enum key which starts from number ([79b09ac](https://github.com/semenovap/swanco/commit/79b09ac))
* **type:** typisation error of binary files ([e92fa8b](https://github.com/semenovap/swanco/commit/e92fa8b))


### Features

* **bin:** add optional argument of files generation report ([e4f1f27](https://github.com/semenovap/swanco/commit/e4f1f27))
* **config:** add injectable argument Base URL to config service ([0add3e4](https://github.com/semenovap/swanco/commit/0add3e4))
* **config:** add injectable argument to use withCredentials option ([a73f382](https://github.com/semenovap/swanco/commit/a73f382))

### [2.0.1](https://github.com/semenovap/swanco/compare/v2.0.0...v2.0.1) (2019-06-30)


### Bug Fixes

* wrong basic type for arrays ([e44f6a7](https://github.com/semenovap/swanco/commit/e44f6a7))


### Build System

* update dependencies ([6625dae](https://github.com/semenovap/swanco/commit/6625dae))


### Tests

* add undefined properties ([c3c44f9](https://github.com/semenovap/swanco/commit/c3c44f9))



## [2.0.0](https://github.com/semenovap/swanco/compare/v1.3.3...v2.0.0) (2019-06-08)


### Bug Fixes

* remove prefix "Bearer" from generated services ([d353177](https://github.com/semenovap/swanco/commit/d353177))


### ⚠ BREAKING CHANGES

* You should provide required prefix (like Bearer)
together with your access key into ConfigService.



### [1.3.3](https://github.com/semenovap/swanco/compare/v1.3.2...v1.3.3) (2019-06-05)


### Build System

* Update vulnerable dependencies ([2604f19](https://github.com/semenovap/swanco/commit/2604f19))



## [1.3.2](https://github.com/semenovap/swanco/compare/v1.3.1...v1.3.2) (2019-04-11)


### Bug Fixes

* **doc:** Description for private function ([783bf88](https://github.com/semenovap/swanco/commit/783bf88))
* Wrong request headers for FormData ([8ae1e55](https://github.com/semenovap/swanco/commit/8ae1e55))



## [1.3.1](https://github.com/semenovap/swanco/compare/v1.3.0...v1.3.1) (2019-04-08)


### Bug Fixes

* Generics' duplicates in services ([5d9fdd7](https://github.com/semenovap/swanco/commit/5d9fdd7))
* Hierarchical dependencies for generics with unlimited deep ([8470906](https://github.com/semenovap/swanco/commit/8470906))
* Remove comma after last value in enum ([da274d1](https://github.com/semenovap/swanco/commit/da274d1))



# [1.3.0](https://github.com/semenovap/swanco/compare/v1.2.0...v1.3.0) (2019-04-07)


### Bug Fixes

* Hierarchical dependencies for generics ([0761c1a](https://github.com/semenovap/swanco/commit/0761c1a))


### Features

* Support allOf as extends for models ([41e357f](https://github.com/semenovap/swanco/commit/41e357f))
* **doc:** Support titles and descriptions for models ([3865059](https://github.com/semenovap/swanco/commit/3865059))



# [1.2.0](https://github.com/semenovap/swanco/compare/v1.1.1...v1.2.0) (2019-04-05)


### Bug Fixes

* Array within a formData ([9fb5560](https://github.com/semenovap/swanco/commit/9fb5560))


### Features

* Generics for data type object ([80837d9](https://github.com/semenovap/swanco/commit/80837d9))



## [1.1.1](https://github.com/semenovap/swanco/compare/v1.1.0...v1.1.1) (2019-03-27)


### Bug Fixes

* **doc:** Service method name as default summary about method ([61361db](https://github.com/semenovap/swanco/commit/61361db))
* Array within a query string ([6686059](https://github.com/semenovap/swanco/commit/6686059))
* Model's property as array ([711aa87](https://github.com/semenovap/swanco/commit/711aa87))
* Service method argument as Enum ([16b320f](https://github.com/semenovap/swanco/commit/16b320f))
* Services sort by name ([2f6535a](https://github.com/semenovap/swanco/commit/2f6535a))



# [1.1.0](https://github.com/semenovap/swanco/compare/v1.0.4...v1.1.0) (2019-03-23)


### Bug Fixes

* **doc:** Service method name as default description for method ([6921330](https://github.com/semenovap/swanco/commit/6921330))


### Features

* New argument - basic authentication for remote swagger API ([a102a38](https://github.com/semenovap/swanco/commit/a102a38))



## [1.0.4](https://github.com/semenovap/swanco/compare/v1.0.3...v1.0.4) (2019-03-22)


### Bug Fixes

* Convert argument type to pascal notation ([207fbd7](https://github.com/semenovap/swanco/commit/207fbd7))
* Group by tags ([86e06a3](https://github.com/semenovap/swanco/commit/86e06a3))
* Remove readonly attribute for base url ([bde936d](https://github.com/semenovap/swanco/commit/bde936d))
* Set default protocol ([879ce89](https://github.com/semenovap/swanco/commit/879ce89))
* Skip empty directories ([c105047](https://github.com/semenovap/swanco/commit/c105047))
* Wrong field type, which has multiple enum values ([95121c8](https://github.com/semenovap/swanco/commit/95121c8))



## [1.0.3](https://github.com/semenovap/swanco/compare/v1.0.2...v1.0.3) (2019-03-18)


### Bug Fixes

* Wrong field type, which has multiple enum values ([ccd455f](https://github.com/semenovap/swanco/commit/ccd455f))



## [1.0.2](https://github.com/semenovap/swanco/compare/v1.0.1...v1.0.2) (2019-03-08)


### Bug Fixes

* Wrong response types for arrays ([6754c27](https://github.com/semenovap/swanco/commit/6754c27))



## [1.0.1](https://github.com/semenovap/swanco/compare/v1.0.0...v1.0.1) (2019-03-08)


### Bug Fixes

* Include templates to the package ([0cfec67](https://github.com/semenovap/swanco/commit/0cfec67))



# 1.0.0 (2019-03-08)
