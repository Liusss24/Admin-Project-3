'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { FormField } from '@/shared/ui/form-field/ui/form-field';
import { Input } from '@/shared/ui/input/ui/input';
import { Button, buttonVariant } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import { buildFieldDescribedBy } from '@/shared/lib/forms/form-field-aria';
import { farmField } from '../../model/farm-registration.constants';
import { useFarmRegistrationForm } from '../../hooks/use-farm-registration-form';
import { farmFormStyles } from './farm-form.styles';

const FIELD_ID = {
  name: 'farm-name',
  description: 'farm-description',
} as const;

interface FarmFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function FarmForm({ onSuccess, onCancel }: FarmFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit } =
    useFarmRegistrationForm({ onSuccess });
  const fields = t.location.farm;

  return (
    <form className={farmFormStyles.form} onSubmit={handleSubmit} noValidate>
      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>{formError}</StatusMessage>
      ) : null}

      <div className={farmFormStyles.grid}>
        <FormField
          htmlFor={FIELD_ID.name}
          label={fields.name.label}
          error={errors.name}
          required
        >
          <Input
            id={FIELD_ID.name}
            name={farmField.name}
            value={values.name}
            placeholder={fields.name.placeholder}
            hasError={Boolean(errors.name)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.name,
              Boolean(errors.name),
            )}
            onChange={(event) => handleChange(farmField.name, event.target.value)}
          />
        </FormField>

        <FormField htmlFor={FIELD_ID.description} label={fields.description.label}>
          <Input
            id={FIELD_ID.description}
            name={farmField.description}
            value={values.description}
            placeholder={fields.description.placeholder}
            onChange={(event) =>
              handleChange(farmField.description, event.target.value)
            }
          />
        </FormField>
      </div>

      <div className={farmFormStyles.actions}>
        <Button type={buttonType.SUBMIT} disabled={isSubmitting}>
          {isSubmitting ? fields.submit.loading : fields.submit.idle}
        </Button>
        <Button
          type={buttonType.BUTTON}
          variant={buttonVariant.SECONDARY}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t.location.actions.cancel}
        </Button>
      </div>
    </form>
  );
}
