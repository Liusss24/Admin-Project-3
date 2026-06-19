export const esHealth = {
  section: 'Eventos de salud',
  actions: {
    add: 'Registrar evento',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    retry: 'Reintentar',
  },
  form: {
    title: 'Nuevo evento de salud',
    fields: {
      eventType: { label: 'Tipo de evento', placeholder: 'Selecciona un tipo' },
      date: { label: 'Fecha del evento' },
      description: { label: 'Descripción', placeholder: 'Detalle del evento de salud' },
    },
    submit: { idle: 'Guardar evento', loading: 'Guardando…' },
    success: 'Evento de salud registrado correctamente.',
  },
  eventTypes: {
    vacunacion: 'Vacunación',
    desparasitacion: 'Desparasitación',
    revision: 'Revisión',
    otro: 'Otro',
  },
  card: {
    type: 'Tipo',
    date: 'Fecha',
  },
  list: {
    empty: 'No hay eventos de salud registrados.',
    error: 'No se pudieron cargar los eventos de salud.',
  },
};

export type HealthTranslations = typeof esHealth;
