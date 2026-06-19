'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { Button } from '@/shared/ui/button/ui/button';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import {
  locationHistoryStatus,
  type LocationHistoryStatus,
} from '../../model/location-history.constants';
import type { AnimalLocation } from '@/entities/location/model/location.types';
import { locationHistoryListStyles } from './location-history-list.styles';

interface LocationHistoryListProps {
  locations: AnimalLocation[];
  status: LocationHistoryStatus;
  onRetry: () => void;
}

function LocationCard({ location }: { location: AnimalLocation }) {
  const { t } = useI18n();
  return (
    <div className={locationHistoryListStyles.card}>
      <div className={locationHistoryListStyles.cardRow}>
        <div>
          <span className={locationHistoryListStyles.cardFarm}>{location.farmName}</span>
          <span className={locationHistoryListStyles.cardLot}> / {location.lot}</span>
        </div>
        <span className={locationHistoryListStyles.cardDate}>
          {t.location.current.since} {location.assignedAt}
        </span>
      </div>
    </div>
  );
}

export function LocationHistoryList({
  locations,
  status,
  onRetry,
}: LocationHistoryListProps) {
  const { t } = useI18n();

  if (status === locationHistoryStatus.LOADING) {
    return (
      <div className={locationHistoryListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.messages.state.loading}
        </StatusMessage>
      </div>
    );
  }

  if (status === locationHistoryStatus.ERROR) {
    return (
      <div className={locationHistoryListStyles.state}>
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {t.location.history.error}
        </StatusMessage>
        <Button type={buttonType.BUTTON} onClick={onRetry}>
          {t.location.actions.retry}
        </Button>
      </div>
    );
  }

  const current = locations.find((l) => l.isCurrent);
  const history = locations.filter((l) => !l.isCurrent);

  return (
    <div>
      <div className={locationHistoryListStyles.currentCard}>
        <p className={locationHistoryListStyles.currentLabel}>
          {t.location.current.label}
        </p>
        {current ? (
          <div className={locationHistoryListStyles.cardRow}>
            <div>
              <span className={locationHistoryListStyles.cardFarm}>{current.farmName}</span>
              <span className={locationHistoryListStyles.cardLot}> / {current.lot}</span>
            </div>
            <span className={locationHistoryListStyles.cardDate}>
              {t.location.current.since} {current.assignedAt}
            </span>
          </div>
        ) : (
          <p className={locationHistoryListStyles.cardLot}>{t.location.current.none}</p>
        )}
      </div>

      {history.length > 0 ? (
        <ul className={locationHistoryListStyles.list}>
          <p className={locationHistoryListStyles.historyLabel}>
            {t.location.history.label}
          </p>
          {history.map((location) => (
            <li key={location.id}>
              <LocationCard location={location} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
