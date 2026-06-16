// src/utils/priorityRank.test.ts
import { describe, test, expect } from 'vitest';
import { priorityRank } from './priorityRank';

describe('priorityRank', () => {
  test('orders high > medium > low', () => {
    expect(priorityRank('high')).toBeGreaterThan(priorityRank('medium'));
    expect(priorityRank('medium')).toBeGreaterThan(priorityRank('low'));
  });

  test('treats an unknown priority as low', () => {
    expect(priorityRank('whatever')).toBe(1);
  });
});