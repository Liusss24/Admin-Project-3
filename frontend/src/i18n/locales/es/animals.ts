export const esAnimals = {
  page: {
    title: 'Animales',
    subtitle: 'Registra e identifica individualmente cada animal de la finca.',
  },
  actions: {
    register: 'Registrar animal',
    edit: 'Editar animal',
    delete: 'Eliminar',
    confirmDelete: 'Confirmar eliminación',
    deleting: 'Eliminando…',
    cancel: 'Cancelar',
    retry: 'Reintentar',
  },
  filter: {
    all: 'Todos',
    searchLabel: 'Buscar',
    searchPlaceholder: 'Buscar por nombre o identificador',
    searchAction: 'Buscar',
    healthEventType: {
      label: 'Tipo de evento',
      any: 'Cualquier tipo',
      vacunacion: 'Vacunación',
      desparasitacion: 'Desparasitación',
      revision: 'Revisión',
      otro: 'Otro',
    },
    dateFrom: 'Desde',
    dateTo: 'Hasta',
    clearFilters: 'Limpiar',
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
  detail: {
    back: 'Volver a animales',
    birthDate: 'Fecha de nacimiento',
    notes: 'Notas',
    notSpecified: 'No especificado',
    loading: 'Cargando animal…',
    error: 'No se pudo cargar el animal.',
  },
  editForm: {
    title: 'Editar animal',
    submit: { idle: 'Guardar cambios', loading: 'Guardando…' },
    success: 'Animal actualizado correctamente.',
  },
  deleteConfirm: {
    message: '¿Está seguro de que desea eliminar este animal? Esta acción no se puede deshacer.',
  },
};

export type AnimalsTranslations = typeof esAnimals;
