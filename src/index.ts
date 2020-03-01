import {fetchConfig} from './config';
import {
  Enum,
  fetchEnums
} from './enums';
import {
  fetchModels,
  Model
} from './models';
import {fetchModule} from './module';
import {
  fetchServices,
  Service
} from './services';
import {
  Directory,
  File,
  generate,
  getData,
  getProtocol,
  rmdir,
  showReport,
  wrap
} from './utils';

interface Options {
  input: string;
  output?: string;
  skipServices?: boolean;
  skipModule?: boolean;
  auth?: string;
  hideReport?: boolean;
}

export = (options: Options) => {
  options = Object.assign<Options, Options>({
    input: undefined,
    output: 'src/app/api',
    skipServices: false,
    skipModule: false,
    hideReport: false
  }, options);

  if (!options.input) {
    return Promise.reject(`Missing required argument: input`);
  }

  return getData(options.input, options.auth).then(spec => {
    const {swagger} = spec;

    if (parseInt(swagger, 0) !== 2) {
      throw new Error(`Invalid Swagger data or version of specification is not supported`);
    }

    rmdir(options.output);

    const root: Directory<File> = {
      directory: '.',
      content: []
    };
    const models = wrap<Model>(fetchModels(spec), 'models');

    if (!options.skipServices) {
      const variables: File = {
        name: 'Variables',
        file: 'variables',
        template: 'variables'
      };
      const config = fetchConfig(spec, getProtocol(options.input));
      const services = fetchServices(spec, config);
      const enums = wrap<Enum>(fetchEnums(), 'enums');

      if (!options.skipModule) {
        root.content.push(fetchModule(config, services));
      }

      root.content.push(config, variables, wrap<Service>(services, 'services'), models, enums);
      if (!options.hideReport) {
        showReport(models.content.length, enums.content.length, services.length);
      }
    } else {
      const enums = wrap<Enum>(fetchEnums(), 'enums');
      root.content.push(models, enums);
      if (!options.hideReport) {
        showReport(models.content.length, enums.content.length, 0);
      }
    }

    generate(options.output, root);
  });
};
