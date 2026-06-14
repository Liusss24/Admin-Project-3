export const feedingListStatus = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
} as const;

export type FeedingListStatus = (typeof feedingListStatus)[keyof typeof feedingListStatus];

export const feedingLoadOutcome = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
