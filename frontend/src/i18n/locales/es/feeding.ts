export const esFeeding = {
  section: 'Registros de alimentación',
  actions: {
    add: 'Registrar alimentación',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    retry: 'Reintentar',
  },
  form: {
    title: 'Nuevo registro de alimentación',
    fields: {
      date: { label: 'Fecha' },
      foodType: { label: 'Tipo de alimento', placeholder: 'Ej. Heno, Maíz, Concentrado' },
      quantity: { label: 'Cantidad (opcional)', placeholder: 'Ej. 5 kg' },
      notes: { label: 'Notas (opcional)', placeholder: 'Observaciones adicionales' },
    },
    submit: { idle: 'Guardar registro', loading: 'Guardando…' },
    success: 'Registro de alimentación guardado correctamente.',
  },
  card: {
    foodType: 'Alimento',
    quantity: 'Cantidad',
    date: 'Fecha',
  },
  list: {
    empty: 'No hay registros de alimentación.',
    error: 'No se pudieron cargar los registros de alimentación.',
  },
};

export type FeedingTranslations = typeof esFeeding;
