import type { FeedingTranslations } from '../es/feeding';

export const enFeeding: FeedingTranslations = {
  section: 'Feeding records',
  actions: {
    add: 'Record feeding',
    cancel: 'Cancel',
    retry: 'Retry',
  },
  form: {
    title: 'New feeding record',
    fields: {
      date: { label: 'Date' },
      foodType: { label: 'Food type', placeholder: 'E.g. Hay, Corn, Feed' },
      quantity: { label: 'Quantity (optional)', placeholder: 'E.g. 5 kg' },
      notes: { label: 'Notes (optional)', placeholder: 'Additional observations' },
    },
    submit: { idle: 'Save record', loading: 'Saving…' },
    success: 'Feeding record saved successfully.',
  },
  card: {
    foodType: 'Food',
    quantity: 'Quantity',
    date: 'Date',
  },
  list: {
    empty: 'No feeding records.',
    error: 'Could not load feeding records.',
  },
};
