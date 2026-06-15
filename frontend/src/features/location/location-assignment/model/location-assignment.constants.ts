export const locationAssignmentField = {
  farm: 'farm',
  lot: 'lot',
  assignedAt: 'assignedAt',
} as const;

export type LocationAssignmentField =
  (typeof locationAssignmentField)[keyof typeof locationAssignmentField];

export const locationAssignmentOutcome = {
  SUCCESS: 'success',
  VALIDATION_ERROR: 'validationError',
  UNKNOWN_ERROR: 'unknownError',
} as const;
