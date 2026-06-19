// src/components/kanban/KanbanColumn.tsx
import { useDroppable } from '@dnd-kit/core';
import { KanbanCard } from './KanbanCard';
import type { Task } from './KanbanCard';

export function KanbanColumn({
  id,
  label,
  tasks,
}: {
  id: Task['status'];
  label: string;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: '160px',
        borderRadius: '16px',
        padding: '12px',
        background: isOver ? '#eff6ff' : '#f8fafc',
        border: isOver ? '2px solid #61dafb' : '1px solid #e2e8f0',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>
          {label.toUpperCase()}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>{tasks.length}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map((t) => (
          <KanbanCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
