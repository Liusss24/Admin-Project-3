export const esAnimals = {
  page: {
    title: 'Animales',
    subtitle: 'Registra e identifica individualmente cada animal de la finca.',
  },
  actions: {
    register: 'Registrar animal',
    cancel: 'Cancelar',
    retry: 'Reintentar',
  },
  filter: {
    all: 'Todos',
    searchLabel: 'Buscar',
    searchPlaceholder: 'Buscar por nombre o identificador',
    searchAction: 'Buscar',
  },
  form: {
    title: 'Nuevo animal',
    fields: {
      name: { label: 'Nombre', placeholder: 'Ej. Lola' },
      identifier: { label: 'Identificador único', placeholder: 'Ej. BOV-001' },
      category: { label: 'Categoría', placeholder: 'Selecciona una categoría' },
      species: { label: 'Especie', placeholder: 'Ej. Vaca' },
      birthDate: { label: 'Fecha de nacimiento (opcional)' },
      notes: { label: 'Notas (opcional)', placeholder: 'Observaciones' },
    },
    submit: { idle: 'Guardar animal', loading: 'Guardando…' },
    success: 'Animal registrado correctamente.',
  },
  card: {
    identifier: 'Identificador',
    species: 'Especie',
  },
  list: {
    empty: 'Aún no hay animales registrados.',
    error: 'No se pudieron cargar los animales.',
  },
};

export type AnimalsTranslations = typeof esAnimals;
