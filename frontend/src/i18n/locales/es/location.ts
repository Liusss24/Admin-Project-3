export const esLocation = {
  section: 'Ubicación',
  page: {
    title: 'Fincas',
    subtitle: 'Gestiona las fincas y la asignación de animales por lote.',
    empty: 'No hay fincas registradas.',
    error: 'No se pudieron cargar las fincas.',
  },
  actions: {
    addFarm: 'Agregar finca',
    assign: 'Asignar ubicación',
    cancel: 'Cancelar',
    retry: 'Reintentar',
  },
  farm: {
    name: { label: 'Nombre', placeholder: 'Ej. Finca Norte' },
    description: { label: 'Descripción (opcional)', placeholder: 'Descripción de la finca' },
    animalCount: 'Animales',
    submit: { idle: 'Guardar finca', loading: 'Guardando…' },
    success: 'Finca registrada correctamente.',
  },
  assignment: {
    form: {
      title: 'Asignar ubicación',
      fields: {
        farm: { label: 'Finca', placeholder: 'Selecciona una finca' },
        lot: { label: 'Lote', placeholder: 'Ej. Lote A' },
        date: { label: 'Fecha de asignación' },
      },
      submit: { idle: 'Asignar', loading: 'Asignando…' },
      success: 'Ubicación asignada correctamente.',
    },
  },
  current: {
    label: 'Ubicación actual',
    farm: 'Finca',
    lot: 'Lote',
    since: 'Desde',
    none: 'Sin ubicación asignada.',
  },
  history: {
    label: 'Historial de ubicaciones',
    empty: 'Sin historial de ubicaciones.',
    error: 'No se pudo cargar el historial de ubicaciones.',
  },
};

export type LocationTranslations = typeof esLocation;
