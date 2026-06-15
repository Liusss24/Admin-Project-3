'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchFarms } from '../model/location.repository';
import type { Farm } from '../model/location.types';

export type FarmListStatus = 'loading' | 'ready' | 'error';

export function useFarmList() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [status, setStatus] = useState<FarmListStatus>('loading');

  const reload = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchFarms();
      setFarms(data);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { farms, status, reload };
}
