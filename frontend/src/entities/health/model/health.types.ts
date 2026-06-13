export type HealthEventType = 'vacunacion' | 'desparasitacion' | 'revision' | 'otro';

export const healthEventType = {
  VACUNACION: 'vacunacion' as HealthEventType,
  DESPARASITACION: 'desparasitacion' as HealthEventType,
  REVISION: 'revision' as HealthEventType,
  OTRO: 'otro' as HealthEventType,
} as const;

export interface HealthEvent {
  id: number;
  animal: number;
  animalName: string;
  eventType: HealthEventType;
  eventTypeDisplay: string;
  date: string;
  description: string;
  createdAt: string;
}

export interface HealthEventDraft {
  animal: number;
  eventType: HealthEventType;
  date: string;
  description: string;
}
