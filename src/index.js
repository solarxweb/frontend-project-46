#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import parse from './parsers.js';
import createTree from './compareElements.js';
import outputInFormat from './formatter/index.js';

const getPath = (pathTo) => path.resolve(process.cwd(), pathTo);
const getExtension = (fileName) => path.extname(fileName).slice(1);
const getData = (file) => parse(fs.readFileSync(file, 'utf-8'), getExtension(file));

const gendiff = (firstPath, secondPath, format) => {
  const fileFromPath1 = getPath(firstPath);
  const fileFromPath2 = getPath(secondPath);
  const data1 = getData(fileFromPath1);
  const data2 = getData(fileFromPath2);
  const tree = createTree(data1, data2);
  return outputInFormat(tree, format);
};

export default gendiff;
