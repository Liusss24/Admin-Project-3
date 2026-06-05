'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import {
  submitOutcome,
  type AnimalField,
} from '../model/animal-registration.constants';
import { validateAnimalRegistration } from '../model/animal-registration.validators';
import {
  submitAnimalRegistration,
  type AnimalRegistrationResult,
} from '../model/animal-registration-submit';
import type {
  AnimalFormErrors,
  AnimalFormValues,
} from '../model/animal-registration.types';

interface UseAnimalRegistrationFormOptions {
  onSuccess: () => void;
}

const INITIAL_VALUES: AnimalFormValues = {
  name: '',
  identifier: '',
  category: '',
  species: '',
  birthDate: '',
  notes: '',
};

const INITIAL_ERRORS: AnimalFormErrors = {
  name: undefined,
  identifier: undefined,
  category: undefined,
  species: undefined,
  birthDate: undefined,
  notes: undefined,
};

export function useAnimalRegistrationForm({
  onSuccess,
}: UseAnimalRegistrationFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<AnimalFormValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<AnimalFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: AnimalField, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    clearFieldError(field);
    if (formError) {
      setFormError(null);
    }
  }

  function applyResult(result: AnimalRegistrationResult) {
    switch (result.kind) {
      case submitOutcome.SUCCESS:
        setValues(INITIAL_VALUES);
        setErrors(INITIAL_ERRORS);
        onSuccess();
        return;
      case submitOutcome.VALIDATION_ERROR:
        setErrors(result.errors);
        if (!hasErrors(result.errors)) {
          setFormError(t.messages.errors.unknown);
        }
        return;
      default:
        setFormError(t.messages.errors.unknown);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAnimalRegistration(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitAnimalRegistration(values, t.messages);
    setIsSubmitting(false);
    applyResult(result);
  }

  return { values, errors, isSubmitting, formError, handleChange, handleSubmit };
}
