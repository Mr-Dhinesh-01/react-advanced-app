// src/features/tasks/useTaskFilters.ts — search state + derived list
import { useState, useMemo } from 'react';
import type { Task } from './TaskCard';

export function useTaskFilters(tasks: Task[]) {
  const [query, setQuery] = useState('');
  const visible = useMemo(
    () => tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())),
    [tasks, query],
  );
  return { query, setQuery, visible };
}
