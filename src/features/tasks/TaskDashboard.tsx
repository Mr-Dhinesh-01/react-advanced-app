// src/features/tasks/TaskDashboard.tsx — thin: compose the pieces
import { useTasks } from './useTasks';
import { useTaskFilters } from './useTaskFilters';
import { SearchBar } from './SearchBar';
import { TaskCard } from './TaskCard';

export function TaskDashboard() {
  const { tasks, loading } = useTasks();
  const { query, setQuery, visible } = useTaskFilters(tasks);

  if (loading) return <p style={{ color: '#94a3b8' }}>Loading…</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <SearchBar value={query} onChange={setQuery} />
      {visible.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
      {visible.length === 0 && <p style={{ color: '#94a3b8' }}>No matching tasks.</p>}
    </div>
  );
}
