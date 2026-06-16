// src/features/auth/LoginForm.tsx
import { useState } from 'react';
import { login, type AuthUser } from './authService';

const field = { width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as const, marginBottom: '10px' };

export default function LoginForm({ onAuthed }: { onAuthed: (u: AuthUser) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError(''); setLoading(true);
    try {
     const result = await login(email, password);
     onAuthed(result.user);;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={field} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={field} />
      {error && <div style={{ background: '#fef2f2', borderLeft: '3px solid #dc2626', borderRadius: '0 8px 8px 0', padding: '10px 12px', fontSize: '13px', color: '#991b1b', marginBottom: '10px' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#94a3b8' : '#61dafb', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}