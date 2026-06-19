import type { HealthTranslations } from '../es/health';

export const enHealth: HealthTranslations = {
  section: 'Health events',
  actions: {
    add: 'Record event',
    delete: 'Delete',
    cancel: 'Cancel',
    retry: 'Retry',
  },
  form: {
    title: 'New health event',
    fields: {
      eventType: { label: 'Event type', placeholder: 'Select a type' },
      date: { label: 'Event date' },
      description: { label: 'Description', placeholder: 'Health event details' },
    },
    submit: { idle: 'Save event', loading: 'Saving…' },
    success: 'Health event recorded successfully.',
  },
  eventTypes: {
    vacunacion: 'Vaccination',
    desparasitacion: 'Deworming',
    revision: 'Check-up',
    otro: 'Other',
  },
  card: {
    type: 'Type',
    date: 'Date',
  },
  list: {
    empty: 'No health events recorded.',
    error: 'Could not load health events.',
  },
};
