'use client';

import { useCallback, useState } from 'react';

export function useFieldErrors<T extends Record<string, string | undefined>>(
  initial: T,
) {
  const [errors, setErrors] = useState<T>(initial);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrors((previous) => ({ ...previous, [field]: undefined }) as T);
  }, []);

  return { errors, setErrors, clearFieldError };
}
