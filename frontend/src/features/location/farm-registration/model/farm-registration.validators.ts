import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type { FarmFormErrors, FarmFormValues } from './farm-registration.types';

export function validateFarmRegistration(
  values: FarmFormValues,
  messages: MessagesTranslations,
): FarmFormErrors {
  return {
    name: values.name.trim() ? undefined : messages.validation.required,
    description: undefined,
  };
}
