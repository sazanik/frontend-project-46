// @ts-check

import fs from 'fs';

import { genDiff, getFilePath, parseFile } from '../index.js';
import { BASE_PATH } from '../../constants/index.js';

const path1 = getFilePath(`${BASE_PATH}/__fixtures__`, 'file1.json');
const path2 = getFilePath(`${BASE_PATH}/__fixtures__`, 'file2.json');
const obj1 = parseFile(path1);
const obj2 = parseFile(path2);


let expected;

beforeAll(() => {
  expected = fs.readFileSync(getFilePath(`${BASE_PATH}/__fixtures__/result.txt`), 'utf-8').trim();
});

describe('genDiff', () => {
  test('compare two json files', () => {
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });
});
