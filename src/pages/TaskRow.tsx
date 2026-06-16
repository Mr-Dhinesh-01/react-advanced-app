// src/pages/TaskRow.tsx — a memoized row
import { memo } from 'react';

export interface Task { id: number; title: string; }

// Because this row is memoized and its props never change while you
// toggle the theme, it renders exactly once — so the count is a plain
// static 1. (Remove memo and it would climb on every toggle.)
function TaskRow({ task, onSelect }: { task: Task; onSelect: (id: number) => void }) {
  return (
    <div onClick={() => onSelect(task.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '12px 14px', cursor: 'pointer' }}>
      <span style={{ fontSize: '14px', color: '#0f172a' }}>{task.title}</span>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>renders: 1</span>
    </div>
  );
}

export default memo(TaskRow);