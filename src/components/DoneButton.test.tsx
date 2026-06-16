// src/components/DoneButton.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';

// a tiny component: a button that marks a task done and reports it
function DoneButton({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <button onClick={() => { setDone(true); onDone(); }}>
      {done ? 'Done' : 'Mark done'}
    </button>
  );
}

describe('DoneButton', () => {
  test('updates its label when clicked', () => {
    render(<DoneButton onDone={() => {}} />);
    const button = screen.getByRole('button', { name: 'Mark done' });
    fireEvent.click(button);
    // the label changed from "Mark done" to "Done"
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  test('calls onDone exactly once', () => {
    const onDone = vi.fn();
    render(<DoneButton onDone={onDone} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mark done' }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});