export const locationHistoryStatus = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
} as const;

export type LocationHistoryStatus =
  (typeof locationHistoryStatus)[keyof typeof locationHistoryStatus];

export const locationHistoryOutcome = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
