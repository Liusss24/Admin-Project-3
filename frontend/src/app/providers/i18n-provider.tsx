'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { defaultLanguage, type Language } from '@/i18n/config';
import { translations } from '@/i18n/translations';
import type { AppTranslations } from '@/i18n/types';
import { readStorage, writeStorage } from '@/shared/lib/storage/browser-storage';
import { storageKey } from '@/shared/constants/storage-keys.constants';

interface I18nContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
  t: AppTranslations;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(defaultLanguage);

  // Server renders with defaultLanguage to avoid an SSR mismatch; the stored
  // preference is read only after mount. Hydrating from localStorage in an
  // effect is the documented exception to the set-state-in-effect rule.
  useEffect(() => {
    const stored = readStorage(storageKey.LANGUAGE) as Language | null;
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentLanguage((previous) => (stored === previous ? previous : stored));
    }
  }, []);

  function setLanguage(next: Language): void {
    setCurrentLanguage(next);
    writeStorage(storageKey.LANGUAGE, next);
  }

  const value: I18nContextValue = {
    language: currentLanguage,
    setLanguage,
    t: translations[currentLanguage],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
