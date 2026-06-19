'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import type { Animal } from '@/entities/animal/model/animal.types';
import type { Farm } from '@/entities/location/model/location.types';
import { CategoryBadge } from '@/shared/ui/category-badge/ui/category-badge';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { ariaBoolean, buttonType } from '@/shared/constants/html-attributes.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { HealthEventForm } from '@/features/health/health-event-registration';
import { HealthEventList, useHealthEventList } from '@/features/health/health-event-list';
import { deleteHealthEvent } from '@/entities/health';
import { FeedingRecordForm } from '@/features/feeding/feeding-record-registration';
import { FeedingRecordList, useFeedingRecordList } from '@/features/feeding/feeding-record-list';
import { deleteFeedingRecord } from '@/entities/feeding';
import { LocationAssignmentForm } from '@/features/location/location-assignment';
import { LocationHistoryList, useLocationHistory } from '@/features/location/location-history';
import { animalDetailStyles } from './animal-detail.styles';

interface AnimalDetailProps {
  animal: Animal;
  farms: Farm[];
}

export function AnimalDetail({ animal, farms }: AnimalDetailProps) {
  const { t } = useI18n();

  const { events, status: healthStatus, reload: reloadHealth } = useHealthEventList(animal.id);
  const { records, status: feedingStatus, reload: reloadFeeding } = useFeedingRecordList(animal.id);
  const { locations, status: locationStatus, reload: reloadLocation } = useLocationHistory(animal.id);

  const [healthPanelOpen, setHealthPanelOpen] = useState(false);
  const [showHealthSuccess, setShowHealthSuccess] = useState(false);
  const [feedingPanelOpen, setFeedingPanelOpen] = useState(false);
  const [showFeedingSuccess, setShowFeedingSuccess] = useState(false);
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [showLocationSuccess, setShowLocationSuccess] = useState(false);

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

  function handleHealthDeleted(id: number) {
    void deleteHealthEvent(id).then(() => reloadHealth());
  }

  function handleFeedingDeleted(id: number) {
    void deleteFeedingRecord(id).then(() => reloadFeeding());
  }

  function handleLocationAssigned() {
    setLocationPanelOpen(false);
    setShowLocationSuccess(true);
    void reloadLocation();
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

      {/* Location section */}
      <section className={animalDetailStyles.section}>
        <div className={animalDetailStyles.sectionHeader}>
          <h2 className={animalDetailStyles.sectionTitle}>{t.location.section}</h2>
          <Button
            type={buttonType.BUTTON}
            onClick={() => {
              setShowLocationSuccess(false);
              setLocationPanelOpen((o) => !o);
            }}
          >
            <Plus size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.location.actions.assign}
          </Button>
        </div>

        {showLocationSuccess ? (
          <div className={animalDetailStyles.successBanner}>
            <StatusMessage variant={statusMessageVariant.SUCCESS}>
              {t.location.assignment.form.success}
            </StatusMessage>
          </div>
        ) : null}

        {locationPanelOpen ? (
          <div className={animalDetailStyles.panel}>
            <LocationAssignmentForm
              animalId={animal.id}
              farms={farms}
              onSuccess={handleLocationAssigned}
              onCancel={() => setLocationPanelOpen(false)}
            />
          </div>
        ) : null}

        <LocationHistoryList
          locations={locations}
          status={locationStatus}
          onRetry={reloadLocation}
        />
      </section>

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

        <HealthEventList events={events} status={healthStatus} onRetry={reloadHealth} onDelete={handleHealthDeleted} />
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

        <FeedingRecordList records={records} status={feedingStatus} onRetry={reloadFeeding} onDelete={handleFeedingDeleted} />
      </section>
    </div>
  );
}
