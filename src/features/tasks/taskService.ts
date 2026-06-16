// Your tasksSlice.ts imports BOTH from the service and stays unchanged:
//   import { getTasks, type Task } from './taskService';

// So make taskService.ts RE-EXPORT Task. Full file:
// src/features/tasks/taskService.ts
import { apiClient } from '@/shared/api/apiClient';
import type { Task } from './TaskCard';

// re-export so tasksSlice can do: import { getTasks, type Task }
export type { Task };

export async function fetchTasks(): Promise<Task[]> {
  const res = await apiClient.get<Task[]>('/tasks');
  return res.data;
}

export const getTasks = fetchTasks; // alias used by tasksSlice