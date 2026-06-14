import type { HealthEventField } from './health-event-registration.constants';

export type HealthEventFormValues = Record<HealthEventField, string>;
export type HealthEventFormErrors = Record<HealthEventField, string | undefined>;
