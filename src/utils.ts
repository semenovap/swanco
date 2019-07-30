/**
 * @module Utils
 */

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  unlinkSync,
  writeFileSync
} from 'fs';
import {
  compile,
  registerHelper
} from 'handlebars';
import {IncomingMessage} from 'http';
import camelCase = require('lodash.camelcase');
import upperFirst = require('lodash.upperfirst');
import {
  isAbsolute,
  join,
  resolve
} from 'path';
import {Spec} from 'swagger-schema-official';
import {URL} from 'url';

export interface Directory<T extends File> {
  directory: string;
  content: Array<Directory<T> | T>;
}

export interface File {
  name: string;
  file: string;
  template: string;
}

export interface HashMap<T> {
  [name: string]: T;
}

// Register render helpers
registerHelper('join', (array, sep, options) => array.map(item => options.fn(item)).join(sep));
registerHelper('pascalCase', value => pascalCase(value));

/**
 * Create file (model, service, enum, etc.) by template
 *
 * @public
 *
 * @param {String} output - Output directory
 * @param {Directory} dir - Data for writing
 */
export function generate(output: string, dir: Directory<File>): void {
  if (!Array.isArray(dir.content) || !dir.content.length) {
    return;
  }

  const path = mkdir(join(output, dir.directory));

  dir.content.forEach(item => {
    if ('file' in item) {
      writeFileSync(join(path, `${item.file}.ts`), compile(getTemplate(item.template))(item));
    } else {
      generate(output, item);
    }
  });

  writeFileSync(join(path, `index.ts`), compile(getTemplate('index'))(dir));
}

/**
 * Remove directory recursively
 *
 * @public
 */
export function rmdir(dir: string): void {
  dir = isAbsolute(dir) ? dir : join(process.cwd(), dir);

  if (!existsSync(dir)) {
    return;
  }

  readdirSync(dir).forEach(file => {
    const curPath = join(dir, file);
    if (lstatSync(curPath).isDirectory()) {
      rmdir(curPath);
    } else {
      unlinkSync(curPath);
    }
  });

  return rmdirSync(dir);
}

/**
 * Wrap fetched objects to directory
 *
 * @public
 *
 * @param {File[]} data - Array of objects
 * @param {String} directory - Subdirectory
 *
 * @return {Directory<File>}
 */
export function wrap<T extends File>(data: T[], directory: string): Directory<T> {
  return {
    directory,
    content: data
  };
}

/**
 * Convert string to pascal notation
 *
 * @public
 *
 * @param {String} str - Input string
 *
 * @return {String}
 */
export function pascalCase(str: string): string {
  return upperFirst(camelCase(str));
}

/**
 * Show red error message
 *
 * @public
 *
 * @param {String} message - Error message
 */
export function showError(message: string): void {
  console.error('\x1b[31m', message, '\x1b[0m');
}

/**
 * Show result of files generation
 *
 * @public
 *
 * @param {Number} models - Models' count
 * @param {Number} enums - Enums' count
 * @param {Number} services - Services' count
 */
export function showReport(models: number, enums: number, services: number): void {
  const labels = ['Models', 'Enums', 'Services'];
  const data = [models, enums, services]
    .map((value, index) => ({
      name: labels[index],
      count: value
    }))
    .filter(value => value.count);

  console.table(data);
}

/**
 * Get Swagger specification
 *
 * @public
 *
 * @param {String} path - URL or local path to the file with specification
 * @param {String} [auth] - Basic authentication credentials
 *
 * @return {Promise<Spec>}
 */
export async function getData(path: string, auth?: string): Promise<Spec> {
  let data;

  if (existsSync(path)) {
    data = readFileSync(path, {encoding: 'utf-8'});
  } else {
    data = await getUrl(path, auth);
  }

  try {
    data = JSON.parse(data);
  } catch (e) {
    throw new Error(`Cannot parse data from ${path}`);
  }

  return data;
}

/**
 * Get protocol of url
 *
 * @param {String} url - Swagger specification source url
 *
 * @return {(String | undefined)}
 */
export function getProtocol(url: string): string | undefined {
  let protocol;

  try {
    protocol = new URL(url).protocol;
    protocol = protocol.substr(0, protocol.length - 1);
  } catch (e) {}

  return protocol;
}

/**
 * Get data from URL
 *
 * @private
 *
 * @param {String} url - Path to remote Swagger Api data
 * @param {String} auth - Basic authentication credentials
 *
 * @return {Promise<string>}
 */
function getUrl(url: string, auth: string): Promise<string> {
  return new Promise((res, rej) => {
    const http = require(getProtocol(url));
    const request = http.get(url, {auth});

    request.on('error', err => rej(err));
    request.on('response', (result: IncomingMessage) => {
      const {statusCode} = result;
      const contentType = result.headers['content-type'];

      let err: Error;
      if (statusCode !== 200) {
        err = new Error(`Request Failed. Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        err = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
      }

      if (err) {
        result.resume();
        rej(err);
      } else {
        let rawData = '';
        result.setEncoding('utf-8');
        result.on('data', chunk => rawData += chunk);
        result.on('end', () => res(rawData));
      }
    });
  });
}

/**
 * Read template's content from file
 *
 * @private
 *
 * @param {String} name - Template's name
 */
function getTemplate(name: string): string {
  return readFileSync(resolve(__dirname, `../templates/${name}.hbs`), 'utf-8');
}

/**
 * Create directory recursively
 *
 * @private
 *
 * @param {String} dir - Path to directory
 *
 * @return {String}
 */
function mkdir(dir: string): string {
  dir = isAbsolute(dir) ? dir : join(process.cwd(), dir);

  if (existsSync(dir)) {
    return dir;
  }

  mkdirSync(dir, {
    recursive: true
  });

  return dir;
}
