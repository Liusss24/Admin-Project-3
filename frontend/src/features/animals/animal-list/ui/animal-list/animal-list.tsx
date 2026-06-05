'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import type { Animal } from '@/entities/animal/model/animal.types';
import { AnimalCard } from '@/widgets/animals/animal-card';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import { listStatus, type ListStatus } from '../../model/animal-list.constants';
import { animalListStyles } from './animal-list.styles';

interface AnimalListProps {
  animals: Animal[];
  status: ListStatus;
  onRetry: () => void;
}

export function AnimalList({ animals, status, onRetry }: AnimalListProps) {
  const { t } = useI18n();

  if (status === listStatus.LOADING) {
    return (
      <div className={animalListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.messages.state.loading}
        </StatusMessage>
      </div>
    );
  }

  if (status === listStatus.ERROR) {
    return (
      <div className={`${animalListStyles.state} ${animalListStyles.error}`}>
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {t.animals.list.error}
        </StatusMessage>
        <Button type={buttonType.BUTTON} onClick={onRetry}>
          {t.animals.actions.retry}
        </Button>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className={animalListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.animals.list.empty}
        </StatusMessage>
      </div>
    );
  }

  return (
    <div className={animalListStyles.grid}>
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          identifierLabel={t.animals.card.identifier}
          speciesLabel={t.animals.card.species}
        />
      ))}
    </div>
  );
}
