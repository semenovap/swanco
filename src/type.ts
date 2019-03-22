/**
 * @module Type
 */

import groupBy = require('lodash.groupby');
import orderBy = require('lodash.orderby');
import uniqBy = require('lodash.uniqby');
import {
  BaseSchema,
  Schema
} from 'swagger-schema-official';
import {
  File,
  pascalCase
} from './utils';

export interface GroupedReferences<T extends File> {
  [template: string]: T[];
}

interface Type {
  name: string;
  isArray: boolean;
}

/**
 * Get basic type (string, number, array, etc.) by Swagger schema
 *
 * @public
 *
 * @param {BaseSchema} schema - Swagger base schema
 *
 * @return {Type}
 */
export function getBasicType(schema: BaseSchema): Type {
  let name = schema.type || 'any';
  let isArray = false;

  if (schema.type === 'integer') {
    name = 'number';
  } else if (schema.type === 'file') {
    name = 'Blob';
  } else if (schema.type === 'array') {
    const items = schema.items;

    if (!Array.isArray(items) && items.type) {
      name = `${items.type}[]`;
      isArray = true;
    }
  }

  return {
    name,
    isArray
  };
}

/**
 * Get reference to another model from Swagger schema
 *
 * @public
 *
 * @param {Schema} schema - Swagger schema
 *
 * @return {Type}
 */
export function getReferenceType(schema: Schema): Type {
  let name = '';
  let isArray = false;

  if (schema.type === 'array') {
    const items = schema.items;

    if (!Array.isArray(items) && items.$ref) {
      name = items.$ref;
      isArray = true;
    }
  } else if (schema.$ref) {
    name = schema.$ref;
  }

  name = pascalCase(name.split('/').slice(2).join(''));

  return {
    name,
    isArray
  };
}

/**
 * Group references by template for import
 *
 * @public
 *
 * @param {File[]} references - References array
 *
 * @return {GroupedReferences<T>}
 */
export function groupReferences<T extends File>(references: T[]): GroupedReferences<T> {
  return groupBy(orderBy(uniqBy(references, 'file'), 'name'), 'template');
}
