// src/components/TaskCard.tsx
export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const PILL: Record<Task['status'], { bg: string; text: string; label: string }> = {
  'todo': { bg: '#e0f2fe', text: '#0369a1', label: 'To-do' },
  'in-progress': { bg: '#fef9c3', text: '#92400e', label: 'In-progress' },
  'done': { bg: '#d1fae5', text: '#065f46', label: 'Done' },
};

export function TaskCard({ task }: { task: Task }) {
  const pill = PILL[task.status];
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '14px' }}>
      <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{task.title}</h3>
      <span style={{ background: pill.bg, color: pill.text, fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px' }}>{pill.label}</span>
    </div>
  );
}