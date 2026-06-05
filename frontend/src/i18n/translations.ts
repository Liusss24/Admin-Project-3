import { language, type Language } from './config';
import { esCommon } from './locales/es/common';
import { enCommon } from './locales/en/common';
import { esMessages } from './locales/es/messages';
import { enMessages } from './locales/en/messages';
import { esAnimals } from './locales/es/animals';
import { enAnimals } from './locales/en/animals';
import { esAuth } from './locales/es/auth';
import { enAuth } from './locales/en/auth';
import type { AppTranslations } from './types';

export const translations: Record<Language, AppTranslations> = {
  [language.ES]: {
    common: esCommon,
    messages: esMessages,
    animals: esAnimals,
    auth: esAuth,
  },
  [language.EN]: {
    common: enCommon,
    messages: enMessages,
    animals: enAnimals,
    auth: enAuth,
  },
};
