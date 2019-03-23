/**
 * @module Services
 */

import camelCase = require('lodash.camelcase');
import kebabCase = require('lodash.kebabcase');
import orderBy = require('lodash.orderby');
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
  HashMap,
  pascalCase,
} from './utils';

export interface Service extends Tag, File {
  operations: Operation[];
  references: GroupedReferences<Enum | Model>;
  importHttpParams: boolean;
  config: Config;
}

interface Operation {
  name: string;
  summary: string;
  description: string;
  parameters: Parameter[];
  response: Response;
  security: Security;
  method: string;
  url: string;
  contentType: string;
  hasQueryParams: boolean;
  hasFormData: boolean;
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
  const {paths, tags, securityDefinitions} = spec;

  return getServices(paths, tags, config, securityDefinitions);
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
 * @param {HashMap<SwaggerSecurity>} security - Swagger security definition
 *
 * @return {Service[]}
 */
function getServices(
  paths: HashMap<Path>,
  tags: Tag[] = [],
  config: Config,
  security: HashMap<SwaggerSecurity>
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
    if (!paths[pathName]) {
      continue;
    }

    const path = paths[pathName];
    for (const methodName in path) {
      if (!path.hasOwnProperty(methodName) || !path[methodName].tags) {
        continue;
      }

      const operation: SwaggerOperation = path[methodName];

      (operation.tags || []).forEach(tagName => {
        if (!servicesMap.has(tagName)) {

          const serviceDescription = Object.assign({
            description: `${tagName} service`
          }, tags.find(tag => tag.name === tagName));

          servicesMap.set(tagName, Object.assign(serviceDescription, {
            config,
            name: `${pascalCase(tagName)}Service`,
            file: `${kebabCase(tagName)}.service`,
            operations: [],
            references: {},
            importHttpParams: false,
            template: 'service'
          }));
        }
      });

      (operation.tags || ['api']).forEach(serviceName => servicesMap.get(serviceName).operations.push(getOperation(
        serviceName,
        methodName,
        pathName,
        operation,
        security
      )));
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

  return [...servicesMap.values()];
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
 * @param {HashMap<SwaggerSecurity>} security - Swagger security definition
 *
 * @return {Operation}
 */
function getOperation(
  service: string,
  method: string,
  path: string,
  operation: SwaggerOperation,
  security: HashMap<SwaggerSecurity>
): Operation {
  const name = camelCase(operation.operationId);
  const parameters: Parameter[] = orderBy(
    (operation.parameters || []).map(parameter => getParameter(service, name, parameter)),
    'required',
    'desc'
  );

  return {
    name,
    parameters,
    method,
    url: path.replace(/{/g, '${'),
    contentType: operation.consumes ? operation.consumes[0] : 'application/json',
    hasQueryParams: parameters.some(parameter => parameter.inQuery),
    hasFormData: parameters.some(parameter => parameter.inFormData),
    response: getResponse(operation.responses[200]),
    security: getSecurity(operation.security, security),
    summary: operation.summary,
    description: operation.description || name,
    deprecated: operation.deprecated
  };
}

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
  } else if ('items' in parameter && !Array.isArray(parameter.items)) {
    const enumType = addEnum(service, operation, parameter.items);
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
 * @param {(SwaggerResponse | SwaggerReference)} response - Swagger response definition
 *
 * @return {Response}
 */
function getResponse(response: SwaggerResponse | SwaggerReference): Response {
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
        refType = getBasicType(response.schema);
      }
    }

    if (refType) {
      type = refType.name;
      isArray = refType.isArray;
      reference = findModel(type);
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

  operationSecurity.forEach(obj => Object.keys(obj).map(name => {
    const security = securities[name];
    if ('in' in security) {
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
