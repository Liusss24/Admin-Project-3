'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { Button } from '@/shared/ui/button/ui/button';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import { feedingListStatus, type FeedingListStatus } from '../../model/feeding-record-list.constants';
import type { FeedingRecord } from '@/entities/feeding/model/feeding.types';
import { feedingRecordListStyles } from './feeding-record-list.styles';

interface FeedingRecordListProps {
  records: FeedingRecord[];
  status: FeedingListStatus;
  onRetry: () => void;
}

export function FeedingRecordList({ records, status, onRetry }: FeedingRecordListProps) {
  const { t } = useI18n();

  if (status === feedingListStatus.LOADING) {
    return (
      <div className={feedingRecordListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.messages.state.loading}
        </StatusMessage>
      </div>
    );
  }

  if (status === feedingListStatus.ERROR) {
    return (
      <div className={feedingRecordListStyles.state}>
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {t.feeding.list.error}
        </StatusMessage>
        <Button type={buttonType.BUTTON} onClick={onRetry}>
          {t.feeding.actions.retry}
        </Button>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className={feedingRecordListStyles.state}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.feeding.list.empty}
        </StatusMessage>
      </div>
    );
  }

  return (
    <ul className={feedingRecordListStyles.list}>
      {records.map((record) => (
        <li key={record.id} className={feedingRecordListStyles.card}>
          <div className={feedingRecordListStyles.cardHeader}>
            <span className={feedingRecordListStyles.cardFood}>{record.foodType}</span>
            <span className={feedingRecordListStyles.cardDate}>{record.date}</span>
          </div>
          {record.quantity ? (
            <p className={feedingRecordListStyles.cardQuantity}>{record.quantity}</p>
          ) : null}
          {record.notes ? (
            <p className={feedingRecordListStyles.cardNotes}>{record.notes}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
