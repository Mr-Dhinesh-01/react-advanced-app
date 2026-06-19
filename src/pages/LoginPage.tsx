// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/dashboard';

  const [email, setEmail] = useState('sarah.johnson@company.com');
  const [password, setPassword] = useState('react123');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    }
  }

  const field = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    marginBottom: '10px',
  };
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
        Log in
      </h1>
      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={field}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={field}
        />
        {error && (
          <div
            style={{
              background: '#fef2f2',
              borderLeft: '3px solid #dc2626',
              borderRadius: '0 8px 8px 0',
              padding: '10px 12px',
              fontSize: '13px',
              color: '#991b1b',
              marginBottom: '10px',
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#61dafb',
            color: '#0f172a',
            border: 'none',
            borderRadius: '8px',
            padding: '11px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
