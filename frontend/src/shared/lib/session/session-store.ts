import { readStorage, writeStorage, removeStorage } from '@/shared/lib/storage/browser-storage';
import { storageKey } from '@/shared/constants/storage-keys.constants';
import type { SessionData } from './session.types';

const EMPTY_SESSION: SessionData = { accessToken: null, refreshToken: null };

let snapshot: SessionData = EMPTY_SESSION;
let hasHydrated = false;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function hydrateFromStorage(): void {
  if (hasHydrated) {
    return;
  }
  hasHydrated = true;
  const accessToken = readStorage(storageKey.ACCESS_TOKEN);
  const refreshToken = readStorage(storageKey.REFRESH_TOKEN);
  if (accessToken || refreshToken) {
    snapshot = { accessToken, refreshToken };
  }
  // Always emit so `isHydrated` subscribers re-render once hydration completes.
  emit();
}

export function getSessionSnapshot(): SessionData {
  return snapshot;
}

export function getServerSessionSnapshot(): SessionData {
  return EMPTY_SESSION;
}

export function getHydratedSnapshot(): boolean {
  return hasHydrated;
}

export function getServerHydratedSnapshot(): boolean {
  return false;
}

export function subscribeSession(listener: () => void): () => void {
  hydrateFromStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setSession(next: SessionData): void {
  hasHydrated = true;
  snapshot = next;
  if (next.accessToken) {
    writeStorage(storageKey.ACCESS_TOKEN, next.accessToken);
  } else {
    removeStorage(storageKey.ACCESS_TOKEN);
  }
  if (next.refreshToken) {
    writeStorage(storageKey.REFRESH_TOKEN, next.refreshToken);
  } else {
    removeStorage(storageKey.REFRESH_TOKEN);
  }
  emit();
}

export function clearSession(): void {
  hasHydrated = true;
  snapshot = EMPTY_SESSION;
  removeStorage(storageKey.ACCESS_TOKEN);
  removeStorage(storageKey.REFRESH_TOKEN);
  emit();
}
