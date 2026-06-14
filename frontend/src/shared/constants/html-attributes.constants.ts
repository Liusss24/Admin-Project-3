export const buttonType = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export const inputType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  DATE: 'date',
  NUMBER: 'number',
  SEARCH: 'search',
} as const;

export const ariaRole = {
  ALERT: 'alert',
  STATUS: 'status',
  DIALOG: 'dialog',
} as const;

export const ariaLive = {
  OFF: 'off',
  POLITE: 'polite',
  ASSERTIVE: 'assertive',
} as const;

export const ariaBoolean = {
  TRUE: 'true',
  FALSE: 'false',
} as const;
