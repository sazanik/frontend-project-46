// @ts-check

import path from 'path';

import { describe, expect, it, vi } from 'vitest';

import { getFilePath } from '../index.js';

vi.mock('../../../globalVariables.js', () => ({
  __dirname: '/mocked/base/dir',
}));

describe('getFilePath', () => {
  it('should join paths correctly when valid inputs are provided', () => {

    const result = getFilePath('subfolder', 'file.txt');
    expect(result).toBe(path.join('/mocked/base/dir', 'subfolder', 'file.txt'));
  });

  it('should throw an error if filename is not provided', () => {
    expect(() => getFilePath('subfolder')).toThrowError('filename must be a "string"');
  });

  it('should throw an error if filename is not a string', () => {
    expect(() => getFilePath('subfolder', 123)).toThrowError('filename must be a "string"');
  });

  it('should throw an error if folderPath is not a string', () => {
    expect(() => getFilePath(123, 'file.txt')).toThrowError('folderPath must be a "string"');
  });

  it('should handle folderPath being an empty string', () => {
    const result = getFilePath('', 'file.txt');
    expect(result).toBe(path.join('/mocked/base/dir', 'file.txt'));
  });

  it('should handle folderPath being undefined and throw error', () => {
    expect(() => getFilePath(undefined, '')).toThrowError('folderPath must be a "string"');
  });

  it('should handle filename being undefined and throw error', () => {
    expect(() => getFilePath('folder')).toThrowError('filename must be a "string"');
  });
});
