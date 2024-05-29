#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'node:fs';
const program = new Command;

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format [type]', 'output format')
 
program.parse();