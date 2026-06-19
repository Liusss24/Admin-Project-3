import type { LocationTranslations } from '../es/location';

export const enLocation: LocationTranslations = {
  section: 'Location',
  page: {
    title: 'Farms',
    subtitle: 'Manage farms and animal assignments by lot.',
    empty: 'No farms registered yet.',
    error: 'Could not load the farms.',
  },
  actions: {
    addFarm: 'Add farm',
    assign: 'Assign location',
    cancel: 'Cancel',
    retry: 'Retry',
  },
  farm: {
    name: { label: 'Name', placeholder: 'e.g. North Farm' },
    description: { label: 'Description (optional)', placeholder: 'Farm description' },
    animalCount: 'Animals',
    submit: { idle: 'Save farm', loading: 'Saving…' },
    success: 'Farm registered successfully.',
  },
  assignment: {
    form: {
      title: 'Assign location',
      fields: {
        farm: { label: 'Farm', placeholder: 'Select a farm' },
        lot: { label: 'Lot', placeholder: 'e.g. Lot A' },
        date: { label: 'Assignment date' },
      },
      submit: { idle: 'Assign', loading: 'Assigning…' },
      success: 'Location assigned successfully.',
    },
  },
  current: {
    label: 'Current location',
    farm: 'Farm',
    lot: 'Lot',
    since: 'Since',
    none: 'No location assigned.',
  },
  history: {
    label: 'Location history',
    empty: 'No location history.',
    error: 'Could not load location history.',
  },
};
