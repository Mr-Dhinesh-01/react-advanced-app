// src/auth/authContext.ts — the context + a typed hook
import { createContext, useContext } from 'react';

export interface AuthUser { id: number; name: string; email: string; }

export interface AuthValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  ready: boolean; // false until we've checked for an existing session
}

export const AuthContext = createContext<AuthValue | null>(null);

// a small hook so components don't repeat the null check
export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}