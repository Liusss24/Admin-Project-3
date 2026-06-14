import type { AuthTranslations } from '../es/auth';

export const enAuth: AuthTranslations = {
  login: {
    title: 'Sign in',
    subtitle: 'Access the animal management platform.',
    fields: {
      username: { label: 'Username', placeholder: 'Your username' },
      password: { label: 'Password', placeholder: 'Your password' },
    },
    submit: { idle: 'Sign in', loading: 'Signing in…' },
  },
  logout: 'Sign out',
};
