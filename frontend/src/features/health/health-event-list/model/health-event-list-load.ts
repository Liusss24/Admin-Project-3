import { fetchHealthEvents } from '@/entities/health/model/health.repository';
import type { HealthEvent } from '@/entities/health/model/health.types';
import { healthLoadOutcome } from './health-event-list.constants';

export type HealthEventListResult =
  | { kind: typeof healthLoadOutcome.SUCCESS; events: HealthEvent[] }
  | { kind: typeof healthLoadOutcome.ERROR };

export async function loadHealthEvents(animalId: number): Promise<HealthEventListResult> {
  try {
    const events = await fetchHealthEvents(animalId);
    return { kind: healthLoadOutcome.SUCCESS, events };
  } catch {
    return { kind: healthLoadOutcome.ERROR };
  }
}
