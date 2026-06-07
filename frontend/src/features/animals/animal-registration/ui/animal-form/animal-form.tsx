'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { animalCategory } from '@/entities/animal/model/animal.types';
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
import { animalField } from '../../model/animal-registration.constants';
import { useAnimalRegistrationForm } from '../../hooks/use-animal-registration-form';
import { animalFormStyles } from './animal-form.styles';

const FIELD_ID = {
  name: 'animal-name',
  identifier: 'animal-identifier',
  category: 'animal-category',
  species: 'animal-species',
  birthDate: 'animal-birth-date',
  notes: 'animal-notes',
} as const;

interface AnimalFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AnimalForm({ onSuccess, onCancel }: AnimalFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit } =
    useAnimalRegistrationForm({ onSuccess });
  const fields = t.animals.form.fields;

  const categoryOptions: SelectOption[] = [
    { value: animalCategory.TRABAJO, label: t.common.categories.trabajo },
    { value: animalCategory.PRODUCCION, label: t.common.categories.produccion },
    { value: animalCategory.CONSUMO, label: t.common.categories.consumo },
  ];

  return (
    <form className={animalFormStyles.form} onSubmit={handleSubmit} noValidate>
      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {formError}
        </StatusMessage>
      ) : null}

      <div className={animalFormStyles.grid}>
        <FormField
          htmlFor={FIELD_ID.name}
          label={fields.name.label}
          error={errors.name}
          required
        >
          <Input
            id={FIELD_ID.name}
            name={animalField.name}
            value={values.name}
            placeholder={fields.name.placeholder}
            hasError={Boolean(errors.name)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.name,
              Boolean(errors.name),
            )}
            onChange={(event) =>
              handleChange(animalField.name, event.target.value)
            }
          />
        </FormField>

        <FormField
          htmlFor={FIELD_ID.identifier}
          label={fields.identifier.label}
          error={errors.identifier}
          required
        >
          <Input
            id={FIELD_ID.identifier}
            name={animalField.identifier}
            value={values.identifier}
            placeholder={fields.identifier.placeholder}
            hasError={Boolean(errors.identifier)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.identifier,
              Boolean(errors.identifier),
            )}
            onChange={(event) =>
              handleChange(animalField.identifier, event.target.value)
            }
          />
        </FormField>

        <FormField
          htmlFor={FIELD_ID.category}
          label={fields.category.label}
          error={errors.category}
          required
        >
          <Select
            id={FIELD_ID.category}
            name={animalField.category}
            value={values.category}
            placeholder={fields.category.placeholder}
            options={categoryOptions}
            hasError={Boolean(errors.category)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.category,
              Boolean(errors.category),
            )}
            onChange={(event) =>
              handleChange(animalField.category, event.target.value)
            }
          />
        </FormField>

        <FormField
          htmlFor={FIELD_ID.species}
          label={fields.species.label}
          error={errors.species}
          required
        >
          <Input
            id={FIELD_ID.species}
            name={animalField.species}
            value={values.species}
            placeholder={fields.species.placeholder}
            hasError={Boolean(errors.species)}
            aria-describedby={buildFieldDescribedBy(
              FIELD_ID.species,
              Boolean(errors.species),
            )}
            onChange={(event) =>
              handleChange(animalField.species, event.target.value)
            }
          />
        </FormField>

        <FormField htmlFor={FIELD_ID.birthDate} label={fields.birthDate.label}>
          <Input
            id={FIELD_ID.birthDate}
            name={animalField.birthDate}
            type={inputType.DATE}
            value={values.birthDate}
            onChange={(event) =>
              handleChange(animalField.birthDate, event.target.value)
            }
          />
        </FormField>

        <div className={animalFormStyles.fullWidth}>
          <FormField htmlFor={FIELD_ID.notes} label={fields.notes.label}>
            <Input
              id={FIELD_ID.notes}
              name={animalField.notes}
              value={values.notes}
              placeholder={fields.notes.placeholder}
              onChange={(event) =>
                handleChange(animalField.notes, event.target.value)
              }
            />
          </FormField>
        </div>
      </div>

      <div className={animalFormStyles.actions}>
        <Button type={buttonType.SUBMIT} disabled={isSubmitting}>
          {isSubmitting
            ? t.animals.form.submit.loading
            : t.animals.form.submit.idle}
        </Button>
        <Button
          type={buttonType.BUTTON}
          variant={buttonVariant.SECONDARY}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t.animals.actions.cancel}
        </Button>
      </div>
    </form>
  );
}
