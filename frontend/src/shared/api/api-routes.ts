export const apiRoute = {
  tokenObtain: '/api/token/',
  tokenRefresh: '/api/token/refresh/',
  animals: '/api/animals/',
  animalDetail: (id: number) => `/api/animals/${id}/`,
  health: '/api/health/',
  healthEvent: (id: number) => `/api/health/${id}/`,
  feeding: '/api/feeding/',
  feedingRecord: (id: number) => `/api/feeding/${id}/`,
  farms: '/api/location/farms/',
  assignments: '/api/location/assignments/',
} as const;
