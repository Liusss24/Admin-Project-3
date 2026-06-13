export const feedingRecordField = {
  date: 'date',
  foodType: 'foodType',
  quantity: 'quantity',
  notes: 'notes',
} as const;

export type FeedingRecordField = (typeof feedingRecordField)[keyof typeof feedingRecordField];

export const feedingRecordSubmitOutcome = {
  SUCCESS: 'success',
  UNKNOWN_ERROR: 'unknownError',
} as const;
