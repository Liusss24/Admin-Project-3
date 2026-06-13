'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { Button, buttonVariant } from '@/shared/ui/button/ui/button';
import { Input } from '@/shared/ui/input/ui/input';
import { Select } from '@/shared/ui/select/ui/select';
import { FormField } from '@/shared/ui/form-field/ui/form-field';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { buttonType, inputType } from '@/shared/constants/html-attributes.constants';
import { buildFieldDescribedBy } from '@/shared/lib/forms/form-field-aria';
import { useHealthEventRegistrationForm } from '../../hooks/use-health-event-registration-form';
import { healthEventFormStyles } from './health-event-form.styles';

const FIELD_ID = {
  eventType: 'health-event-type',
  date: 'health-date',
  description: 'health-description',
} as const;

interface HealthEventFormProps {
  animalId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function HealthEventForm({ animalId, onSuccess, onCancel }: HealthEventFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit, field } =
    useHealthEventRegistrationForm({ animalId, onSuccess });

  const eventTypeOptions = [
    { value: 'vacunacion', label: t.health.eventTypes.vacunacion },
    { value: 'desparasitacion', label: t.health.eventTypes.desparasitacion },
    { value: 'revision', label: t.health.eventTypes.revision },
    { value: 'otro', label: t.health.eventTypes.otro },
  ];

  return (
    <form onSubmit={handleSubmit} className={healthEventFormStyles.form} noValidate>
      <FormField
        htmlFor={FIELD_ID.eventType}
        label={t.health.form.fields.eventType.label}
        error={errors.eventType}
        required
      >
        <Select
          id={FIELD_ID.eventType}
          value={values.eventType}
          options={eventTypeOptions}
          placeholder={t.health.form.fields.eventType.placeholder}
          hasError={Boolean(errors.eventType)}
          aria-describedby={buildFieldDescribedBy(FIELD_ID.eventType, Boolean(errors.eventType))}
          onChange={(e) => handleChange(field.eventType, e.target.value)}
        />
      </FormField>

      <FormField
        htmlFor={FIELD_ID.date}
        label={t.health.form.fields.date.label}
        error={errors.date}
        required
      >
        <Input
          id={FIELD_ID.date}
          type={inputType.DATE}
          value={values.date}
          hasError={Boolean(errors.date)}
          aria-describedby={buildFieldDescribedBy(FIELD_ID.date, Boolean(errors.date))}
          onChange={(e) => handleChange(field.date, e.target.value)}
        />
      </FormField>

      <FormField
        htmlFor={FIELD_ID.description}
        label={t.health.form.fields.description.label}
        error={errors.description}
        required
      >
        <Input
          id={FIELD_ID.description}
          type={inputType.TEXT}
          value={values.description}
          placeholder={t.health.form.fields.description.placeholder}
          hasError={Boolean(errors.description)}
          aria-describedby={buildFieldDescribedBy(FIELD_ID.description, Boolean(errors.description))}
          onChange={(e) => handleChange(field.description, e.target.value)}
        />
      </FormField>

      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>{formError}</StatusMessage>
      ) : null}

      <div className={healthEventFormStyles.actions}>
        <Button type={buttonType.SUBMIT} disabled={isSubmitting}>
          {isSubmitting ? t.health.form.submit.loading : t.health.form.submit.idle}
        </Button>
        <Button type={buttonType.BUTTON} variant={buttonVariant.SECONDARY} onClick={onCancel}>
          {t.health.actions.cancel}
        </Button>
      </div>
    </form>
  );
}
