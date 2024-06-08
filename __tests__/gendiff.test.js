import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import stylishView from '../src/formatter/stylish.js';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('check json file to stylish view', () => {
  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');
  const actualStylish = gendiff(jsonFile1, jsonFile2);

  expect(actualStylish).toEqual(expected);
});

test('if gotten unexisting state in element of object', () => {
  expect(() => {
    stylishView([
      { key: 'follow', value: false, state: 'states' },
      { key: 'host', value: 'hexlet.io', state: 'arent' },
      { key: 'host', value: 'hexlet.io', state: 'exists' }]);
  }).toThrow();
});

test('check yaml files to stylish view', () => {
  const yamlFile1 = getFixturePath('file1.yaml');
  const yamlFile2 = getFixturePath('file2.yaml');
  expect(gendiff(yamlFile1, yamlFile2)).toEqual(expected);
});
