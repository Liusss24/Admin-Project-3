export const animalCategory = {
  TRABAJO: 'trabajo',
  PRODUCCION: 'produccion',
  CONSUMO: 'consumo',
} as const;

export type AnimalCategory = (typeof animalCategory)[keyof typeof animalCategory];

export interface Animal {
  id: number;
  name: string;
  identifier: string;
  category: AnimalCategory;
  categoryDisplay: string;
  species: string;
  birthDate: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnimalDraft {
  name: string;
  identifier: string;
  category: AnimalCategory;
  species: string;
  birthDate: string | null;
  notes: string;
}
