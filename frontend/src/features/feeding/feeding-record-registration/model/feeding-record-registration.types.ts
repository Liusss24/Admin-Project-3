import type { FeedingRecordField } from './feeding-record-registration.constants';

export type FeedingRecordFormValues = Record<FeedingRecordField, string>;
export type FeedingRecordFormErrors = Record<FeedingRecordField, string | undefined>;
