// src/App.tsx — import the feature through the alias + barrel
import { TaskDashboard } from '@/features/tasks';

export default function App() {
  return (
    <div style={{ padding: '32px', maxWidth: '560px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Task Dashboard</h1>
      <TaskDashboard />
    </div>
  );
}

// Works because features/tasks/index.ts now re-exports it (Step 5).