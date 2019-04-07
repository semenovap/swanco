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
  generics: string[];
  extended?: Array<Model | string>;
  properties: Property[];
  references?: GroupedReferences<Enum | Model>;
  title: string;
  description?: string;
}

interface Property {
  description: string;
  name: string;
  required: boolean;
  type: string;
  isArray: boolean;
  reference?: Enum | Model | string;
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

    models.forEach(model => {
      const references = [];
      const extended = [];

      model.properties.forEach(property => {
        const {reference} = property;

        if (!reference) {
          return;
        }

        if (typeof reference === 'string') {
          const refModel = findModel(reference);
          if (refModel) {
            references.push(refModel);
            property.reference = refModel;
            model.generics.push(...refModel.generics);
          } else {
            throw new Error(`Reference model "${reference}" was not found in the specification!`);
          }
        } else {
          references.push(reference);
        }
      });

      model.extended.forEach(reference => {
        if (typeof reference !== 'string') {
          return;
        }

        const refModel = findModel(reference);

        if (refModel) {
          references.push(refModel);
          extended.push(refModel);
        } else {
          throw new Error(`Reference model "${reference}" was not found in the specification!`);
        }
      });

      model.references = groupReferences(references);
      model.extended = extended;
    });

    models.forEach(model => {
      const refModels = (model.references.model || []) as Model[];
      refModels.forEach(refModel => model.generics.push(...refModel.generics));
      model.generics = uniqBy(model.generics, undefined);
    });
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
  const properties: Property[] = [];
  const generics = [];
  const extended = [];

  if (!definition.properties && Array.isArray(definition.allOf)) {
    definition.allOf.forEach(schema => {
      const ref = getReferenceType(schema);
      if (ref.name) {
        extended.push(ref.name);
      } else if (schema.properties) {
        definition = schema;
      }
    });
  }

  const required = definition.required || [];

  for (const propName in definition.properties) {
    if (!definition.properties[propName]) {
      continue;
    }

    const property = definition.properties[propName];
    const basicType = getBasicType(property);
    const refType = getReferenceType(property);
    const enumType = addEnum(name, propName, property);

    let type = basicType.name;
    let isArray = basicType.isArray;
    let reference;

    if (refType.name) {
      type = reference = refType.name;
      isArray = refType.isArray;
    } else if (enumType) {
      type = enumType.name;
      isArray = enumType.isArray;
      reference = enumType;
    } else if (type === 'object') {
      type = name + pascalCase(propName);
      generics.push(type);
    }

    properties.push({
      type,
      isArray,
      reference,
      name: propName,
      description: property.description,
      required: required.indexOf(propName) > -1
    });
  }

  return {
    name,
    file,
    generics,
    extended,
    title: definition.title || name,
    description: definition.description,
    properties: orderBy(uniqBy(properties, 'name'), 'name'),
    template: 'model'
  };
}
