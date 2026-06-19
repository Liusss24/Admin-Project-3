import { language, type Language } from './config';
import { esCommon } from './locales/es/common';
import { enCommon } from './locales/en/common';
import { esMessages } from './locales/es/messages';
import { enMessages } from './locales/en/messages';
import { esAnimals } from './locales/es/animals';
import { enAnimals } from './locales/en/animals';
import { esAuth } from './locales/es/auth';
import { enAuth } from './locales/en/auth';
import { esHealth } from './locales/es/health';
import { enHealth } from './locales/en/health';
import { esFeeding } from './locales/es/feeding';
import { enFeeding } from './locales/en/feeding';
import { esLocation } from './locales/es/location';
import { enLocation } from './locales/en/location';
import type { AppTranslations } from './types';

export const translations: Record<Language, AppTranslations> = {
  [language.ES]: {
    common: esCommon,
    messages: esMessages,
    animals: esAnimals,
    auth: esAuth,
    health: esHealth,
    feeding: esFeeding,
    location: esLocation,
  },
  [language.EN]: {
    common: enCommon,
    messages: enMessages,
    animals: enAnimals,
    auth: enAuth,
    health: enHealth,
    feeding: enFeeding,
    location: enLocation,
  },
};
