import path, {dirname} from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import stylishView from '../src/formatter/stylish.js';

const __filename = fileURLToPath(import.meta.url)
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

const check = `{
  - a: {
        a: {
            a: a
        }
    }
  + b: {
        b: {
            b: b
        }
    }
}`;

const file1 = getFixturePath('file1.json')
const file2 = getFixturePath('file2.json')
const actualStylish = gendiff(file1, file2)

describe('gendiff tests', () => {
  test('check stylish output', () => {
    expect(actualStylish).toEqual(expected);
  });
  test('if gotten unexisting state in element of object', () => {
    expect(() => {
      stylishView([
        { key: 'follow', value: false, state: 'state' },
        { key: 'host', value: 'hexlet.io', state: 'arent' },
        { key: 'host', value: 'hexlet.io', state: 'exists' }])
    }).toThrow();
});
});