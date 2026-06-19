import type { FarmField } from './farm-registration.constants';

export type FarmFormValues = Record<FarmField, string>;
export type FarmFormErrors = Record<FarmField, string | undefined>;
