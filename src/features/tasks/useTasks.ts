// src/features/tasks/useTasks.ts
import { useState, useEffect } from 'react';
import { fetchTasks } from './taskService';
import type { Task } from './TaskCard';

/**
 * Loads tasks from the API once on mount.
 * @returns { tasks, loading } — tasks is [] until the fetch resolves
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    // cancelled guard avoids setting state after unmount
    fetchTasks().then((data) => {
      if (!cancelled) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return { tasks, loading };
}
