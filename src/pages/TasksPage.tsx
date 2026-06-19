// src/pages/TasksPage.tsx — memoized rows + a theme toggle
import { useMemo, useCallback, useState } from 'react';
import TaskRow from './TaskRow';
import type { Task } from './TaskRow';

const ALL: Task[] = [
  { id: 1, title: 'Set up React project' },
  { id: 2, title: 'Build Task List component' },
  { id: 3, title: 'Add form validation' },
];

export default function TasksPage() {
  const [tasks] = useState<Task[]>(ALL);
  const [dark, setDark] = useState(false);

  const visible = useMemo(() => tasks, [tasks]);
  const handleSelect = useCallback((id: number) => {
    // a no-op select; stable so memoized rows keep their props
    void id;
  }, []);

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: dark ? '#0f172a' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          background: '#61dafb',
          color: '#0f172a',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 14px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        Toggle theme
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {visible.map((t) => (
          <TaskRow key={t.id} task={t} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
