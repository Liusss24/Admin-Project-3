'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { Button } from '@/shared/ui/button/ui/button';
import { ariaBoolean, buttonType } from '@/shared/constants/html-attributes.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { healthListStatus, type HealthListStatus } from '../../model/health-event-list.constants';
import type { HealthEvent } from '@/entities/health/model/health.types';
import { healthEventListStyles } from './health-event-list.styles';

interface HealthEventListProps {
  events: HealthEvent[];
  status: HealthListStatus;
  onRetry: () => void;
  onDelete: (id: number) => void;
}

export function HealthEventList({ events, status, onRetry, onDelete }: HealthEventListProps) {
  const { t } = useI18n();
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
            <div className={healthEventListStyles.cardActions}>
              <span className={healthEventListStyles.cardDate}>{event.date}</span>
              {deletingId === event.id ? (
                <>
                  <button
                    type={buttonType.BUTTON}
                    className={healthEventListStyles.confirmButton}
                    onClick={() => {
                      onDelete(event.id);
                      setDeletingId(null);
                    }}
                  >
                    {t.health.actions.delete}
                  </button>
                  <button
                    type={buttonType.BUTTON}
                    className={healthEventListStyles.cancelButton}
                    onClick={() => setDeletingId(null)}
                  >
                    {t.health.actions.cancel}
                  </button>
                </>
              ) : (
                <button
                  type={buttonType.BUTTON}
                  aria-label={t.health.actions.delete}
                  className={healthEventListStyles.deleteButton}
                  onClick={() => setDeletingId(event.id)}
                >
                  <Trash2 size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
                </button>
              )}
            </div>
          </div>
          <p className={healthEventListStyles.cardDescription}>{event.description}</p>
        </li>
      ))}
    </ul>
  );
}
