export const esAuth = {
  login: {
    title: 'Iniciar sesión',
    subtitle: 'Accede a la plataforma de gestión de animales.',
    fields: {
      username: { label: 'Usuario', placeholder: 'Tu usuario' },
      password: { label: 'Contraseña', placeholder: 'Tu contraseña' },
    },
    submit: { idle: 'Iniciar sesión', loading: 'Ingresando…' },
  },
  logout: 'Cerrar sesión',
};

export type AuthTranslations = typeof esAuth;
