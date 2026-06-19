// src/components/dnd/Draggable.tsx
import { useDraggable } from '@dnd-kit/core';
import type { ReactNode } from 'react';

export function Draggable({ id, children }: { id: string; children: ReactNode }) {
  const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({ id });

  // turn dnd-kit's transform into a CSS translate (safe: derived from the hook)
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 700,
    color: '#0f172a',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
