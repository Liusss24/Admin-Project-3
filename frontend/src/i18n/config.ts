export const language = {
  ES: 'es',
  EN: 'en',
} as const;

export type Language = (typeof language)[keyof typeof language];

export const defaultLanguage: Language = language.ES;

export const availableLanguages: Language[] = [language.ES, language.EN];
