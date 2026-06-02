export const esCommon = {
  nav: {
    dashboard: 'Inicio',
    animals: 'Animales',
    health: 'Salud',
    feeding: 'Alimentación',
    location: 'Ubicación',
  },
  home: {
    title: 'Gestión de animales de trabajo y producción',
    subtitle:
      'Registra, da seguimiento y organiza el ganado de tus fincas desde un solo lugar.',
    primaryAction: 'Ver animales',
    secondaryAction: 'Registrar animal',
  },
  categories: {
    trabajo: 'Trabajo',
    produccion: 'Producción',
    consumo: 'Consumo',
  },
};

// Values are widened to string (no `as const`) so other locales can provide
// their own translations while keeping the exact key shape.
export type CommonTranslations = typeof esCommon;
