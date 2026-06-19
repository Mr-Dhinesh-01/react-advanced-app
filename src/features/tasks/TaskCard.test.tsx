// src/components/TaskCard.test.tsx
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import type { Task } from './TaskCard';

const task: Task = { id: 1, title: 'Set up React project', status: 'done' };

describe('TaskCard', () => {
  test('renders the title as a heading', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByRole('heading', { name: 'Set up React project' })).toBeInTheDocument();
  });

  test('shows the human-readable status', () => {
    render(<TaskCard task={task} />);
    // the component maps 'done' → 'Done' for display
    expect(screen.getByText('Done')).toBeInTheDocument();
    // and the raw value is NOT shown
    expect(screen.queryByText('done')).not.toBeInTheDocument();
  });
});
