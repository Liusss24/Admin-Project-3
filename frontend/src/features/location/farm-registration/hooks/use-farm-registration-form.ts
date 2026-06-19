'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import { farmRegistrationOutcome, type FarmField } from '../model/farm-registration.constants';
import { validateFarmRegistration } from '../model/farm-registration.validators';
import { submitFarmRegistration } from '../model/farm-registration-submit';
import type { FarmFormErrors, FarmFormValues } from '../model/farm-registration.types';

interface UseFarmRegistrationFormOptions {
  onSuccess: () => void;
}

const INITIAL_VALUES: FarmFormValues = { name: '', description: '' };
const INITIAL_ERRORS: FarmFormErrors = { name: undefined, description: undefined };

export function useFarmRegistrationForm({ onSuccess }: UseFarmRegistrationFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<FarmFormValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<FarmFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: FarmField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (formError) setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFarmRegistration(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitFarmRegistration(values);
    setIsSubmitting(false);
    if (result.kind === farmRegistrationOutcome.SUCCESS) {
      setValues(INITIAL_VALUES);
      setErrors(INITIAL_ERRORS);
      onSuccess();
    } else if (result.kind === farmRegistrationOutcome.VALIDATION_ERROR) {
      setErrors(result.errors);
    } else {
      setFormError(t.messages.errors.unknown);
    }
  }

  return { values, errors, isSubmitting, formError, handleChange, handleSubmit };
}
