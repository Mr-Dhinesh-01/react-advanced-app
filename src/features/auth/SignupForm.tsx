// src/features/auth/SignupForm.tsx
import { useState } from 'react';
import { signup, type AuthUser } from './authService';

interface Values { name: string; email: string; password: string; confirm: string; }
const field = { width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as const, marginBottom: '10px' };

export default function SignupForm({ onAuthed }: { onAuthed: (u: AuthUser) => void }) {
  const [v, setV] = useState<Values>({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!v.name.trim()) { setError('Name is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) { setError('Enter a valid email.'); return; }
    if (v.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (v.password !== v.confirm) { setError('Passwords do not match.'); return; }
    setError(''); setLoading(true);
    try {
     const result = await signup(v.name, v.email, v.password);
     onAuthed(result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={v.name} onChange={change} placeholder="Full name" style={field} />
      <input name="email" type="email" value={v.email} onChange={change} placeholder="you@example.com" style={field} />
      <input name="password" type="password" value={v.password} onChange={change} placeholder="Password" style={field} />
      <input name="confirm" type="password" value={v.confirm} onChange={change} placeholder="Confirm password" style={field} />
      {error && <div style={{ background: '#fef2f2', borderLeft: '3px solid #dc2626', borderRadius: '0 8px 8px 0', padding: '10px 12px', fontSize: '13px', color: '#991b1b', marginBottom: '10px' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#94a3b8' : '#61dafb', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Creating account…' : 'Sign up'}</button>
    </form>
  );
}