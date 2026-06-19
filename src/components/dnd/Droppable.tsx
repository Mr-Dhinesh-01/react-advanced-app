// src/components/dnd/Droppable.tsx
import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';

export function Droppable({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: '120px',
        borderRadius: '16px',
        border: isOver ? '2px solid #61dafb' : '2px dashed #94a3b8',
        background: isOver ? '#eff6ff' : '#f8fafc',
        padding: '12px',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>
        {label}
      </p>
      {children}
    </div>
  );
}
