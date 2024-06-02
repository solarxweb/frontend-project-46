#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command;

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format [type]', 'output format')
  .argument('<path1>', 'Path to first file')
  .argument('<path2>', 'Path to second file')
  .action((path1, path2) => {
   console.log(genDiff(path1, path2));
  });

program.parse();

