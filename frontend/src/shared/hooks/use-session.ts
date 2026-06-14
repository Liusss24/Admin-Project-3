'use client';

import { useSyncExternalStore } from 'react';
import {
  getHydratedSnapshot,
  getServerHydratedSnapshot,
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
  const isHydrated = useSyncExternalStore(
    subscribeSession,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  return {
    session,
    isHydrated,
    isAuthenticated: Boolean(session.accessToken),
  };
}
