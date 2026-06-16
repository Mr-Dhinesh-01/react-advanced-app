// src/components/task-form/TaskForm.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from '../../features/tasks';

describe('TaskForm', () => {
  test('renders the input and submit button', () => {
    render(<TaskForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('Task title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add task' })).toBeInTheDocument();
  });

  test('shows an error and does not submit when empty', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }));
    // the error appears...
    expect(screen.getByRole('alert')).toHaveTextContent('Title is required');
    // ...and the callback was never called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('updates the input as the user types', () => {
    render(<TaskForm onSubmit={() => {}} />);
    const input = screen.getByLabelText('Task title');
    fireEvent.change(input, { target: { value: 'Write tests' } });
    expect(input).toHaveValue('Write tests');
  });

  test('submits the trimmed title for a valid entry', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Task title'), {
      target: { value: '  Write tests  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }));
    // called once, with the trimmed value
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('Write tests');
  });
});