// @ts-check
import { describe, expect, it } from 'vitest';

import { genObjectsDiff } from '../index.js';

describe('genObjectsDiff', () => {
  it('should handle identical objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: 1
    b: 2
}`);
  });

  it('should handle added keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: 1
  + b: 2
}`);
  });

  it('should handle removed keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: 1
  - b: 2
}`);
  });

  it('should handle changed values', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: 1
  - b: 2
  + b: 3
}`);
  });

  it('should handle mixed changes', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 10, d: 4 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: 1
  - b: 2
  + b: 10
  - c: 3
  + d: 4
}`);
  });

  it('should handle empty objects', () => {
    const obj1 = {};
    const obj2 = {};

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(``);
  });

  it('should handle objects with no shared keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
  - a: 1
  + b: 2
}`);
  });

  it('should handle objects with nested structures (flat comparison)', () => {
    const obj1 = { a: { x: 1 }, b: 2 };
    const obj2 = { a: { x: 1 }, b: 3 };

    const result = genObjectsDiff(obj1, obj2);
    expect(result).toBe(`{
    a: {
        x: 1
    }
  - b: 2
  + b: 3
}`);
  });
});
