import { updateAnimal } from '@/entities/animal/model/animal.repository';
import {
  animalCategory,
  type Animal,
  type AnimalCategory,
} from '@/entities/animal/model/animal.types';
import { HttpError } from '@/shared/api/http-client';
import { animalField } from '@/features/animals/animal-registration/model/animal-registration.constants';
import type {
  AnimalFormErrors,
  AnimalFormValues,
} from '@/features/animals/animal-registration/model/animal-registration.types';

const HTTP_BAD_REQUEST = 400;

export const editOutcome = {
  SUCCESS: 'success',
  VALIDATION_ERROR: 'validationError',
  UNKNOWN_ERROR: 'unknownError',
} as const;

export type AnimalEditResult =
  | { kind: typeof editOutcome.SUCCESS; animal: Animal }
  | { kind: typeof editOutcome.VALIDATION_ERROR; errors: AnimalFormErrors }
  | { kind: typeof editOutcome.UNKNOWN_ERROR };

const VALID_CATEGORIES: AnimalCategory[] = [
  animalCategory.TRABAJO,
  animalCategory.PRODUCCION,
  animalCategory.CONSUMO,
];

function toCategory(value: string): AnimalCategory {
  return VALID_CATEGORIES.includes(value as AnimalCategory)
    ? (value as AnimalCategory)
    : animalCategory.TRABAJO;
}

function emptyErrors(): AnimalFormErrors {
  return {
    name: undefined,
    identifier: undefined,
    category: undefined,
    species: undefined,
    birthDate: undefined,
    notes: undefined,
  };
}

function mapBackendErrors(
  payload: unknown,
  identifierTakenMessage: string,
): AnimalFormErrors {
  const errors = emptyErrors();
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if (animalField.identifier in record) {
      errors.identifier = identifierTakenMessage;
    }
  }
  return errors;
}

export async function submitAnimalEdit(
  animalId: number,
  values: AnimalFormValues,
  identifierTakenMessage: string,
): Promise<AnimalEditResult> {
  try {
    const animal = await updateAnimal(animalId, {
      name: values.name.trim(),
      identifier: values.identifier.trim(),
      category: toCategory(values.category),
      species: values.species.trim(),
      birthDate: values.birthDate ? values.birthDate : null,
      notes: values.notes.trim(),
    });
    return { kind: editOutcome.SUCCESS, animal };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_BAD_REQUEST) {
      return {
        kind: editOutcome.VALIDATION_ERROR,
        errors: mapBackendErrors(error.payload, identifierTakenMessage),
      };
    }
    return { kind: editOutcome.UNKNOWN_ERROR };
  }
}
