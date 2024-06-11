#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<path1>', 'Path to first file')
  .argument('<path2>', 'Path to second file')
  .helpOption('-h, --help', 'output usage information')
  .action((path1, path2, options) => {
    console.log(gendiff(path1, path2, options.format));
  });

program.parse();
