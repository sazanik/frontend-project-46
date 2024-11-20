import { getFilePath } from '../index.js';
import { BASE_PATH } from '../../constants/index.js';

describe('getFilePath', () => {
  test('should return full path with default arguments', () => {
    const result = getFilePath();
    expect(result).toContain(BASE_PATH);
  });

  test('should join path and filename correctly', () => {
    const result = getFilePath('__fixtures__', 'file.txt');
    expect(result).toMatch(new RegExp(`${BASE_PATH}/__fixtures__/file.txt$`));
  });

  test('should handle empty path', () => {
    const result = getFilePath('', 'file.txt');
    expect(result).toMatch(new RegExp(`${BASE_PATH}/file.txt$`));
  });

  test('should handle null path', () => {
    const result = getFilePath(null, 'file.txt');
    expect(result).toMatch(new RegExp(`${BASE_PATH}/file.txt$`));
  });

  test('should handle empty filename', () => {
    const result = getFilePath('__fixtures__');
    expect(result).toMatch(new RegExp(`${BASE_PATH}/__fixtures__$`));
  });

  test('should work with absolute paths', () => {
    const result = getFilePath('/absolute/path', 'file.txt');
    expect(result).toMatch(/absolute\/path\/file\.txt$/);
  });
});
