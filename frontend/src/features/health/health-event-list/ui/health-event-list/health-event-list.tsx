'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { Button } from '@/shared/ui/button/ui/button';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import { healthListStatus, type HealthListStatus } from '../../model/health-event-list.constants';
import type { HealthEvent } from '@/entities/health/model/health.types';
import { healthEventListStyles } from './health-event-list.styles';

interface HealthEventListProps {
  events: HealthEvent[];
  status: HealthListStatus;
  onRetry: () => void;
}

export function HealthEventList({ events, status, onRetry }: HealthEventListProps) {
  const { t } = useI18n();

  if (status === healthListStatus.LOADING) {
    return (
      <div className={healthEventListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.messages.state.loading}
        </StatusMessage>
      </div>
    );
  }

  if (status === healthListStatus.ERROR) {
    return (
      <div className={healthEventListStyles.state}>
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {t.health.list.error}
        </StatusMessage>
        <Button type={buttonType.BUTTON} onClick={onRetry}>
          {t.health.actions.retry}
        </Button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={healthEventListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.health.list.empty}
        </StatusMessage>
      </div>
    );
  }

  return (
    <ul className={healthEventListStyles.list}>
      {events.map((event) => (
        <li key={event.id} className={healthEventListStyles.card}>
          <div className={healthEventListStyles.cardHeader}>
            <span className={healthEventListStyles.cardType}>{event.eventTypeDisplay}</span>
            <span className={healthEventListStyles.cardDate}>{event.date}</span>
          </div>
          <p className={healthEventListStyles.cardDescription}>{event.description}</p>
        </li>
      ))}
    </ul>
  );
}
