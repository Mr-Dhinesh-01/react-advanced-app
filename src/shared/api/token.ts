// src/lib/token.ts — make and read a mock token
export interface TokenPayload { sub: number; name: string; exp: number; }

// build a base64 "header.payload.signature" (mock — server would sign it)
export function createMockToken(sub: number, name: string, secondsValid: number): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + secondsValid;
  const payload = btoa(JSON.stringify({ sub, name, exp }));
  return `${header}.${payload}.mocksignature`;
}

// read the payload back out of any token
export function readPayload(token: string): TokenPayload | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

// is the token past its expiry time?
export function isExpired(token: string): boolean {
  const payload = readPayload(token);
  if (!payload) return true;
  return Date.now() / 1000 > payload.exp;
}