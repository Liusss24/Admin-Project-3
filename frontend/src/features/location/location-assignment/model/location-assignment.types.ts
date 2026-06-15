import type { LocationAssignmentField } from './location-assignment.constants';

export type LocationAssignmentFormValues = Record<LocationAssignmentField, string>;
export type LocationAssignmentFormErrors = Record<
  LocationAssignmentField,
  string | undefined
>;
