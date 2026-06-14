'use client';

import { useCallback, useEffect, useState } from 'react';
import type { HealthEvent } from '@/entities/health/model/health.types';
import { healthListStatus, healthLoadOutcome, type HealthListStatus } from '../model/health-event-list.constants';
import { loadHealthEvents } from '../model/health-event-list-load';

export function useHealthEventList(animalId: number) {
  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [status, setStatus] = useState<HealthListStatus>(healthListStatus.LOADING);

  const reload = useCallback(async () => {
    setStatus(healthListStatus.LOADING);
    const result = await loadHealthEvents(animalId);
    if (result.kind === healthLoadOutcome.SUCCESS) {
      setEvents(result.events);
      setStatus(healthListStatus.READY);
    } else {
      setStatus(healthListStatus.ERROR);
    }
  }, [animalId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { events, status, reload };
}
