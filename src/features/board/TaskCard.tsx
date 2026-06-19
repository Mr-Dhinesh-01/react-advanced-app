// src/features/board/TaskCard.tsx — a memoized card
import { memo } from 'react';

export type Status = 'todo' | 'in-progress' | 'done';
export interface Task {
  id: number;
  title: string;
  status: Status;
}

interface TaskCardProps {
  task: Task;
  onSelect: (id: number) => void;
}

function TaskCard({ task, onSelect }: TaskCardProps) {
  console.log('Card rendered:', task.title);
  return (
    <div
      onClick={() => onSelect(task.id)}
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '12px 14px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#0f172a',
      }}
    >
      {task.title}
    </div>
  );
}

export default memo(TaskCard);
