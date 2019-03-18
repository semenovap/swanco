/**
 * @module Models
 */

import kebabCase = require('lodash.kebabcase');
import orderBy = require('lodash.orderby');
import uniqBy = require('lodash.uniqby');
import {
  Schema,
  Spec
} from 'swagger-schema-official';
import {
  addEnum,
  Enum
} from './enums';
import {
  getBasicType,
  getReferenceType,
  GroupedReferences,
  groupReferences
} from './type';
import {
  File,
  pascalCase
} from './utils';

export interface Model extends File {
  properties: Property[];
  references: Array<Enum | Model | string> | GroupedReferences<Enum | Model>;
}

interface Property {
  description: string;
  name: string;
  required: boolean;
  type: string;
  isArray: boolean;
}

/**
 * Models collection
 *
 * @private
 */
const models: Map<string, Model> = new Map();

/**
 * Fetch all models
 *
 * @public
 *
 * @param {Spec} spec - Swagger specification
 *
 * @return {Model[]}
 */
export function fetchModels(spec: Spec): Model[] {
  const {definitions} = spec;

  if (definitions) {
    for (const defName in definitions) {
      if (!definitions[defName]) {
        continue;
      }

      const model = getModel(defName, definitions[defName]);
      models.set(model.name, model);
    }

    models.forEach(
      model => model.references = groupReferences(
        Array.isArray(model.references) && model.references.map(ref => typeof ref === 'string' ? findModel(ref) : ref)
      )
    );
  }

  return [...models.values()];
}

/**
 * Find model by name
 *
 * @public
 *
 * @param {String} name - Model name for search
 *
 * @return {(Model | undefined)}
 */
export function findModel(name: string): Model | undefined {
  return models.get(name);
}

/**
 * Get model from Swagger definition
 *
 * @private
 *
 * @param {String} name - model name
 * @param {Schema} definition - Swagger definition
 *
 * @return {Model}
 */
function getModel(name: string, definition: Schema): Model {
  name = pascalCase(name);
  const file = `${kebabCase(name)}.model`;
  const required = definition.required || [];
  const properties: Property[] = [];
  const references = [];

  for (const propName in definition.properties) {
    if (!definition.properties[propName]) {
      continue;
    }

    const property = definition.properties[propName];
    const refType = getReferenceType(property);
    const enumType = addEnum(name, propName, property);

    let type = getBasicType(property).name;
    let isArray = false;

    if (refType.name) {
      type = refType.name;
      isArray = refType.isArray;
      references.push(refType.name);
    } else if (enumType) {
      type = enumType.name;
      isArray = enumType.isArray;
      references.push(enumType);
    }

    properties.push({
      type,
      isArray,
      name: propName,
      description: property.description,
      required: required.indexOf(propName) > -1
    });
  }

  return {
    name,
    file,
    references,
    properties: orderBy(uniqBy(properties, 'name'), 'name'),
    template: 'model'
  };
}
