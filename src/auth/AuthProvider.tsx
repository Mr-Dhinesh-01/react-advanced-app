// src/auth/AuthProvider.tsx — holds the user, re-hydrates on load
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext, type AuthUser } from './authContext';

const API = 'http://localhost:3000';

// In a real app this would call /refresh using an httpOnly cookie.
// For learning, we re-check a remembered user id against the API.
async function restoreSession(): Promise<AuthUser | null> {
  const rememberedId = sessionStore.get(); // see note below
  if (!rememberedId) return null;
  try {
    const res = await axios.get<AuthUser>(`${API}/users/${rememberedId}`);
    return { id: res.data.id, name: res.data.name, email: res.data.email };
  } catch {
    return null;
  }
}

// tiny in-memory session marker (swap for a cookie/refresh flow in prod)
const sessionStore = {
  _id: null as number | null,
  set(id: number | null) { this._id = id; },
  get() { return this._id; },
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  // on first load, try to restore a session, then mark ready
  useEffect(() => {
    restoreSession().then((restored) => {
      setUser(restored);
      setReady(true);
    });
  }, []);

  async function login(email: string, password: string) {
    const res = await axios.get<(AuthUser & { password: string })[]>(`${API}/users`, { params: { email } });
    const u = res.data[0];
    if (!u || u.password !== password) throw new Error('Invalid email or password.');
    const safe = { id: u.id, name: u.name, email: u.email };
    sessionStore.set(u.id);   // remember for re-hydration
    setUser(safe);
  }

  function logout() {
    sessionStore.set(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}