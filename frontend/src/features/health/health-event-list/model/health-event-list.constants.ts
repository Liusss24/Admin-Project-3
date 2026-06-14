export const healthListStatus = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
} as const;

export type HealthListStatus = (typeof healthListStatus)[keyof typeof healthListStatus];

export const healthLoadOutcome = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
