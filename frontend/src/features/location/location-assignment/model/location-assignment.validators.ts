import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type {
  LocationAssignmentFormErrors,
  LocationAssignmentFormValues,
} from './location-assignment.types';

export function validateLocationAssignment(
  values: LocationAssignmentFormValues,
  messages: MessagesTranslations,
): LocationAssignmentFormErrors {
  return {
    farm: values.farm ? undefined : messages.validation.required,
    lot: values.lot.trim() ? undefined : messages.validation.required,
    assignedAt: values.assignedAt ? undefined : messages.validation.required,
  };
}
