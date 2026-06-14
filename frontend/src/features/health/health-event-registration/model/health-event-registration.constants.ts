export const healthEventField = {
  eventType: 'eventType',
  date: 'date',
  description: 'description',
} as const;

export type HealthEventField = (typeof healthEventField)[keyof typeof healthEventField];

export const healthEventSubmitOutcome = {
  SUCCESS: 'success',
  UNKNOWN_ERROR: 'unknownError',
} as const;
