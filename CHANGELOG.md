# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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


### BREAKING CHANGES

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
