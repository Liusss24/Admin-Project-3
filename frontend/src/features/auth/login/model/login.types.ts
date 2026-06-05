import type { LoginField } from './login.constants';

export type LoginValues = Record<LoginField, string>;

export type LoginErrors = Record<LoginField, string | undefined>;
