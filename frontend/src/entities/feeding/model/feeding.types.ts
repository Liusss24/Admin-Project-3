export interface FeedingRecord {
  id: number;
  animal: number;
  animalName: string;
  date: string;
  foodType: string;
  quantity: string;
  notes: string;
  createdAt: string;
}

export interface FeedingRecordDraft {
  animal: number;
  date: string;
  foodType: string;
  quantity: string;
  notes: string;
}
