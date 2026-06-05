import type { AnimalsTranslations } from '../es/animals';

export const enAnimals: AnimalsTranslations = {
  page: {
    title: 'Animals',
    subtitle: 'Register and individually identify each animal on the farm.',
  },
  actions: {
    register: 'Register animal',
    cancel: 'Cancel',
    retry: 'Retry',
  },
  filter: {
    all: 'All',
    searchLabel: 'Search',
    searchPlaceholder: 'Search by name or identifier',
    searchAction: 'Search',
  },
  form: {
    title: 'New animal',
    fields: {
      name: { label: 'Name', placeholder: 'e.g. Lola' },
      identifier: { label: 'Unique identifier', placeholder: 'e.g. BOV-001' },
      category: { label: 'Category', placeholder: 'Select a category' },
      species: { label: 'Species', placeholder: 'e.g. Cow' },
      birthDate: { label: 'Birth date (optional)' },
      notes: { label: 'Notes (optional)', placeholder: 'Observations' },
    },
    submit: { idle: 'Save animal', loading: 'Saving…' },
    success: 'Animal registered successfully.',
  },
  card: {
    identifier: 'Identifier',
    species: 'Species',
  },
  list: {
    empty: 'No animals registered yet.',
    error: 'Could not load the animals.',
  },
};
