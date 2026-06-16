// src/hoc/withAuth.tsx
import type { ComponentType } from 'react';
// the real Chapter 24 auth context:
import { useAuth } from '../auth/authContext';

export function withAuth<P extends object>(Wrapped: ComponentType<P>) {
  function WithAuth(props: P) {
    const { user } = useAuth();

    // not signed in → show a prompt instead of the component
    if (!user) {
      return (
        <div style={{ background: '#fef2f2', border: '1px solid #dc2626', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#991b1b' }}>Please sign in to view this.</p>
        </div>
      );
    }

    // signed in → render the real component with its props
    return <Wrapped {...props} />;
  }
  WithAuth.displayName = `withAuth(${Wrapped.displayName ?? Wrapped.name})`;
  return WithAuth;
}