#!/usr/bin/env node

import {scriptName} from 'yargs';
import swanco = require('./index');
import {showError} from './utils';

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

swanco(options as any).catch(err => showError(err.message));
