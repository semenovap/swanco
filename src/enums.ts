/**
 * @module Enum
 */

import isEqual = require('lodash.isequal');
import kebabCase = require('lodash.kebabcase');
import {BaseSchema} from 'swagger-schema-official';
import {
  File,
  pascalCase
} from './utils';

export interface Enum extends File {
  values: EnumValues[];
  description: string;
}

interface EnumValues {
  key: string;
  value: string;
}

/**
 * Enums collection
 *
 * @private
 */
const enums: Enum[] = [];

/**
 * Fetch all enums
 *
 * @public
 *
 * @return {Enum[]}
 */
export function fetchEnums(): Enum[] {
  return enums;
}

/**
 * Add enum to the enums' collection. If there is no enum with equal values, it will be added.
 *
 * @public
 *
 * @param {String} prefix - Enum prefix
 * @param {String} name - Enum name
 * @param {BaseSchema} schema - Swagger base schema
 *
 * @return {(Enum | undefined)}
 */
export function addEnum(prefix: string, name: string, schema: BaseSchema): Enum | undefined {
  let arr = schema.enum;

  if (!arr && schema.items && !Array.isArray(schema.items)) {
    arr = schema.items.enum;
  }

  if (!Array.isArray(arr)) {
    return;
  }

  const description = schema.description;
  const values = arr.sort().map(value => ({
    key: pascalCase(value.toString()),
    value: value.toString()
  }));

  let item = findEnum(values);

  if (item) {
    return item;
  }

  enums.push(item = {
    values,
    description,
    template: 'enum',
    name: pascalCase(prefix) + pascalCase(name),
    file: kebabCase(prefix + pascalCase(name)) + '.enum'
  });

  return item;
}

/**
 * Find enum by equal values
 *
 * @public
 *
 * @param {EnumValues[]} values - Enum values for search
 *
 * @return {(Enum | undefined)}
 */
export function findEnum(values: EnumValues[]): Enum | undefined {
  return enums.find(item => isEqual(values, item.values));
}
