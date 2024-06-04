import path, {dirname} from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const expected = readFile('mustBe.txt');

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

test('check tree', () => {
  expect(gendiff(file1, file2)).toEqual(expected);
})