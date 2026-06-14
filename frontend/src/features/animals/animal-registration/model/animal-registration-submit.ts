import { createAnimal } from '@/entities/animal/model/animal.repository';
import {
  animalCategory,
  type AnimalCategory,
} from '@/entities/animal/model/animal.types';
import { HttpError } from '@/shared/api/http-client';
import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import { animalField, submitOutcome } from './animal-registration.constants';
import type {
  AnimalFormErrors,
  AnimalFormValues,
} from './animal-registration.types';

const HTTP_BAD_REQUEST = 400;

export type AnimalRegistrationResult =
  | { kind: typeof submitOutcome.SUCCESS }
  | { kind: typeof submitOutcome.VALIDATION_ERROR; errors: AnimalFormErrors }
  | { kind: typeof submitOutcome.UNKNOWN_ERROR };

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
  messages: MessagesTranslations,
): AnimalFormErrors {
  const errors = emptyErrors();
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if (animalField.identifier in record) {
      errors.identifier = messages.validation.identifierTaken;
    }
  }
  return errors;
}

export async function submitAnimalRegistration(
  values: AnimalFormValues,
  messages: MessagesTranslations,
): Promise<AnimalRegistrationResult> {
  try {
    await createAnimal({
      name: values.name.trim(),
      identifier: values.identifier.trim(),
      category: toCategory(values.category),
      species: values.species.trim(),
      birthDate: values.birthDate ? values.birthDate : null,
      notes: values.notes.trim(),
    });
    return { kind: submitOutcome.SUCCESS };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_BAD_REQUEST) {
      return {
        kind: submitOutcome.VALIDATION_ERROR,
        errors: mapBackendErrors(error.payload, messages),
      };
    }
    return { kind: submitOutcome.UNKNOWN_ERROR };
  }
}
