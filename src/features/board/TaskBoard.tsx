// src/features/board/TaskBoard.tsx — memo + useMemo + useCallback together
import { useMemo, useCallback, useState } from 'react';
import BoardColumn from './BoardColumn';
import type { Task } from './TaskCard';

const ALL_TASKS: Task[] = [
  { id: 1, title: 'Set up React project', status: 'done' },
  { id: 2, title: 'Build Task List component', status: 'in-progress' },
  { id: 3, title: 'Add form validation', status: 'todo' },
  { id: 4, title: 'Style with CSS modules', status: 'todo' },
];

export default function TaskBoard() {
  const [tasks] = useState<Task[]>(ALL_TASKS);
  const [dark, setDark] = useState(false); // unrelated UI state

  // useMemo: derive each column's list only when tasks change
  const todo = useMemo(() => tasks.filter((t) => t.status === 'todo'), [tasks]);
  const doing = useMemo(() => tasks.filter((t) => t.status === 'in-progress'), [tasks]);
  const done = useMemo(() => tasks.filter((t) => t.status === 'done'), [tasks]);

  // useCallback: stable handler so memoized cards/columns keep their props
  const handleSelect = useCallback((id: number) => {
    console.log('selected task', id);
  }, []);

  return (
    <div
      style={{
        padding: '20px',
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
      <div style={{ display: 'flex', gap: '10px' }}>
        <BoardColumn title="To do" tasks={todo} onSelect={handleSelect} />
        <BoardColumn title="In progress" tasks={doing} onSelect={handleSelect} />
        <BoardColumn title="Done" tasks={done} onSelect={handleSelect} />
      </div>
    </div>
  );
}
