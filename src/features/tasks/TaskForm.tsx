// src/components/task-form/TaskForm.tsx
import { useState } from 'react';

export function TaskForm({ onSubmit }: { onSubmit: (title: string) => void }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') {
      setError('Title is required');   // block + show error
      return;
    }
    setError(null);
    onSubmit(trimmed);                 // notify parent with clean value
    setTitle('');                      // clear the field
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task title</label>
      <input
        id="title"
        value={title}
        placeholder="New task"
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p role="alert" style={{ color: '#dc2626' }}>{error}</p>}
      <button type="submit">Add task</button>
    </form>
  );
}