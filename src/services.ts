/**
 * @module Services
 */

import camelCase = require('lodash.camelcase');
import kebabCase = require('lodash.kebabcase');
import orderBy = require('lodash.orderby');
import uniqBy = require('lodash.uniqby');
import {
  Operation as SwaggerOperation,
  Parameter as SwaggerParameter,
  Path,
  Reference as SwaggerReference,
  Response as SwaggerResponse,
  Security as SwaggerSecurity,
  Spec,
  Tag
} from 'swagger-schema-official';
import {Config} from './config';
import {
  addEnum,
  Enum
} from './enums';
import {
  findModel,
  Model
} from './models';
import {
  getBasicType,
  getReferenceType,
  GroupedReferences,
  groupReferences
} from './type';
import {
  File,
  Generics,
  HashMap,
  pascalCase,
} from './utils';

export interface Service extends Tag, File {
  operations: Operation[];
  references: GroupedReferences<Enum | Model>;
  importHttpParams: boolean;
  config: Config;
}

interface Operation extends Generics {
  name: string;
  summary: string;
  description: string;
  parameters: Parameter[];
  response: Response;
  security: Security;
  method: string;
  url: string;
  accept: string;
  contentType: string;
  responseType: string;
  hasQueryParams: boolean;
  hasFormData: boolean;
  hasNoBody: boolean;
  deprecated: boolean;
}

interface Parameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
  reference?: Enum | Model;
  inHeader?: boolean;
  inBody?: boolean;
  inQuery?: boolean;
  inFormData?: boolean;
  originalName?: string;
  isArray: boolean;
}

interface Response {
  type: string;
  description: string;
  isArray: boolean;
  reference?: Model;
}

interface Security {
  apiKeys: ApiKey[];
  tokens: string[];
}

interface ApiKey {
  name: string;
  inHeader?: boolean;
}

enum DataTypes {
  Json = 'application/json',
  Xml = 'application/xml',
}

/**
 * Generate directory object with services
 *
 * @public
 *
 * @param {Spec} spec - Swagger specification
 * @param {Config} config - Requests' configuration
 *
 * @return {Service}
 */
export function fetchServices(spec: Spec, config: Config): Service[] {
  const {paths, tags, securityDefinitions, security} = spec;

  return getServices(paths, tags, config, securityDefinitions, security);
}

/**
 * Group Api paths by tags and get them as services.
 * If there is no tags in Swagger specification, it will be got only one service with name "ApiService"
 *
 * @private
 *
 * @param {HashMap<Path>} paths - Paths Api
 * @param {Tag[]} [tags] - Swagger tags for grouping
 * @param {Config} config - Requests' configuration
 * @param {HashMap<SwaggerSecurity>} securityDefinitions - Swagger security definition
 * @param {Array<HashMap<string[]>>} globalSecurity - Global protection for all paths
 *
 * @return {Service[]}
 */
function getServices(
  paths: HashMap<Path>,
  tags: Tag[] = [],
  config: Config,
  securityDefinitions: HashMap<SwaggerSecurity>,
  globalSecurity: Array<HashMap<string[]>>
): Service[] {

  const servicesMap = new Map<string, Service>();

  servicesMap.set('api', {
    config,
    name: 'ApiService',
    file: 'api.service',
    operations: [],
    references: {},
    importHttpParams: false,
    template: 'service',
    description: 'Api service'
  });

  for (const pathName in paths) {
    if (!paths.hasOwnProperty(pathName) || !paths[pathName]) {
      continue;
    }

    const path = paths[pathName];
    for (const methodName in path) {
      if (!path.hasOwnProperty(methodName)) {
        continue;
      }

      const operation: SwaggerOperation = path[methodName];

      operation.tags = Array.isArray(operation.tags) && operation.tags.length ? operation.tags : ['api'];
      operation.security = operation.security || globalSecurity as any;

      operation.tags.forEach(tagName => {
        const currentTag = tags.find(tag => tag.name === tagName) || {
          name: 'api'
        };

        if (!servicesMap.has(currentTag.name)) {
          const serviceDescription = Object.assign({
            description: `${currentTag.name} service`
          }, currentTag);

          servicesMap.set(currentTag.name, Object.assign(serviceDescription, {
            config,
            name: `${pascalCase(currentTag.name)}Service`,
            file: `${kebabCase(currentTag.name)}.service`,
            operations: [],
            references: {},
            importHttpParams: false,
            template: 'service'
          }));
        }

        servicesMap.get(currentTag.name).operations.push(getOperation(
          currentTag.name,
          methodName,
          pathName,
          operation,
          securityDefinitions
        ));
      });
    }
  }

  servicesMap.forEach((service, name) => {
    if (!service.operations.length) {
      servicesMap.delete(name);
    } else {
      service.operations = orderBy(service.operations, 'name');
      service.importHttpParams = service.operations.some(operation => operation.hasQueryParams);

      const references = service.operations
        .reduce(
          (all, op) => all.concat(op.parameters.map(params => params.reference).concat(op.response.reference)),
          []
        )
        .filter(reference => !!reference);

      service.references = groupReferences(references);
    }
  });

  return orderBy([...servicesMap.values()], 'name');
}

/**
 * Get service's operation
 *
 * @private
 *
 * @param {String} service - Service name
 * @param {String} method - Service method (POST, PUT, GET, DELETE)
 * @param {String} path - Api path
 * @param {SwaggerOperation} operation - Swagger information about operation
 * @param {HashMap<SwaggerSecurity>} securityDefinitions - Swagger security definition
 *
 * @return {Operation}
 */
