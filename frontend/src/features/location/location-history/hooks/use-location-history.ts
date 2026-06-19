'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AnimalLocation } from '@/entities/location/model/location.types';
import {
  locationHistoryStatus,
  locationHistoryOutcome,
  type LocationHistoryStatus,
} from '../model/location-history.constants';
import { loadLocationHistory } from '../model/location-history-load';

export function useLocationHistory(animalId: number) {
  const [locations, setLocations] = useState<AnimalLocation[]>([]);
  const [status, setStatus] = useState<LocationHistoryStatus>(locationHistoryStatus.LOADING);

  const reload = useCallback(async () => {
    setStatus(locationHistoryStatus.LOADING);
    const result = await loadLocationHistory(animalId);
    if (result.kind === locationHistoryOutcome.SUCCESS) {
      setLocations(result.locations);
      setStatus(locationHistoryStatus.READY);
    } else {
      setStatus(locationHistoryStatus.ERROR);
    }
  }, [animalId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { locations, status, reload };
}
