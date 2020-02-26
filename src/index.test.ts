import swanco = require('./index');
import {existsSync} from 'fs';
import {rmdir} from './utils';

describe('index', () => {

  it('should throw exception about empty input', async () => {
    await swanco({input: ''}).catch(err => expect(err).toEqual('Missing required argument: input'));
  });

  it('should throw exception about invalid input', async () => {
    await expect(swanco({input: 'foo'})).rejects.toThrowError();
  });

  it('should throw exception about invalid data', async () => {
    await expect(swanco({input: 'package.json'})).rejects.toThrowError();
  });

  it('should hide report', async () => {
    spyOn(console, 'table');
    await swanco({
      input: 'fixture.test.json',
      output: 'tmp',
      hideReport: true
    });

    expect(console.table).not.toBeCalled();
    rmdir('tmp');
  });

  it('should generate services and show report', async () => {
    spyOn(console, 'table');
    await swanco({
      input: 'fixture.test.json',
      output: 'tmp'
    });

    expect(console.table).toBeCalled();
    rmdir('tmp');
  });

  it('should not generate services but show report', async () => {
    spyOn(console, 'table');
    await swanco({
      input: 'fixture.test.json',
      output: 'tmp',
      skipServices: true
    });

    expect(console.table).toBeCalled();
    rmdir('tmp');
  });

  it('should not generate services', async () => {
    await swanco({
      input: 'fixture.test.json',
      output: 'tmp',
      hideReport: true,
      skipServices: true
    });

    expect(existsSync('tmp/services')).toBeFalsy();
    rmdir('tmp');
  });

  it('should not generate module', async () => {
    await swanco({
      input: 'fixture.test.json',
      output: 'tmp',
      hideReport: true,
      skipModule: true
    });

    expect(existsSync('tmp/services/api.module.ts')).toBeFalsy();
    rmdir('tmp');
  });

});
