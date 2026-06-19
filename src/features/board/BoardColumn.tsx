// src/features/board/BoardColumn.tsx — a memoized column
import { memo } from 'react';
import TaskCard from './TaskCard';
import type { Task } from './TaskCard';

interface BoardColumnProps {
  title: string;
  tasks: Task[];
  onSelect: (id: number) => void;
}

function BoardColumn({ title, tasks, onSelect }: BoardColumnProps) {
  console.log('Column rendered:', title);
  return (
    <div
      style={{
        flex: 1,
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '12px',
        minWidth: '0',
      }}
    >
      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
        {title} ({tasks.length})
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default memo(BoardColumn);
