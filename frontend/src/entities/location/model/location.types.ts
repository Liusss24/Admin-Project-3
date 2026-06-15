export interface Farm {
  id: number;
  name: string;
  description: string;
  animalCount: number;
  createdAt: string;
}

export interface FarmDraft {
  name: string;
  description: string;
}

export interface AnimalLocation {
  id: number;
  animal: number;
  animalName: string;
  farm: number;
  farmName: string;
  lot: string;
  assignedAt: string;
  isCurrent: boolean;
  createdAt: string;
}

export interface LocationAssignmentDraft {
  animal: number;
  farm: number;
  lot: string;
  assignedAt: string;
}
