import { fetchLocationsByAnimal } from '@/entities/location/model/location.repository';
import type { AnimalLocation } from '@/entities/location/model/location.types';
import { locationHistoryOutcome } from './location-history.constants';

export type LocationHistoryResult =
  | { kind: typeof locationHistoryOutcome.SUCCESS; locations: AnimalLocation[] }
  | { kind: typeof locationHistoryOutcome.ERROR };

export async function loadLocationHistory(
  animalId: number,
): Promise<LocationHistoryResult> {
  try {
    const locations = await fetchLocationsByAnimal(animalId);
    return { kind: locationHistoryOutcome.SUCCESS, locations };
  } catch {
    return { kind: locationHistoryOutcome.ERROR };
  }
}
