// src/components/TaskList.test.tsx
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

vi.mock('axios');

// a small component that loads tasks from the API
interface Task { id: number; title: string; }
function TaskList() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    axios.get<Task[]>('http://localhost:3000/tasks')
      .then((res) => { if (!cancelled) setTasks(res.data); });
    return () => { cancelled = true; };
  }, []);
  if (tasks === null) return <p>Loading tasks…</p>;
  return <ul>{tasks.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;
}

describe('TaskList', () => {
  beforeEach(() => vi.clearAllMocks());

  test('shows loading, then the fetched task', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: [{ id: 1, title: 'Set up React project' }],
    });

    render(<TaskList />);

    // loading shows immediately (synchronous first render)
    expect(screen.getByText('Loading tasks…')).toBeInTheDocument();

    // then the task appears once the mocked promise resolves
    expect(await screen.findByText('Set up React project')).toBeInTheDocument();
  });
});