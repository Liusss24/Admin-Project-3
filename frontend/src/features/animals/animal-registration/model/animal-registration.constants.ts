export const animalField = {
  name: 'name',
  identifier: 'identifier',
  category: 'category',
  species: 'species',
  birthDate: 'birthDate',
  notes: 'notes',
} as const;

export type AnimalField = (typeof animalField)[keyof typeof animalField];

export const submitOutcome = {
  SUCCESS: 'success',
  VALIDATION_ERROR: 'validationError',
  UNKNOWN_ERROR: 'unknownError',
} as const;
