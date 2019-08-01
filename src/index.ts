#!/usr/bin/env node

import {scriptName} from 'yargs';
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
  showError,
  showReport,
  wrap
} from './utils';

const options = scriptName('swanco')
  .options({
    'input': {
      alias: 'i',
      describe: 'URL or local path to the file with specification in JSON format',
      demandOption: true
    },
    'output': {
      alias: 'o',
      default: 'src/app/api',
      describe: 'Path to write generated content'
    },
    'auth': {
      describe: 'Basic authentication credentials, like "user:password"',
    },
    'skip-services': {
      boolean: false,
      describe: 'Do not create services content'
    },
    'skip-module': {
      boolean: false,
      describe: 'Do not create module file'
    },
    'hide-report': {
      boolean: false,
      describe: 'Hide results of files generation'
    }
  })
  .showHelpOnFail(true)
  .help()
  .argv;

getData(options.input as string, options.auth as string)
  .catch(err => showError(err.message))
  .then(spec => {
    if (!spec) {
      return;
    }

    if (Object.entries(spec).length === 0 && spec.constructor === Object) {
      showError(`No Swagger data for generation in ${options.input}`);
      return;
    }

    try {
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
        const config = fetchConfig(spec, getProtocol(options.input as string));
        const services = fetchServices(spec, config);
        const enums = wrap<Enum>(fetchEnums(), 'enums');

        if (!options.skipModule) {
          root.content.push(fetchModule(services));
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
    } catch (e) {
      showError(e.message);
    }
  });
