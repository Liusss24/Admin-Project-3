import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type {
  AnimalFormErrors,
  AnimalFormValues,
} from './animal-registration.types';

export function validateAnimalRegistration(
  values: AnimalFormValues,
  messages: MessagesTranslations,
): AnimalFormErrors {
  return {
    name: values.name.trim() ? undefined : messages.validation.required,
    identifier: values.identifier.trim()
      ? undefined
      : messages.validation.required,
    category: values.category ? undefined : messages.validation.required,
    species: values.species.trim() ? undefined : messages.validation.required,
    birthDate: undefined,
    notes: undefined,
  };
}
