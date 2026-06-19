import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const statusStyles: Record<Task['status'], { background: string; color: string; label: string }> = {
  todo: { background: '#e0f2fe', color: '#0369a1', label: 'To-do' },
  'in-progress': { background: '#fef9c3', color: '#92400e', label: 'In-progress' },
  done: { background: '#d1fae5', color: '#065f46', label: 'Done' },
};

// small + focused: renders one task, stable key handled by the parent
function TaskCard({ task, onMarkDone }: { task: Task; onMarkDone: (id: number) => void }) {
  const pill = statusStyles[task.status];
  return (
    <div
      onClick={() => onMarkDone(task.id)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '14px 16px',
        marginBottom: '10px',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{task.title}</span>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          background: pill.background,
          color: pill.color,
          borderRadius: '999px',
          padding: '4px 12px',
        }}
      >
        {pill.label}
      </span>
    </div>
  );
}

const initialTasks: Task[] = [
  { id: 1, title: 'Set up React project', status: 'done' },
  { id: 2, title: 'Build Task List component', status: 'in-progress' },
  { id: 3, title: 'Add form validation', status: 'todo' },
  { id: 4, title: 'Style with CSS modules', status: 'todo' },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [query, setQuery] = useState('');

  // derived values — not stored in state
  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase()),
  );
  const doneCount = tasks.filter((task) => task.status === 'done').length;

  const handleMarkDone = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: 'done' } : task)));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '48px 24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
          Task Dashboard
        </h1>
        <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 16px' }}>
          {doneCount} of {tasks.length} done
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        />
        {visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} onMarkDone={handleMarkDone} />
        ))}
      </div>
    </div>
  );
}
