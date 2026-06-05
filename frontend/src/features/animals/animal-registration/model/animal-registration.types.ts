import type { AnimalField } from './animal-registration.constants';

export type AnimalFormValues = Record<AnimalField, string>;

export type AnimalFormErrors = Record<AnimalField, string | undefined>;
