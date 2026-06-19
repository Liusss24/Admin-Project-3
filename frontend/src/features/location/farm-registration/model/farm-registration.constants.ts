export const farmField = {
  name: 'name',
  description: 'description',
} as const;

export type FarmField = (typeof farmField)[keyof typeof farmField];

export const farmRegistrationOutcome = {
  SUCCESS: 'success',
  VALIDATION_ERROR: 'validationError',
  UNKNOWN_ERROR: 'unknownError',
} as const;
