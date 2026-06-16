// src/routes/PrivateRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../auth/authContext';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  // still checking for a saved session → don't decide yet
  if (!ready) return <p style={{ padding: '32px', color: '#94a3b8' }}>Loading…</p>;

  // no user → redirect, remembering where they wanted to go
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}