import {existsSync} from 'fs';
import {resolve} from 'path';
import {
  Directory,
  File,
  generate,
  getData,
  pascalCase,
  rmdir
} from './utils';

describe('utils', () => {

  const output = resolve(__dirname, Date.now().toString());

  const file: File = {
    name: 'Bar',
    file: 'bar.test',
    template: 'model'
  };

  const dir: Directory<File> = {
    directory: 'foo',
    content: [
      file
    ]
  };

  it('convert any string to PascalCase', () => {
    expect(pascalCase('foo BAR-Baz')).toBe('FooBarBaz');
  });

  it('get Swagger spec data from local file fixture.test.json', async () => {
    expect(await getData(resolve(__dirname, '../fixture.test.json'))).toHaveProperty('swagger');
  });

  it('get Swagger spec data from URL https://petstore.swagger.io/v2/swagger.json', async () => {
    expect(await getData('https://petstore.swagger.io/v2/swagger.json')).toHaveProperty('swagger');
  });

  it('generate file by template to output directory', () => {
    generate(output, dir);
    expect(existsSync(resolve(output, dir.directory, `${file.file}.ts`))).toBeTruthy();
  });

  it('check index file should be exists', () => {
    expect(existsSync(resolve(output, dir.directory, `index.ts`))).toBeTruthy();
  });

  it('clean output directory', () => {
    rmdir(output);
    expect(existsSync(output)).toBeFalsy();
  });

});
