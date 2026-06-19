// src/lib/apiClient.ts — FULL FILE (replace entirely)
import axios from 'axios';

let accessToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}
export function setOnUnauthorized(fn: () => void) {
  onUnauthorized = fn;
}

// Read the API URL from an environment variable.
// In production (Netlify/Vercel): VITE_API_URL is set to your hosted API.
// In local development: it falls back to http://localhost:3000 so nothing breaks.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({ baseURL: API_URL });

// attach the token on every request
apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// react to a 401 (expired/invalid token)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      accessToken = null;
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);
