// src/components/kanban/KanbanCard.tsx
import { useDraggable } from '@dnd-kit/core';

export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const PILL: Record<Task['status'], { bg: string; text: string; label: string }> = {
  todo: { bg: '#e0f2fe', text: '#0369a1', label: 'To-do' },
  'in-progress': { bg: '#fef9c3', text: '#92400e', label: 'In-progress' },
  done: { bg: '#d1fae5', text: '#065f46', label: 'Done' },
};

export function KanbanCard({ task }: { task: Task }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id: task.id });
  const pill = PILL[task.status];
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '12px',
        cursor: 'grab',
        opacity: isDragging ? 0 : 1,
      }}
    >
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
        {task.title}
      </p>
      <span
        style={{
          background: pill.bg,
          color: pill.text,
          fontSize: '10px',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '999px',
        }}
      >
        {pill.label}
      </span>
    </div>
  );
}
