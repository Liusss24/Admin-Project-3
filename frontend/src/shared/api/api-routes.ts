export const apiRoute = {
  tokenObtain: '/api/token/',
  tokenRefresh: '/api/token/refresh/',
  animals: '/api/animals/',
  animalDetail: (id: number) => `/api/animals/${id}/`,
  health: '/api/health/',
  feeding: '/api/feeding/',
  farms: '/api/location/farms/',
  assignments: '/api/location/assignments/',
} as const;
