import { fetchFeedingRecords } from '@/entities/feeding/model/feeding.repository';
import type { FeedingRecord } from '@/entities/feeding/model/feeding.types';
import { feedingLoadOutcome } from './feeding-record-list.constants';

export type FeedingRecordListResult =
  | { kind: typeof feedingLoadOutcome.SUCCESS; records: FeedingRecord[] }
  | { kind: typeof feedingLoadOutcome.ERROR };

export async function loadFeedingRecords(animalId: number): Promise<FeedingRecordListResult> {
  try {
    const records = await fetchFeedingRecords(animalId);
    return { kind: feedingLoadOutcome.SUCCESS, records };
  } catch {
    return { kind: feedingLoadOutcome.ERROR };
  }
}
