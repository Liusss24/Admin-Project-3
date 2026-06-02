import { readStorage, writeStorage, removeStorage } from '@/shared/lib/storage/browser-storage';
import { storageKey } from '@/shared/constants/storage-keys.constants';
import type { SessionData } from './session.types';

const EMPTY_SESSION: SessionData = { accessToken: null, refreshToken: null };

let snapshot: SessionData = EMPTY_SESSION;
let hydrated = false;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function hydrateFromStorage(): void {
  if (hydrated) {
    return;
  }
  hydrated = true;
  const accessToken = readStorage(storageKey.ACCESS_TOKEN);
  const refreshToken = readStorage(storageKey.REFRESH_TOKEN);
  if (accessToken || refreshToken) {
    snapshot = { accessToken, refreshToken };
    emit();
  }
}

export function getSessionSnapshot(): SessionData {
  return snapshot;
}

export function getServerSessionSnapshot(): SessionData {
  return EMPTY_SESSION;
}

export function subscribeSession(listener: () => void): () => void {
  hydrateFromStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setSession(next: SessionData): void {
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
  snapshot = EMPTY_SESSION;
  removeStorage(storageKey.ACCESS_TOKEN);
  removeStorage(storageKey.REFRESH_TOKEN);
  emit();
}
