'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { Button, buttonVariant } from '@/shared/ui/button/ui/button';
import { Input } from '@/shared/ui/input/ui/input';
import { FormField } from '@/shared/ui/form-field/ui/form-field';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { buttonType, inputType } from '@/shared/constants/html-attributes.constants';
import { buildFieldDescribedBy } from '@/shared/lib/forms/form-field-aria';
import { useFeedingRecordRegistrationForm } from '../../hooks/use-feeding-record-registration-form';
import { feedingRecordFormStyles } from './feeding-record-form.styles';

const FIELD_ID = {
  date: 'feeding-date',
  foodType: 'feeding-food-type',
  quantity: 'feeding-quantity',
  notes: 'feeding-notes',
} as const;

interface FeedingRecordFormProps {
  animalId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FeedingRecordForm({ animalId, onSuccess, onCancel }: FeedingRecordFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit, field } =
    useFeedingRecordRegistrationForm({ animalId, onSuccess });

  return (
    <form onSubmit={handleSubmit} className={feedingRecordFormStyles.form} noValidate>
      <div className={feedingRecordFormStyles.grid}>
        <FormField
          htmlFor={FIELD_ID.date}
          label={t.feeding.form.fields.date.label}
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
          htmlFor={FIELD_ID.foodType}
          label={t.feeding.form.fields.foodType.label}
          error={errors.foodType}
          required
        >
          <Input
            id={FIELD_ID.foodType}
            type={inputType.TEXT}
            value={values.foodType}
            placeholder={t.feeding.form.fields.foodType.placeholder}
            hasError={Boolean(errors.foodType)}
            aria-describedby={buildFieldDescribedBy(FIELD_ID.foodType, Boolean(errors.foodType))}
            onChange={(e) => handleChange(field.foodType, e.target.value)}
          />
        </FormField>

        <FormField htmlFor={FIELD_ID.quantity} label={t.feeding.form.fields.quantity.label}>
          <Input
            id={FIELD_ID.quantity}
            type={inputType.TEXT}
            value={values.quantity}
            placeholder={t.feeding.form.fields.quantity.placeholder}
            onChange={(e) => handleChange(field.quantity, e.target.value)}
          />
        </FormField>

        <FormField htmlFor={FIELD_ID.notes} label={t.feeding.form.fields.notes.label}>
          <Input
            id={FIELD_ID.notes}
            type={inputType.TEXT}
            value={values.notes}
            placeholder={t.feeding.form.fields.notes.placeholder}
            onChange={(e) => handleChange(field.notes, e.target.value)}
          />
        </FormField>
      </div>

      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>{formError}</StatusMessage>
      ) : null}

      <div className={feedingRecordFormStyles.actions}>
        <Button type={buttonType.SUBMIT} disabled={isSubmitting}>
          {isSubmitting ? t.feeding.form.submit.loading : t.feeding.form.submit.idle}
        </Button>
        <Button type={buttonType.BUTTON} variant={buttonVariant.SECONDARY} onClick={onCancel}>
          {t.feeding.actions.cancel}
        </Button>
      </div>
    </form>
  );
}
