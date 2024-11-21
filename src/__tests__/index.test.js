import fs from 'fs';
import path from 'path';

import { describe, expect, it, vi } from 'vitest';

import app from '../index.js';
import { genObjectsDiff, parseFile } from '../utils/index.js';

describe('app', () => {
  const fixture1Path = path.resolve('__fixtures__/file1.yml');
  const fixture2Path = path.resolve('__fixtures__/file2.yml');
  const expectedResultPath = path.resolve('__fixtures__/result.txt'); // Путь к файлу с ожидаемым результатом

  it('should correctly compare two files and log the differences', () => {
    const fileContent1 = parseFile(fixture1Path);
    const fileContent2 = parseFile(fixture2Path);

    const diffs = genObjectsDiff(fileContent1, fileContent2);

    // reading the expected result from a file
    const expectedResult = fs.readFileSync(expectedResultPath, 'utf-8').trim();

    // intercepting output to the console
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation();

    const originalArgv = process.argv;
    process.argv = [null, null, fixture1Path, fixture2Path]; // Passing file paths as arguments

    app();

    // check that the console output matches the expected result
    expect(consoleLogSpy).toHaveBeenCalledWith(diffs);

    // check that the result in the console matches the contents of the file
    expect(consoleLogSpy.mock.calls[0][0]).toEqual(expectedResult);

    // restore the original process argv
    process.argv = originalArgv;

    consoleLogSpy.mockRestore();
  });
});
