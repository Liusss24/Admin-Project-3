'use client';

import { useCallback, useEffect, useState } from 'react';
import type { FeedingRecord } from '@/entities/feeding/model/feeding.types';
import { feedingListStatus, feedingLoadOutcome, type FeedingListStatus } from '../model/feeding-record-list.constants';
import { loadFeedingRecords } from '../model/feeding-record-list-load';

export function useFeedingRecordList(animalId: number) {
  const [records, setRecords] = useState<FeedingRecord[]>([]);
  const [status, setStatus] = useState<FeedingListStatus>(feedingListStatus.LOADING);

  const reload = useCallback(async () => {
    setStatus(feedingListStatus.LOADING);
    const result = await loadFeedingRecords(animalId);
    if (result.kind === feedingLoadOutcome.SUCCESS) {
      setRecords(result.records);
      setStatus(feedingListStatus.READY);
    } else {
      setStatus(feedingListStatus.ERROR);
    }
  }, [animalId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { records, status, reload };
}
