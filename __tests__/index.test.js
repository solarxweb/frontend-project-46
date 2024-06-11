import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe, expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

let file1;
let file2;

describe('tests each format/view for output', () => {
  test('output json result in "stylish" format', () => {
    file1 = getFixturePath('file1.json');
    file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2, 'stylish')).toEqual(readFile('expectedStylish.txt'));
  });
  test('output yaml result in "stylish" format', () => {
    file1 = getFixturePath('file1.yaml');
    file2 = getFixturePath('file2.yaml');
    expect(gendiff(file1, file2, 'stylish')).toEqual(readFile('expectedStylish.txt'));
  });
  test('check output when format is plain', () => {
    file1 = getFixturePath('file1.yaml');
    file2 = getFixturePath('file2.yaml');
    expect(gendiff(file1, file2, 'plain')).toEqual(readFile('expectedPlain.txt'));
  });
  test('check output when format is "json"', () => {
    file1 = getFixturePath('file1.json');
    file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2, 'json')).toEqual(readFile('expectedJSON.txt'));
  });
});
