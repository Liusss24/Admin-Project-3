'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import {
  healthEventField,
  healthEventSubmitOutcome,
  type HealthEventField,
} from '../model/health-event-registration.constants';
import { validateHealthEventRegistration } from '../model/health-event-registration.validators';
import {
  submitHealthEventRegistration,
  type HealthEventRegistrationResult,
} from '../model/health-event-registration-submit';
import type {
  HealthEventFormErrors,
  HealthEventFormValues,
} from '../model/health-event-registration.types';

interface UseHealthEventRegistrationFormOptions {
  animalId: number;
  onSuccess: () => void;
}

const INITIAL_VALUES: HealthEventFormValues = {
  eventType: '',
  date: '',
  description: '',
};

const INITIAL_ERRORS: HealthEventFormErrors = {
  eventType: undefined,
  date: undefined,
  description: undefined,
};

export function useHealthEventRegistrationForm({
  animalId,
  onSuccess,
}: UseHealthEventRegistrationFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<HealthEventFormValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<HealthEventFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: HealthEventField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (formError) setFormError(null);
  }

  function applyResult(result: HealthEventRegistrationResult) {
    if (result.kind === healthEventSubmitOutcome.SUCCESS) {
      setValues(INITIAL_VALUES);
      setErrors(INITIAL_ERRORS);
      onSuccess();
    } else {
      setFormError(t.messages.errors.unknown);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateHealthEventRegistration(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitHealthEventRegistration(animalId, values);
    setIsSubmitting(false);
    applyResult(result);
  }

  // Expose field key constant so the form can reference it without importing separately
  return {
    values,
    errors,
    isSubmitting,
    formError,
    handleChange,
    handleSubmit,
    field: healthEventField,
  };
}
