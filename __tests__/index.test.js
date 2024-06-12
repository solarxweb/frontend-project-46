import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe, expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

describe('tests each format/view for output', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const yaml1 = getFixturePath('file1.yml');
  const yaml2 = getFixturePath('file2.yml');
  test('output json result in "stylish" format', () => {
    expect(gendiff(json1, json2, 'stylish')).toEqual(readFile('expectedStylish.txt'));
  });
  test('output yaml result in "stylish" format', () => {
    expect(gendiff(yaml1, yaml2, 'stylish')).toEqual(readFile('expectedStylish.txt'));
  });
  test('check output when format is plain', () => {
    expect(gendiff(json1, json2, 'plain')).toEqual(readFile('expectedPlain.txt'));
  });
  test('check output when format is "json"', () => {
    expect(gendiff(yaml1, yaml2, 'json')).toEqual(readFile('expectedJSON.txt'));
  });
});
