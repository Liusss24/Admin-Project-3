import { createHealthEvent } from '@/entities/health/model/health.repository';
import { healthEventType, type HealthEventType } from '@/entities/health/model/health.types';
import { healthEventSubmitOutcome } from './health-event-registration.constants';
import type { HealthEventFormValues } from './health-event-registration.types';

const VALID_TYPES: HealthEventType[] = [
  healthEventType.VACUNACION,
  healthEventType.DESPARASITACION,
  healthEventType.REVISION,
  healthEventType.OTRO,
];

function toEventType(value: string): HealthEventType {
  return VALID_TYPES.includes(value as HealthEventType)
    ? (value as HealthEventType)
    : healthEventType.OTRO;
}

export type HealthEventRegistrationResult =
  | { kind: typeof healthEventSubmitOutcome.SUCCESS }
  | { kind: typeof healthEventSubmitOutcome.UNKNOWN_ERROR };

export async function submitHealthEventRegistration(
  animalId: number,
  values: HealthEventFormValues,
): Promise<HealthEventRegistrationResult> {
  try {
    await createHealthEvent({
      animal: animalId,
      eventType: toEventType(values.eventType),
      date: values.date,
      description: values.description.trim(),
    });
    return { kind: healthEventSubmitOutcome.SUCCESS };
  } catch {
    return { kind: healthEventSubmitOutcome.UNKNOWN_ERROR };
  }
}
