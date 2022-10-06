import { isClient } from '@/configs';

const SIGNATURE = 'signature';

/**
 * It returns the stored auth token from localStorage if it exists, otherwise it returns null
 * @returns The storedAuth variable is being returned.
 */
export function getStoredAuth(): string | null {
  if (!isClient) return null;

  const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(SIGNATURE) : '';

  return storedAuth ? JSON.parse(storedAuth) : null;
}

export function checkUnauthorized(): string | null {
  const accessToken = getStoredAuth();

  return accessToken;
}

export function setStoredAuth<T = unknown>(auth: T): void {
  if (!isClient) return;

  localStorage.setItem(SIGNATURE, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
  if (!isClient) return;

  localStorage.removeItem(SIGNATURE);
}

// Set localStorage common
export function getLocalStored<T = any>(key: string) {
  if (!isClient) return null;
  const stored = localStorage.getItem(key);

  return stored ? (JSON.parse(stored) as T) : null;
}

export function setLocalStored<T = unknown>(key: string, data: T): void {
  if (!isClient) return;

  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStored(key: string): void {
  if (!isClient) return;

  localStorage.removeItem(key);
}
