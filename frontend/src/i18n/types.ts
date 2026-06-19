import type { CommonTranslations } from './locales/es/common';
import type { MessagesTranslations } from './locales/es/messages';
import type { AnimalsTranslations } from './locales/es/animals';
import type { AuthTranslations } from './locales/es/auth';
import type { HealthTranslations } from './locales/es/health';
import type { FeedingTranslations } from './locales/es/feeding';
import type { LocationTranslations } from './locales/es/location';

export interface AppTranslations {
  common: CommonTranslations;
  messages: MessagesTranslations;
  animals: AnimalsTranslations;
  auth: AuthTranslations;
  health: HealthTranslations;
  feeding: FeedingTranslations;
  location: LocationTranslations;
}