function getOperation(
  service: string,
  method: string,
  path: string,
  operation: SwaggerOperation,
  securityDefinitions: HashMap<SwaggerSecurity>
): Operation {
  const name = camelCase(operation.operationId);
  const parameters: Parameter[] = orderBy(
    (operation.parameters || []).map(parameter => getParameter(service, name, parameter)),
    'required',
    'desc'
  );
  const response = getResponse(service, name, operation.responses[200] || operation.responses.default);
  const generics = uniqBy([
    ...parameters.map(param => param.reference).concat(response.reference)
      .reduce((all, reference) => {
        if (reference && 'generics' in reference) {
          all.push.apply(all, reference.generics);
        }
        return all;
      }, [])
  ], undefined);
  const accept = getMimeType(operation.produces);

  return {
    name,
    method,
    generics,
    response,
    parameters,
    accept,
    url: path.replace(/{/g, '${'),
    contentType: getMimeType(operation.consumes),
    responseType: accept === DataTypes.Xml ? 'text' : undefined,
    hasQueryParams: parameters.some(parameter => parameter.inQuery),
    hasFormData: parameters.some(parameter => parameter.inFormData),
    security: getSecurity(operation.security, securityDefinitions),
    summary: operation.summary || name,
    description: operation.description,
    deprecated: operation.deprecated,
    hasNoBody: ['POST', 'PUT'].indexOf(method.toUpperCase()) > -1 && !parameters.some(
      parameter => parameter.inFormData || parameter.inBody
    )
  };
}

/**
 * Get operation's parameters
 *
 * @private
 *
 * @param {String} service - Service name
 * @param {String} operation - Operation name
 * @param {SwaggerParameter | SwaggerReference} parameter - Parameter config
 *
 * @return {Parameter}
 */
function getParameter(service: string, operation: string, parameter: SwaggerParameter | SwaggerReference): Parameter {

  if ('$ref' in parameter) {
    const refType = getReferenceType(parameter);
    return {
      reference: findModel(refType.name),
      name: refType.name,
      type: refType.name,
      isArray: refType.isArray,
      description: '',
      required: true,
      inBody: true
    };
  }

  let reference;
  const basicType = getBasicType(parameter);
  let type = basicType.name;
  let isArray = basicType.isArray;

  if ('schema' in parameter) {
    const refType = getReferenceType(parameter.schema);
    if (refType.name) {
      type = refType.name;
      isArray = refType.isArray;
      reference = findModel(type);
    }
  } else {
    let enumType: Enum;

    if ('enum' in parameter) {
      enumType = addEnum(service, operation, parameter);
    } else if ('items' in parameter && !Array.isArray(parameter.items)) {
      enumType = addEnum(service, operation, parameter.items);
    }

    if (enumType) {
      type = enumType.name;
      reference = enumType;
    }
  }

  return {
    type,
    reference,
    name: camelCase(parameter.name),
    description: parameter.description,
    required: parameter.required,
    inHeader: parameter.in === 'header',
    inBody: parameter.in === 'body',
    inQuery: parameter.in === 'query',
    inFormData: parameter.in === 'formData',
    isArray,
    originalName: parameter.name
  };
}

/**
 * Get operation's response data
 *
 * @private
 *
 * @param {String} service - Service name
 * @param {String} operation - Operation name
 * @param {(SwaggerResponse | SwaggerReference)} response - Swagger response definition
 *
 * @return {Response}
 */
function getResponse(service: string, operation: string, response: SwaggerResponse | SwaggerReference): Response {
  let type = 'void';
  let description;
  let reference;
  let isArray = false;

  if (response) {
    let refType;
    if ('$ref' in response) {
      refType = getReferenceType(response);
    } else if ('schema' in response) {
      description = response.description;
      refType = getReferenceType(response.schema);
      if (!refType.name) {
        if ('enum' in response.schema) {
          refType = addEnum(service, operation, response.schema);
        } else {
          refType = getBasicType(response.schema);
        }
      }
    }

    if (refType) {
      type = refType.name;
      isArray = refType.isArray;
      reference = refType.values ? refType : findModel(type);
    }
  }

  return {type, description, isArray, reference};
}

/**
 * Get operation's security data
 *
 * @private
 *
 * @param {SwaggerSecurity[]} [operationSecurity] - Swagger operations security
 * @param {HashMap<SwaggerSecurity>} [securities] - Swagger security definition
 *
 * @return {Security}
 */
function getSecurity(operationSecurity: SwaggerSecurity[] = [], securities: HashMap<SwaggerSecurity> = {}): Security {
  const apiKeys: ApiKey[] = [];
  const tokens = [];

  operationSecurity.forEach(obj => Object.keys(obj).forEach(name => {
    const security = securities[name];
    if (security && 'in' in security) {
      apiKeys.push({
        name: security.name,
        inHeader: security.in === 'header'
      });
    } else {
      tokens.push(name);
    }
  }));

  return {apiKeys, tokens};
}

/**
 * Get MIME type by available types
 *
 * @private
 *
 * @param {String[]} types - Available types
 *
 * @return {DataTypes | undefined}
 */
function getMimeType(types: string[] = []): DataTypes | undefined {
  const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
  const xmlMime = new RegExp('^((application|text)\/xml|[^;/ \t]+\/[^;/ \t]+[+]xml)[ \t]*(;.*)?$', 'i');

  if (types.some(type => jsonMime.test(type))) {
    return DataTypes.Json;
  } else if (types.some(type => xmlMime.test(type))) {
    return DataTypes.Xml;
  }

  return;
}
