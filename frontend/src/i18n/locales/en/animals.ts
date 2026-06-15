import type { AnimalsTranslations } from '../es/animals';

export const enAnimals: AnimalsTranslations = {
  page: {
    title: 'Animals',
    subtitle: 'Register and individually identify each animal on the farm.',
  },
  actions: {
    register: 'Register animal',
    edit: 'Edit animal',
    delete: 'Delete',
    confirmDelete: 'Confirm deletion',
    deleting: 'Deleting…',
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
  detail: {
    back: 'Back to animals',
    birthDate: 'Birth date',
    notes: 'Notes',
    notSpecified: 'Not specified',
    loading: 'Loading animal…',
    error: 'Could not load the animal.',
  },
  editForm: {
    title: 'Edit animal',
    submit: { idle: 'Save changes', loading: 'Saving…' },
    success: 'Animal updated successfully.',
  },
  deleteConfirm: {
    message: 'Are you sure you want to delete this animal? This action cannot be undone.',
  },
};
