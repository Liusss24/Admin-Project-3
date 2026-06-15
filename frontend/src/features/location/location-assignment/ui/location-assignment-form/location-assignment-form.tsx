'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import type { Farm } from '@/entities/location/model/location.types';
import { FormField } from '@/shared/ui/form-field/ui/form-field';
import { Input } from '@/shared/ui/input/ui/input';
import { Select, type SelectOption } from '@/shared/ui/select/ui/select';
import { Button, buttonVariant } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import {
  buttonType,
  inputType,
} from '@/shared/constants/html-attributes.constants';
import { buildFieldDescribedBy } from '@/shared/lib/forms/form-field-aria';
import { locationAssignmentField } from '../../model/location-assignment.constants';
import { useLocationAssignmentForm } from '../../hooks/use-location-assignment-form';
import { locationAssignmentFormStyles } from './location-assignment-form.styles';

const FIELD_ID = {
  farm: 'location-farm',
  lot: 'location-lot',
  assignedAt: 'location-assigned-at',
} as const;

interface LocationAssignmentFormProps {
  animalId: number;
  farms: Farm[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function LocationAssignmentForm({
  animalId,
  farms,
  onSuccess,
  onCancel,
}: LocationAssignmentFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit } =
    useLocationAssignmentForm({ animalId, onSuccess });

  const fields = t.location.assignment.form.fields;

  const farmOptions: SelectOption[] = farms.map((farm) => ({
    value: String(farm.id),
    label: farm.name,
  }));

  return (
    <form
      className={locationAssignmentFormStyles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>{formError}</StatusMessage>
      ) : null}

      <div className={locationAssignmentFormStyles.grid}>
        <FormField
          htmlFor={FIELD_ID.farm}
          label={fields.farm.label}
          error={errors.farm}
          required
        >
          <Select
            id={FIELD_ID.farm}
            name={locationAssignmentField.farm}
            value={values.farm}
            placeholder={fields.farm.placeholder}
            options={farmOptions}
            hasError={Boolean(errors.farm)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.farm,
              Boolean(errors.farm),
            )}
            onChange={(event) =>
              handleChange(locationAssignmentField.farm, event.target.value)
            }
          />
        </FormField>

        <FormField
          htmlFor={FIELD_ID.lot}
          label={fields.lot.label}
          error={errors.lot}
          required
        >
          <Input
            id={FIELD_ID.lot}
            name={locationAssignmentField.lot}
            value={values.lot}
            placeholder={fields.lot.placeholder}
            hasError={Boolean(errors.lot)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.lot,
              Boolean(errors.lot),
            )}
            onChange={(event) =>
              handleChange(locationAssignmentField.lot, event.target.value)
            }
          />
        </FormField>

        <FormField
          htmlFor={FIELD_ID.assignedAt}
          label={fields.date.label}
          error={errors.assignedAt}
          required
        >
          <Input
            id={FIELD_ID.assignedAt}
            name={locationAssignmentField.assignedAt}
            type={inputType.DATE}
            value={values.assignedAt}
            hasError={Boolean(errors.assignedAt)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.assignedAt,
              Boolean(errors.assignedAt),
            )}
            onChange={(event) =>
              handleChange(locationAssignmentField.assignedAt, event.target.value)
            }
          />
        </FormField>
      </div>

      <div className={locationAssignmentFormStyles.actions}>
        <Button type={buttonType.SUBMIT} disabled={isSubmitting}>
          {isSubmitting
            ? t.location.assignment.form.submit.loading
            : t.location.assignment.form.submit.idle}
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
