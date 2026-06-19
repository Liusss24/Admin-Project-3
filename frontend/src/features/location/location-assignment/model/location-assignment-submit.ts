import { assignLocation } from '@/entities/location/model/location.repository';
import { HttpError } from '@/shared/api/http-client';
import { locationAssignmentOutcome } from './location-assignment.constants';
import type {
  LocationAssignmentFormErrors,
  LocationAssignmentFormValues,
} from './location-assignment.types';

const HTTP_BAD_REQUEST = 400;

export type LocationAssignmentResult =
  | { kind: typeof locationAssignmentOutcome.SUCCESS }
  | {
      kind: typeof locationAssignmentOutcome.VALIDATION_ERROR;
      errors: LocationAssignmentFormErrors;
    }
  | { kind: typeof locationAssignmentOutcome.UNKNOWN_ERROR };

function emptyErrors(): LocationAssignmentFormErrors {
  return { farm: undefined, lot: undefined, assignedAt: undefined };
}

export async function submitLocationAssignment(
  animalId: number,
  values: LocationAssignmentFormValues,
): Promise<LocationAssignmentResult> {
  try {
    await assignLocation({
      animal: animalId,
      farm: Number(values.farm),
      lot: values.lot.trim(),
      assignedAt: values.assignedAt,
    });
    return { kind: locationAssignmentOutcome.SUCCESS };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_BAD_REQUEST) {
      return {
        kind: locationAssignmentOutcome.VALIDATION_ERROR,
        errors: emptyErrors(),
      };
    }
    return { kind: locationAssignmentOutcome.UNKNOWN_ERROR };
  }
}
