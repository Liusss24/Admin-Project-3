import type { MessagesTranslations } from '@/i18n/locales/es/messages';
import type { LoginErrors, LoginValues } from './login.types';

export function validateLogin(
  values: LoginValues,
  messages: MessagesTranslations,
): LoginErrors {
  return {
    username: values.username.trim() ? undefined : messages.validation.required,
    password: values.password ? undefined : messages.validation.required,
  };
}
