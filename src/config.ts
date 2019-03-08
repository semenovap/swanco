/**
 * @module Config
 */

import {
  Security,
  Spec
} from 'swagger-schema-official';
import {
  File,
  HashMap
} from './utils';

export interface Config extends File {
  baseUrl: string;
  apiKeys: boolean;
  accessTokens: boolean;
}

/**
 * Fetch configuration object
 *
 * @public
 *
 * @param {Spec} spec - Swagger specification
 *
 * @return {Config}
 */
export function fetchConfig(spec: Spec): Config {
  const {schemes, host, basePath, securityDefinitions} = spec;

  return getConfig(schemes, host, basePath, securityDefinitions);
}

/**
 * Get requests' configuration data
 *
 * @private
 *
 * @param {String[]} [schemes] - Requests' protocols (HTTP, HTTPS)
 * @param {String} [host] - Host name
 * @param {String} [basePath] - Base path
 * @param {HashMap<SwaggerSecurity>} [security] - Swagger security definition
 *
 * @return {Config}
 */
function getConfig(
  schemes: string[] = ['https'],
  host: string = '',
  basePath: string = '/',
  security: HashMap<Security> = {}
): Config {
  let baseUrl = basePath;

  if (host) {
    baseUrl = `${schemes[0]}://${host}${basePath}`.replace(/\/$/, '');
  }

  const apiKeys = Object.values(security).some(value => 'in' in value);
  const accessTokens = Object.values(security).some(value => !('in' in value));

  return {
    baseUrl,
    apiKeys,
    accessTokens,
    name: 'ConfigService',
    file: 'config.service',
    template: 'config'
  };
}
