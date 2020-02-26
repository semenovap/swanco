/**
 * @module Module
 */

import {Config} from './config';
import {Service} from './services';
import {File} from './utils';

interface Module extends File {
  config: Config;
  references: Service[];
}

/**
 * Fetch module object
 *
 * @public
 *
 * @param {Config} config - Requests' configuration
 * @param {Service[]} services - File objects with services
 */
export function fetchModule(config: Config, services: Service[]): Module {
  return {
    config,
    name: 'ApiModule',
    file: 'api.module',
    template: 'module',
    references: services
  };
}
