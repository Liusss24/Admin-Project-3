'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import type { Animal } from '@/entities/animal/model/animal.types';
import { CategoryBadge } from '@/shared/ui/category-badge/ui/category-badge';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { ariaBoolean, buttonType } from '@/shared/constants/html-attributes.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { HealthEventForm } from '@/features/health/health-event-registration';
import { HealthEventList, useHealthEventList } from '@/features/health/health-event-list';
import { FeedingRecordForm } from '@/features/feeding/feeding-record-registration';
import { FeedingRecordList, useFeedingRecordList } from '@/features/feeding/feeding-record-list';
import { animalDetailStyles } from './animal-detail.styles';

interface AnimalDetailProps {
  animal: Animal;
}

export function AnimalDetail({ animal }: AnimalDetailProps) {
  const { t } = useI18n();

  const { events, status: healthStatus, reload: reloadHealth } = useHealthEventList(animal.id);
  const { records, status: feedingStatus, reload: reloadFeeding } = useFeedingRecordList(animal.id);

  const [healthPanelOpen, setHealthPanelOpen] = useState(false);
  const [showHealthSuccess, setShowHealthSuccess] = useState(false);
  const [feedingPanelOpen, setFeedingPanelOpen] = useState(false);
  const [showFeedingSuccess, setShowFeedingSuccess] = useState(false);

  function handleHealthCreated() {
    setHealthPanelOpen(false);
    setShowHealthSuccess(true);
    void reloadHealth();
  }

  function handleFeedingCreated() {
    setFeedingPanelOpen(false);
    setShowFeedingSuccess(true);
    void reloadFeeding();
  }

  return (
    <div className={animalDetailStyles.root}>
      {/* Animal info */}
      <div>
        <div className={animalDetailStyles.nameRow}>
          <h1 className={animalDetailStyles.name}>{animal.name}</h1>
          <CategoryBadge category={animal.category} label={animal.categoryDisplay} />
        </div>
        <dl className={animalDetailStyles.meta}>
          <div>
            <dt className={animalDetailStyles.metaLabel}>{t.animals.card.identifier}</dt>
            <dd className={animalDetailStyles.metaValue}>{animal.identifier}</dd>
          </div>
          <div>
            <dt className={animalDetailStyles.metaLabel}>{t.animals.card.species}</dt>
            <dd className={animalDetailStyles.metaValue}>{animal.species}</dd>
          </div>
          <div>
            <dt className={animalDetailStyles.metaLabel}>{t.animals.detail.birthDate}</dt>
            <dd className={animalDetailStyles.metaValue}>
              {animal.birthDate ?? t.animals.detail.notSpecified}
            </dd>
          </div>
        </dl>
        {animal.notes ? (
          <p className={animalDetailStyles.notes}>{animal.notes}</p>
        ) : null}
      </div>

      {/* Health section */}
      <section className={animalDetailStyles.section}>
        <div className={animalDetailStyles.sectionHeader}>
          <h2 className={animalDetailStyles.sectionTitle}>{t.health.section}</h2>
          <Button
            type={buttonType.BUTTON}
            onClick={() => {
              setShowHealthSuccess(false);
              setHealthPanelOpen((o) => !o);
            }}
          >
            <Plus size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.health.actions.add}
          </Button>
        </div>

        {showHealthSuccess ? (
          <div className={animalDetailStyles.successBanner}>
            <StatusMessage variant={statusMessageVariant.SUCCESS}>
              {t.health.form.success}
            </StatusMessage>
          </div>
        ) : null}

        {healthPanelOpen ? (
          <div className={animalDetailStyles.panel}>
            <HealthEventForm
              animalId={animal.id}
              onSuccess={handleHealthCreated}
              onCancel={() => setHealthPanelOpen(false)}
            />
          </div>
        ) : null}

        <HealthEventList events={events} status={healthStatus} onRetry={reloadHealth} />
      </section>

      {/* Feeding section */}
      <section className={animalDetailStyles.section}>
        <div className={animalDetailStyles.sectionHeader}>
          <h2 className={animalDetailStyles.sectionTitle}>{t.feeding.section}</h2>
          <Button
            type={buttonType.BUTTON}
            onClick={() => {
              setShowFeedingSuccess(false);
              setFeedingPanelOpen((o) => !o);
            }}
          >
            <Plus size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.feeding.actions.add}
          </Button>
        </div>

        {showFeedingSuccess ? (
          <div className={animalDetailStyles.successBanner}>
            <StatusMessage variant={statusMessageVariant.SUCCESS}>
              {t.feeding.form.success}
            </StatusMessage>
          </div>
        ) : null}

        {feedingPanelOpen ? (
          <div className={animalDetailStyles.panel}>
            <FeedingRecordForm
              animalId={animal.id}
              onSuccess={handleFeedingCreated}
              onCancel={() => setFeedingPanelOpen(false)}
            />
          </div>
        ) : null}

        <FeedingRecordList records={records} status={feedingStatus} onRetry={reloadFeeding} />
      </section>
    </div>
  );
}
