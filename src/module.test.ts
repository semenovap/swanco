import {fetchModule} from './module';

describe('module', () => {

  it('create module config', async () => {
    const expectedModule = {
      name: 'ApiModule',
      file: 'api.module',
      template: 'module',
      references: []
    };

    expect(fetchModule([])).toEqual(expectedModule);
  });

});
