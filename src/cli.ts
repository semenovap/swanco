#!/usr/bin/env node

import { Command } from 'commander';
import swanco = require('./index');
import {showError} from './utils';

const program = new Command();

program.name('swanco')
  .description('This project is a small tool, which generates an Angular module from a Swagger 2.0 specification.')
  .requiredOption('-i, --input <string>', 'URL or local path to the file with specification in JSON format')
  .option('-o, --output <string>', 'Path to write generated content')
  .option('--auth <string>', 'Basic authentication credentials, like "user:password"')
  .option('--skip-services', 'Do not create services content')
  .option('--skip-module', 'Do not create module file')
  .option('--hide-report', 'Hide results of files generation')
  .showHelpAfterError()
  .version('4.0.7')
  .parse();

swanco(program.opts()).catch(err => showError(err.message));
