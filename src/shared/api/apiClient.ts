// src/lib/apiClient.ts
import axios from 'axios';

let accessToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setAccessToken(token: string | null) { accessToken = token; }
export function setOnUnauthorized(fn: () => void) { onUnauthorized = fn; }

export const apiClient = axios.create({ baseURL: 'http://localhost:3000' });

// attach the token on the way out
apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// react to a rejected token on the way back
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      accessToken = null;        // drop the bad token
      onUnauthorized?.();        // tell the app to sign out
    }
    return Promise.reject(error);
  },
);