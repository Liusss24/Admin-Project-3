import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type { HealthEventFormErrors, HealthEventFormValues } from './health-event-registration.types';

export function validateHealthEventRegistration(
  values: HealthEventFormValues,
  messages: MessagesTranslations,
): HealthEventFormErrors {
  return {
    eventType: values.eventType ? undefined : messages.validation.required,
    date: values.date ? undefined : messages.validation.required,
    description: values.description.trim() ? undefined : messages.validation.required,
  };
}
