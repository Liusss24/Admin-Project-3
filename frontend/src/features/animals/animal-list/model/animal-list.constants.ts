import type { AnimalCategory } from '@/entities/animal/model/animal.types';

export const loadOutcome = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const ALL_CATEGORIES = 'all' as const;

export type CategoryFilter = typeof ALL_CATEGORIES | AnimalCategory;

export const listStatus = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
} as const;

export type ListStatus = (typeof listStatus)[keyof typeof listStatus];
