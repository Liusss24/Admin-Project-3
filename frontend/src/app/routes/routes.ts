export const route = {
  home: '/',
  login: '/login',
  animals: '/animales',
  animalDetail: (id: number) => `/animales/${id}`,
  health: '/salud',
  feeding: '/alimentacion',
  location: '/ubicacion',
} as const;
