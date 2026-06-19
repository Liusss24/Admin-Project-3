import { httpRequest, httpMethod } from '@/shared/api/http-client';
import { apiRoute } from '@/shared/api/api-routes';
import type {
  Farm,
  FarmDraft,
  AnimalLocation,
  LocationAssignmentDraft,
} from './location.types';

interface FarmDto {
  id: number;
  name: string;
  description: string;
  animal_count: number;
  created_at: string;
}

interface AnimalLocationDto {
  id: number;
  animal: number;
  animal_name: string;
  farm: number;
  farm_name: string;
  lot: string;
  assigned_at: string;
  is_current: boolean;
  created_at: string;
}

interface PaginatedDto<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

function toFarm(dto: FarmDto): Farm {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    animalCount: dto.animal_count,
    createdAt: dto.created_at,
  };
}

function toAnimalLocation(dto: AnimalLocationDto): AnimalLocation {
  return {
    id: dto.id,
    animal: dto.animal,
    animalName: dto.animal_name,
    farm: dto.farm,
    farmName: dto.farm_name,
    lot: dto.lot,
    assignedAt: dto.assigned_at,
    isCurrent: dto.is_current,
    createdAt: dto.created_at,
  };
}

export async function fetchFarms(): Promise<Farm[]> {
  const data = await httpRequest<PaginatedDto<FarmDto>>(apiRoute.farms);
  return data.results.map(toFarm);
}

export async function createFarm(draft: FarmDraft): Promise<Farm> {
  const dto = await httpRequest<FarmDto>(apiRoute.farms, {
    method: httpMethod.POST,
    body: { name: draft.name, description: draft.description },
  });
  return toFarm(dto);
}

export async function fetchLocationsByAnimal(animalId: number): Promise<AnimalLocation[]> {
  const data = await httpRequest<PaginatedDto<AnimalLocationDto>>(
    `${apiRoute.assignments}?animal=${animalId}`,
  );
  return data.results.map(toAnimalLocation);
}

export async function assignLocation(
  draft: LocationAssignmentDraft,
): Promise<AnimalLocation> {
  const dto = await httpRequest<AnimalLocationDto>(apiRoute.assignments, {
    method: httpMethod.POST,
    body: {
      animal: draft.animal,
      farm: draft.farm,
      lot: draft.lot,
      assigned_at: draft.assignedAt,
    },
  });
  return toAnimalLocation(dto);
}
