export const statusMessageVariant = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type StatusMessageVariant =
  (typeof statusMessageVariant)[keyof typeof statusMessageVariant];
