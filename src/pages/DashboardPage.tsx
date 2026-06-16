// src/pages/DashboardPage.tsx
import { useAuth } from '../auth/authContext';

export function DashboardPage() {
  const { user, logout } = useAuth();
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
      <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Dashboard</p>
      <p style={{ margin: '8px 0 16px', fontSize: '14px', color: '#475569' }}>Signed in as {user?.name} ({user?.email})</p>
      <button onClick={logout} style={{ background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Sign out</button>
    </div>
  );
}