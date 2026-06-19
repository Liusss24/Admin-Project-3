'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import {
  locationAssignmentOutcome,
  type LocationAssignmentField,
} from '../model/location-assignment.constants';
import { validateLocationAssignment } from '../model/location-assignment.validators';
import { submitLocationAssignment } from '../model/location-assignment-submit';
import type {
  LocationAssignmentFormErrors,
  LocationAssignmentFormValues,
} from '../model/location-assignment.types';

interface UseLocationAssignmentFormOptions {
  animalId: number;
  onSuccess: () => void;
}

const INITIAL_VALUES: LocationAssignmentFormValues = {
  farm: '',
  lot: '',
  assignedAt: '',
};

const INITIAL_ERRORS: LocationAssignmentFormErrors = {
  farm: undefined,
  lot: undefined,
  assignedAt: undefined,
};

export function useLocationAssignmentForm({
  animalId,
  onSuccess,
}: UseLocationAssignmentFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<LocationAssignmentFormValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<LocationAssignmentFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: LocationAssignmentField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (formError) setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLocationAssignment(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitLocationAssignment(animalId, values);
    setIsSubmitting(false);
    if (result.kind === locationAssignmentOutcome.SUCCESS) {
      setValues(INITIAL_VALUES);
      setErrors(INITIAL_ERRORS);
      onSuccess();
    } else if (result.kind === locationAssignmentOutcome.VALIDATION_ERROR) {
      setErrors(result.errors);
    } else {
      setFormError(t.messages.errors.unknown);
    }
  }

  return { values, errors, isSubmitting, formError, handleChange, handleSubmit };
}
