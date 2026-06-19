import { createFarm } from '@/entities/location/model/location.repository';
import type { Farm } from '@/entities/location/model/location.types';
import { HttpError } from '@/shared/api/http-client';
import { farmRegistrationOutcome } from './farm-registration.constants';
import type { FarmFormErrors, FarmFormValues } from './farm-registration.types';

const HTTP_BAD_REQUEST = 400;

export type FarmRegistrationResult =
  | { kind: typeof farmRegistrationOutcome.SUCCESS; farm: Farm }
  | {
      kind: typeof farmRegistrationOutcome.VALIDATION_ERROR;
      errors: FarmFormErrors;
    }
  | { kind: typeof farmRegistrationOutcome.UNKNOWN_ERROR };

function emptyErrors(): FarmFormErrors {
  return { name: undefined, description: undefined };
}

export async function submitFarmRegistration(
  values: FarmFormValues,
): Promise<FarmRegistrationResult> {
  try {
    const farm = await createFarm({
      name: values.name.trim(),
      description: values.description.trim(),
    });
    return { kind: farmRegistrationOutcome.SUCCESS, farm };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_BAD_REQUEST) {
      return {
        kind: farmRegistrationOutcome.VALIDATION_ERROR,
        errors: emptyErrors(),
      };
    }
    return { kind: farmRegistrationOutcome.UNKNOWN_ERROR };
  }
}
