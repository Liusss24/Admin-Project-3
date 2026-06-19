import { fetchAnimals } from '@/entities/animal/model/animal.repository';
import type { Animal, AnimalCategory } from '@/entities/animal/model/animal.types';
import { loadOutcome } from './animal-list.constants';

export type AnimalListResult =
  | { kind: typeof loadOutcome.SUCCESS; animals: Animal[] }
  | { kind: typeof loadOutcome.ERROR };

interface LoadAnimalsParams {
  category?: AnimalCategory;
  search?: string;
  healthEventType?: string;
  healthDateFrom?: string;
  healthDateTo?: string;
}

export async function loadAnimals(
  params: LoadAnimalsParams,
): Promise<AnimalListResult> {
  try {
    const animals = await fetchAnimals(params);
    return { kind: loadOutcome.SUCCESS, animals };
  } catch {
    return { kind: loadOutcome.ERROR };
  }
}
