import {Config} from './config';
import {fetchModule} from './module';

describe('module', () => {

  it('create module config', async () => {
    const config: Config = {
      baseUrl: '/',
      apiKeys: false,
      accessTokens: false,
      name: 'ConfigService',
      file: 'config.service',
      template: 'config'
    };

    const expectedModule = {
      config,
      name: 'ApiModule',
      file: 'api.module',
      template: 'module',
      references: []
    };

    expect(fetchModule(config, [])).toEqual(expectedModule);
  });

});
