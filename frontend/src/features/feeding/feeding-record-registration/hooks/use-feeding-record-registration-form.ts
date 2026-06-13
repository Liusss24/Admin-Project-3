'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { useFieldErrors } from '@/shared/lib/forms/use-field-errors';
import { hasErrors } from '@/shared/lib/forms/form-errors';
import {
  feedingRecordField,
  feedingRecordSubmitOutcome,
  type FeedingRecordField,
} from '../model/feeding-record-registration.constants';
import { validateFeedingRecordRegistration } from '../model/feeding-record-registration.validators';
import {
  submitFeedingRecordRegistration,
  type FeedingRecordRegistrationResult,
} from '../model/feeding-record-registration-submit';
import type {
  FeedingRecordFormErrors,
  FeedingRecordFormValues,
} from '../model/feeding-record-registration.types';

interface UseFeedingRecordRegistrationFormOptions {
  animalId: number;
  onSuccess: () => void;
}

const INITIAL_VALUES: FeedingRecordFormValues = {
  date: '',
  foodType: '',
  quantity: '',
  notes: '',
};

const INITIAL_ERRORS: FeedingRecordFormErrors = {
  date: undefined,
  foodType: undefined,
  quantity: undefined,
  notes: undefined,
};

export function useFeedingRecordRegistrationForm({
  animalId,
  onSuccess,
}: UseFeedingRecordRegistrationFormOptions) {
  const { t } = useI18n();
  const [values, setValues] = useState<FeedingRecordFormValues>(INITIAL_VALUES);
  const { errors, setErrors, clearFieldError } =
    useFieldErrors<FeedingRecordFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: FeedingRecordField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (formError) setFormError(null);
  }

  function applyResult(result: FeedingRecordRegistrationResult) {
    if (result.kind === feedingRecordSubmitOutcome.SUCCESS) {
      setValues(INITIAL_VALUES);
      setErrors(INITIAL_ERRORS);
      onSuccess();
    } else {
      setFormError(t.messages.errors.unknown);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFeedingRecordRegistration(values, t.messages);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setIsSubmitting(true);
    setFormError(null);
    const result = await submitFeedingRecordRegistration(animalId, values);
    setIsSubmitting(false);
    applyResult(result);
  }

  return {
    values,
    errors,
    isSubmitting,
    formError,
    handleChange,
    handleSubmit,
    field: feedingRecordField,
  };
}
