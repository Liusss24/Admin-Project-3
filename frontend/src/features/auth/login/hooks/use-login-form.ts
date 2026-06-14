'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import { submitOutcome, type LoginField } from '../model/login.constants';
import { validateLogin } from '../model/login.validators';
import { submitLogin, type LoginResult } from '../model/login-submit';
import type { LoginErrors, LoginValues } from '../model/login.types';

interface UseLoginFormOptions {
  onSuccess: () => void;
}

const INITIAL_VALUES: LoginValues = { username: '', password: '' };
const INITIAL_ERRORS: LoginErrors = { username: undefined, password: undefined };

export function useLoginForm({ onSuccess }: UseLoginFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<LoginValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<LoginErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: LoginField, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    clearFieldError(field);
    if (formError) {
      setFormError(null);
    }
  }

  function applyResult(result: LoginResult) {
    switch (result.kind) {
      case submitOutcome.SUCCESS:
        onSuccess();
        return;
      case submitOutcome.INVALID_CREDENTIALS:
        setFormError(t.messages.errors.invalidCredentials);
        return;
      default:
        setFormError(t.messages.errors.unknown);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitLogin(values);
    setIsSubmitting(false);
    applyResult(result);
  }

  return { values, errors, isSubmitting, formError, handleChange, handleSubmit };
}
