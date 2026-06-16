// src/features/tasks/TaskRow.tsx — a memoized presentational row
import { memo } from 'react';

export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

interface TaskRowProps {
  task: Task;
  onSelect: (id: number) => void;
}

const statusColors: Record<Task['status'], { bg: string; text: string }> = {
  'todo': { bg: '#e0f2fe', text: '#0369a1' },
  'in-progress': { bg: '#fef9c3', text: '#92400e' },
  'done': { bg: '#d1fae5', text: '#065f46' },
};

function TaskRow({ task, onSelect }: TaskRowProps) {
  // logs only when THIS row actually re-renders
  console.log('Row rendered:', task.title);
  const c = statusColors[task.status];
  return (
    <div
      onClick={() => onSelect(task.id)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '12px 14px', cursor: 'pointer' }}
    >
      <span style={{ fontSize: '14px', color: '#0f172a' }}>{task.title}</span>
      <span style={{ background: c.bg, color: c.text, fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px' }}>{task.status}</span>
    </div>
  );
}

// memo → skip re-render unless task or onSelect changes
export default memo(TaskRow);