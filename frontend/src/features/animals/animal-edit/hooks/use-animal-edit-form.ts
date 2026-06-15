'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import type { Animal } from '@/entities/animal/model/animal.types';
import type { AnimalField } from '@/features/animals/animal-registration/model/animal-registration.constants';
import { validateAnimalRegistration } from '@/features/animals/animal-registration/model/animal-registration.validators';
import type {
  AnimalFormErrors,
  AnimalFormValues,
} from '@/features/animals/animal-registration/model/animal-registration.types';
import { editOutcome, submitAnimalEdit } from '../model/animal-edit-submit';

interface UseAnimalEditFormOptions {
  animalId: number;
  initialValues: AnimalFormValues;
  onSuccess: (updated: Animal) => void;
}

const INITIAL_ERRORS: AnimalFormErrors = {
  name: undefined,
  identifier: undefined,
  category: undefined,
  species: undefined,
  birthDate: undefined,
  notes: undefined,
};

export function useAnimalEditForm({
  animalId,
  initialValues,
  onSuccess,
}: UseAnimalEditFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<AnimalFormValues>(initialValues);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<AnimalFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: AnimalField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (formError) setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAnimalRegistration(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitAnimalEdit(
      animalId,
      values,
      t.messages.validation.identifierTaken,
    );
    setIsSubmitting(false);
    if (result.kind === editOutcome.SUCCESS) {
      onSuccess(result.animal);
    } else if (result.kind === editOutcome.VALIDATION_ERROR) {
      setErrors(result.errors);
      if (!hasErrors(result.errors)) setFormError(t.messages.errors.unknown);
    } else {
      setFormError(t.messages.errors.unknown);
    }
  }

  return { values, errors, isSubmitting, formError, handleChange, handleSubmit };
}
