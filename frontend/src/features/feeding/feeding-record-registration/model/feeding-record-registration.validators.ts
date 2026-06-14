import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type { FeedingRecordFormErrors, FeedingRecordFormValues } from './feeding-record-registration.types';

export function validateFeedingRecordRegistration(
  values: FeedingRecordFormValues,
  messages: MessagesTranslations,
): FeedingRecordFormErrors {
  return {
    date: values.date ? undefined : messages.validation.required,
    foodType: values.foodType.trim() ? undefined : messages.validation.required,
    quantity: undefined,
    notes: undefined,
  };
}
