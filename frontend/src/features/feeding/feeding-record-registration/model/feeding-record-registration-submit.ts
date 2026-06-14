import { createFeedingRecord } from '@/entities/feeding/model/feeding.repository';
import { feedingRecordSubmitOutcome } from './feeding-record-registration.constants';
import type { FeedingRecordFormValues } from './feeding-record-registration.types';

export type FeedingRecordRegistrationResult =
  | { kind: typeof feedingRecordSubmitOutcome.SUCCESS }
  | { kind: typeof feedingRecordSubmitOutcome.UNKNOWN_ERROR };

export async function submitFeedingRecordRegistration(
  animalId: number,
  values: FeedingRecordFormValues,
): Promise<FeedingRecordRegistrationResult> {
  try {
    await createFeedingRecord({
      animal: animalId,
      date: values.date,
      foodType: values.foodType.trim(),
      quantity: values.quantity.trim(),
      notes: values.notes.trim(),
    });
    return { kind: feedingRecordSubmitOutcome.SUCCESS };
  } catch {
    return { kind: feedingRecordSubmitOutcome.UNKNOWN_ERROR };
  }
}
