// src/utils/priorityRank.ts
export type Priority = 'high' | 'medium' | 'low';

// higher number = more important; unknown falls back to low (1)
export function priorityRank(priority: string): number {
  if (priority === 'high') return 3;
  if (priority === 'medium') return 2;
  return 1;
}