// src/features/tasks/index.ts — the public surface of the tasks feature
export { TaskDashboard } from './TaskDashboard';
export { TaskCard } from './TaskCard';
export { TaskForm } from './TaskForm';
export { SearchBar } from './SearchBar';
export { useTasks } from './useTasks';
export { useTaskFilters } from './useTaskFilters';
export type { Task } from './TaskCard';
// taskService.ts stays internal — not re-exported  