// @ts-check

import fs from 'fs';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { parseFile } from '../index.js';

describe('parseFile', () => {
  const mockFilePath = '/mocked/path/file';
  const mockJsonContent = '{"key": "value"}';
  const invalidJsonContent = '{"key": "value"';

  beforeEach(() => {
    fs.readFileSync = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should parse JSON file content correctly', () => {
    fs.readFileSync.mockReturnValue(mockJsonContent);

    const result = parseFile(`${mockFilePath}.json`);

    expect(fs.readFileSync).toHaveBeenCalledWith(`${mockFilePath}.json`, 'utf-8');
    expect(result).toEqual({ key: 'value' });
  });

  it('should throw an error for unsupported file formats', () => {
    fs.readFileSync.mockReturnValue('Some content');

    expect(() => parseFile(`${mockFilePath}.txt`)).toThrowError(
      'Unsupported file format: .txt',
    );
  });

  it('should throw an error if JSON content is invalid', () => {
    fs.readFileSync.mockReturnValue(invalidJsonContent);

    expect(() => parseFile(`${mockFilePath}.json`)).toThrow(SyntaxError);
  });
});
