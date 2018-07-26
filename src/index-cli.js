#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

require('babel-polyfill');

const lighthouseTestRunner = require('./lighthouse-test-runner');

const start = async () => {
  const configFile = `${path.resolve('./', '.lighthouse-test.json')}`;
  console.log('configFile', configFile);
  const options = fs.readFileSync(configFile, 'utf8');
  console.log(options, options.categories);
  console.log('configFile', configFile);
  await lighthouseTestRunner(JSON.parse(options));
};

start();
