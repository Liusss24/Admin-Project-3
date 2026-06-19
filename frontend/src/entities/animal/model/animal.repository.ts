import { httpRequest, httpMethod } from '@/shared/api/http-client';
import { apiRoute } from '@/shared/api/api-routes';
import type { Animal, AnimalCategory, AnimalDraft } from './animal.types';

interface AnimalDto {
  id: number;
  name: string;
  identifier: string;
  category: AnimalCategory;
  category_display: string;
  species: string;
  birth_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface PaginatedDto<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

function toAnimal(dto: AnimalDto): Animal {
  return {
    id: dto.id,
    name: dto.name,
    identifier: dto.identifier,
    category: dto.category,
    categoryDisplay: dto.category_display,
    species: dto.species,
    birthDate: dto.birth_date,
    notes: dto.notes,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

function toRequestBody(draft: AnimalDraft) {
  return {
    name: draft.name,
    identifier: draft.identifier,
    category: draft.category,
    species: draft.species,
    birth_date: draft.birthDate,
    notes: draft.notes,
  };
}

export interface AnimalQuery {
  category?: AnimalCategory;
  search?: string;
  healthEventType?: string;
  healthDateFrom?: string;
  healthDateTo?: string;
  foodType?: string;
}

export async function fetchAnimals(query: AnimalQuery = {}): Promise<Animal[]> {
  const params = new URLSearchParams();
  if (query.category) {
    params.set('category', query.category);
  }
  if (query.search) {
    params.set('search', query.search);
  }
  if (query.healthEventType) {
    params.set('health_event_type', query.healthEventType);
  }
  if (query.healthDateFrom) {
    params.set('health_date_from', query.healthDateFrom);
  }
  if (query.healthDateTo) {
    params.set('health_date_to', query.healthDateTo);
  }
  if (query.foodType) {
    params.set('food_type', query.foodType);
  }
  const queryString = params.toString();
  const path = queryString
    ? `${apiRoute.animals}?${queryString}`
    : apiRoute.animals;
  const data = await httpRequest<PaginatedDto<AnimalDto>>(path);
  return data.results.map(toAnimal);
}

export async function fetchAnimal(id: number): Promise<Animal> {
  const dto = await httpRequest<AnimalDto>(apiRoute.animalDetail(id));
  return toAnimal(dto);
}

export async function createAnimal(draft: AnimalDraft): Promise<Animal> {
  const dto = await httpRequest<AnimalDto>(apiRoute.animals, {
    method: httpMethod.POST,
    body: toRequestBody(draft),
  });
  return toAnimal(dto);
}

export async function updateAnimal(
  id: number,
  draft: AnimalDraft,
): Promise<Animal> {
  const dto = await httpRequest<AnimalDto>(apiRoute.animalDetail(id), {
    method: httpMethod.PUT,
    body: toRequestBody(draft),
  });
  return toAnimal(dto);
}

export async function deleteAnimal(id: number): Promise<void> {
  await httpRequest<null>(apiRoute.animalDetail(id), {
    method: httpMethod.DELETE,
  });
}
