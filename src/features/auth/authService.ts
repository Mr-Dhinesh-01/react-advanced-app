// src/features/auth/authService.ts
// apiClient + token moved to shared/api in Chapter 28
import { apiClient } from '@/shared/api/apiClient';
import { createMockToken } from '@/shared/api/token';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}
interface StoredUser extends AuthUser {
  password: string;
  role?: string;
  city?: string;
}

export interface LoginResult {
  user: AuthUser;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const res = await apiClient.get<StoredUser[]>('/users', { params: { email } });
  const u = res.data[0];
  if (!u || u.password !== password) {
    throw new Error('Invalid email or password.');
  }
  const token = createMockToken(u.id, u.name, 60);
  return { user: { id: u.id, name: u.name, email: u.email }, token };
}

// NEW — signup, matching your createMockToken(id, name, seconds) + /users API
export async function signup(name: string, email: string, password: string): Promise<LoginResult> {
  const existing = await apiClient.get<StoredUser[]>('/users', { params: { email } });
  if (existing.data.length > 0) {
    throw new Error('An account with this email already exists.');
  }
  const res = await apiClient.post<StoredUser>('/users', { name, email, password });
  const u = res.data;
  const token = createMockToken(u.id, u.name, 60);
  return { user: { id: u.id, name: u.name, email: u.email }, token };
}
