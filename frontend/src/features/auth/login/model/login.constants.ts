export const loginField = {
  username: 'username',
  password: 'password',
} as const;

export type LoginField = (typeof loginField)[keyof typeof loginField];

export const submitOutcome = {
  SUCCESS: 'success',
  INVALID_CREDENTIALS: 'invalidCredentials',
  UNKNOWN_ERROR: 'unknownError',
} as const;
