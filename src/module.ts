/**
 * @module Module
 */

import {Service} from './services';
import {File} from './utils';

interface Module extends File {
  references: Service[];
}

/**
 * Fetch module object
 *
 * @public
 *
 * @param {Service[]} services - File objects with services
 */
export function fetchModule(services: Service[]): Module {
  return {
    name: 'ApiModule',
    file: 'api.module',
    template: 'module',
    references: services
  };
}
