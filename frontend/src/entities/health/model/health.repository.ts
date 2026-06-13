import { httpRequest, httpMethod } from '@/shared/api/http-client';
import { apiRoute } from '@/shared/api/api-routes';
import type { HealthEvent, HealthEventDraft, HealthEventType } from './health.types';

interface HealthEventDto {
  id: number;
  animal: number;
  animal_name: string;
  event_type: string;
  event_type_display: string;
  date: string;
  description: string;
  created_at: string;
}

interface PaginatedDto<T> {
  count: number;
  results: T[];
}

function toHealthEvent(dto: HealthEventDto): HealthEvent {
  return {
    id: dto.id,
    animal: dto.animal,
    animalName: dto.animal_name,
    eventType: dto.event_type as HealthEventType,
    eventTypeDisplay: dto.event_type_display,
    date: dto.date,
    description: dto.description,
    createdAt: dto.created_at,
  };
}

export async function fetchHealthEvents(animalId: number): Promise<HealthEvent[]> {
  const data = await httpRequest<PaginatedDto<HealthEventDto>>(
    `${apiRoute.health}?animal=${animalId}`,
  );
  return data.results.map(toHealthEvent);
}

export async function createHealthEvent(draft: HealthEventDraft): Promise<HealthEvent> {
  const dto = await httpRequest<HealthEventDto>(apiRoute.health, {
    method: httpMethod.POST,
    body: {
      animal: draft.animal,
      event_type: draft.eventType,
      date: draft.date,
      description: draft.description,
    },
  });
  return toHealthEvent(dto);
}

export async function deleteHealthEvent(id: number): Promise<void> {
  await httpRequest<null>(apiRoute.healthEvent(id), { method: httpMethod.DELETE });
}
