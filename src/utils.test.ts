import {existsSync} from 'fs';
import {resolve} from 'path';
import {
  Directory,
  File,
  generate,
  getData,
  getProtocol,
  pascalCase,
  rmdir,
  showError,
  showReport,
  wrap
} from './utils';

describe('utils', () => {

  let file: File;
  let dir: Directory<File>;
  const output = resolve(__dirname, Date.now().toString());

  beforeEach(() => {
    dir = {
      directory: 'foo',
      content: []
    };

    file = {
      name: 'Bar',
      file: 'bar.test',
      template: 'model'
    };
  });

  it('convert any string to PascalCase', () => {
    expect(pascalCase('foo BAR-Baz')).toBe('FooBarBaz');
  });

  it('get Swagger spec data from local file fixture.test.json', async () => {
    expect(await getData(resolve(__dirname, '../fixture.test.json'))).toHaveProperty('swagger');
  });

  it('should throw exception about invalid json data', async () => {
    await expect(getData(resolve(__dirname, '../LICENSE'))).rejects.toThrowError();
  });

  it('should try to get file via http protocol', async () => {
    await expect(getData('foo')).rejects.toThrowError();
  });

  it('should do request to get a file via https', async () => {
    jest.mock('./utils');
    // await getData('https://foo');
    await expect(getData('https://foo')).rejects.toThrowError();
    jest.clearAllMocks();
  });

  it('should not generate a file without data', () => {
    generate(output, null);
    expect(existsSync(resolve(output, dir.directory, `${file.file}.ts`))).toBeFalsy();
  });

  it('should not generate a file without content', () => {
    generate(output, dir);
    expect(existsSync(resolve(output, dir.directory, `${file.file}.ts`))).toBeFalsy();
  });

  it('generate file by template to output directory', () => {
    dir.content.push(file);
    generate(output, dir);
    expect(existsSync(resolve(output, dir.directory, `${file.file}.ts`))).toBeTruthy();
  });

  it('generate file by template to output subdirectory', () => {
    dir.content.push({
      directory: 'bar',
      content: [file]
    });
    generate(output, dir);
    expect(existsSync(resolve(output, dir.directory, 'bar', `${file.file}.ts`))).toBeTruthy();
  });

  it('check index file should be exists', () => {
    expect(existsSync(resolve(output, dir.directory, `index.ts`))).toBeTruthy();
  });

  it('clean output directory', () => {
    rmdir(output);
    expect(existsSync(output)).toBeFalsy();
  });

  it('cannot clean output directory', () => {
    const path = resolve(process.cwd(), 'foo');
    rmdir('foo');
    expect(existsSync(path)).toBeFalsy();
  });

  it('should create and remove relative directory', () => {
    const name = 'foo';
    const path = resolve(process.cwd(), name);

    dir.content.push(file);
    generate(name, dir);
    expect(existsSync(path)).toBeTruthy();

    rmdir(name);
    expect(existsSync(path)).toBeFalsy();
  });

  it('return protocol by url', () => {
    expect(getProtocol('https://foo.bar')).toEqual('https');
  });

  it('return undefined by wrong url', () => {
    expect(getProtocol('foo.bar')).toBeUndefined();
  });

  it('should wrap data to directory object', () => {
    expect(wrap([file], 'foo')).toEqual({
      directory: 'foo',
      content: [file]
    });
  });

  it('should show error message', () => {
    spyOn(console, 'error');
    showError('foo');
    expect(console.error).toBeCalled();
  });

  it('should show report', () => {
    spyOn(console, 'table');
    showReport(0, 0, 0);
    expect(console.table).toBeCalled();
  });

});
