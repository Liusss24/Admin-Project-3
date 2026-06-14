import { httpRequest, httpMethod } from '@/shared/api/http-client';
import { apiRoute } from '@/shared/api/api-routes';
import type { FeedingRecord, FeedingRecordDraft } from './feeding.types';

interface FeedingRecordDto {
  id: number;
  animal: number;
  animal_name: string;
  date: string;
  food_type: string;
  quantity: string;
  notes: string;
  created_at: string;
}

interface PaginatedDto<T> {
  count: number;
  results: T[];
}

function toFeedingRecord(dto: FeedingRecordDto): FeedingRecord {
  return {
    id: dto.id,
    animal: dto.animal,
    animalName: dto.animal_name,
    date: dto.date,
    foodType: dto.food_type,
    quantity: dto.quantity,
    notes: dto.notes,
    createdAt: dto.created_at,
  };
}

export async function fetchFeedingRecords(animalId: number): Promise<FeedingRecord[]> {
  const data = await httpRequest<PaginatedDto<FeedingRecordDto>>(
    `${apiRoute.feeding}?animal=${animalId}`,
  );
  return data.results.map(toFeedingRecord);
}

export async function createFeedingRecord(draft: FeedingRecordDraft): Promise<FeedingRecord> {
  const dto = await httpRequest<FeedingRecordDto>(apiRoute.feeding, {
    method: httpMethod.POST,
    body: {
      animal: draft.animal,
      date: draft.date,
      food_type: draft.foodType,
      quantity: draft.quantity,
      notes: draft.notes,
    },
  });
  return toFeedingRecord(dto);
}

export async function deleteFeedingRecord(id: number): Promise<void> {
  await httpRequest<null>(apiRoute.feedingRecord(id), { method: httpMethod.DELETE });
}
