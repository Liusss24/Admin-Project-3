import type { CommonTranslations } from './locales/es/common';
import type { MessagesTranslations } from './locales/es/messages';
import type { AnimalsTranslations } from './locales/es/animals';
import type { AuthTranslations } from './locales/es/auth';

export interface AppTranslations {
  common: CommonTranslations;
  messages: MessagesTranslations;
  animals: AnimalsTranslations;
  auth: AuthTranslations;
}
