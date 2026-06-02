'use client';

import { useSyncExternalStore } from 'react';
import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  subscribeSession,
} from '@/shared/lib/session/session-store';

export function useSession() {
  const session = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );

  return {
    session,
    isAuthenticated: Boolean(session.accessToken),
  };
}
