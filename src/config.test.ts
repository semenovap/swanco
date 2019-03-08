import {resolve} from 'path';
import {Spec} from 'swagger-schema-official';
import {fetchConfig} from './config';
import {getData} from './utils';

describe('config', () => {

  let spec: Spec;

  beforeAll(async () => spec = await getData(resolve(__dirname, '../fixture.test.json')));

  it('create local config', async () => {
    const empty: Spec = {
      swagger: '',
      info: {
        title: '',
        version: ''
      },
      paths: {}
    };

    expect(fetchConfig(empty)).toEqual({
      baseUrl: '/',
      apiKeys: false,
      accessTokens: false,
      name: 'ConfigService',
      file: 'config.service',
      template: 'config'
    });
  });

  it('create remote config', async () => {
    expect(fetchConfig(spec).baseUrl).toEqual('https://petstore.swagger.io/v2');
  });

});
