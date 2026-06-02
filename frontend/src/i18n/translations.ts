import { language, type Language } from './config';
import { esCommon } from './locales/es/common';
import { enCommon } from './locales/en/common';
import type { AppTranslations } from './types';

export const translations: Record<Language, AppTranslations> = {
  [language.ES]: { common: esCommon },
  [language.EN]: { common: enCommon },
};
