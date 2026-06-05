# Estructura del Proyecto — Plataforma de Gestión de Animales de Trabajo y Producción

> **Monorepo** con dos paquetes: `backend/` (Django REST) y `frontend/` (Next.js).
> Para el frontend, la **autoridad de convenciones** es
> [`nextjs-frontend-dev.SKILL.md`](nextjs-frontend-dev.SKILL.md). Si este
> documento y la skill difieren en algo del frontend, **gana la skill**.

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Python + Django | 6.x |
| API REST | Django REST Framework | 3.17 |
| Autenticación | djangorestframework-simplejwt (JWT) | 5.x |
| CORS | django-cors-headers | 4.x |
| Frontend | Next.js (App Router) + React | 16.x / React 19 |
| Lenguaje frontend | TypeScript (estricto) | 5.x |
| Estilos | Tailwind CSS | 4.x |
| Iconos | lucide-react | 1.x |
| i18n | Sistema propio (es/en), idioma por defecto `es` | — |
| Base de datos (dev) | SQLite | — |
| Base de datos (prod) | PostgreSQL | 16+ |
| CI/CD | GitHub Actions (conectado a Jira) | — |
| Deploy Backend | Railway | — |
| Deploy Frontend | Vercel | — |

---

## Árbol de Directorios (monorepo)

```
Admin-Project-3/
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI: backend (migrate+test) + frontend (typecheck+lint+build)
│
├── docs/
│   ├── deployment.md               # Guía de despliegue (Railway + Vercel)
│   └── jira-integration.md         # Conexión GitHub ↔ Jira ↔ CI/CD
│
├── backend/                        # Servidor Django (API REST)
│   ├── .env.example
│   ├── requirements.txt
│   ├── manage.py
│   ├── finca/                      # Configuración central (settings, urls, wsgi)
│   ├── animals/                    # App: registro e identificación (modelo Animal)
│   ├── health/                     # App: historial clínico (modelo HealthEvent)
│   ├── feeding/                    # App: alimentación (modelo FeedingRecord)
│   └── location/                   # App: ubicación (modelos Farm, AnimalLocation)
│
├── frontend/                       # Cliente Next.js (App Router) — sigue la SKILL
│   ├── .env.local.example          # NEXT_PUBLIC_API_URL
│   ├── package.json                # scripts: dev/build/start/typecheck/lint
│   ├── eslint.config.mjs
│   ├── tsconfig.json               # alias "@/*" → src/*
│   └── src/
│       ├── app/                    # Capa Next.js (App Router)
│       │   ├── layout.tsx          # Root layout (envuelve en I18nProvider)
│       │   ├── page.tsx            # Renderiza la pantalla orquestadora
│       │   ├── globals.css         # @import "tailwindcss"
│       │   ├── providers/          # i18n-provider.tsx
│       │   ├── routes/routes.ts    # Catálogo de rutas internas (no hardcodear)
│       │   ├── ui/                 # Pantallas orquestadoras (<nombre>-page.tsx)
│       │   └── styles/             # <nombre>-page.styles.ts
│       │
│       ├── features/               # Casos de uso por dominio (registro, salud, ...)
│       │   └── <dominio>/<feature>/{api,hooks,model,ui,index.ts}
│       │
│       ├── widgets/                # Bloques visuales por área (navbar, paneles)
│       │
│       ├── entities/               # Entidades de negocio + repositorios (API)
│       │   └── animal/model/
│       │       ├── animal.types.ts        # Tipo de dominio (camelCase)
│       │       └── animal.repository.ts   # Llama a la API, mapea DTO↔dominio
│       │
│       ├── shared/                 # Reuso sin conocimiento de dominio
│       │   ├── api/
│       │   │   ├── http-client.ts  # fetch tipado con JWT + HttpError
│       │   │   └── api-routes.ts   # Catálogo de endpoints del backend
│       │   ├── constants/          # app, html-attributes, icon-sizes, storage-keys, autocomplete
│       │   ├── hooks/              # use-session.ts
│       │   ├── lib/
│       │   │   ├── session/        # session-store.ts (useSyncExternalStore) + types
│       │   │   └── storage/        # browser-storage.ts (abstracción de localStorage)
│       │   └── ui/                 # Button, Container, ... (<comp>/ui/<comp>.tsx + .styles.ts)
│       │
│       └── i18n/                   # config, types, translations, locales/{es,en}
│
├── .gitignore
├── README.md
├── project-structure.md            # Este archivo
├── development-plan.md             # Plan por sprints
└── nextjs-frontend-dev.SKILL.md    # AUTORIDAD de convenciones del frontend
```

---

## Modelos de Base de Datos (backend)

### Animal
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | AutoField | Clave primaria |
| `name` | CharField | Nombre o identificador del animal |
| `identifier` | CharField (unique) | Código único de identificación |
| `category` | CharField (choices) | trabajo / produccion / consumo |
| `species` | CharField | Especie (vaca, caballo, cerdo, etc.) |
| `birth_date` | DateField | Fecha de nacimiento (opcional) |
| `notes` | TextField | Observaciones generales |

### HealthEvent
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `animal` | FK → Animal | Animal al que pertenece el evento |
| `event_type` | CharField (choices) | vacunacion / desparasitacion / revision / otro |
| `date` | DateField | Fecha del evento |
| `description` | TextField | Detalle del evento |

### FeedingRecord
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `animal` | FK → Animal | Animal al que pertenece el registro |
| `date` | DateField | Fecha del registro |
| `food_type` | CharField | Tipo de alimento |
| `quantity` | CharField | Cantidad (texto libre, ej. "2 kg") |

### Farm / AnimalLocation
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Farm.name` | CharField | Nombre de la finca |
| `AnimalLocation.animal` | FK → Animal | Animal ubicado |
| `AnimalLocation.farm` | FK → Farm | Finca donde se encuentra |
| `AnimalLocation.lot` | CharField | Lote o potrero actual |
| `AnimalLocation.assigned_at` | DateField | Fecha de asignación |
| `AnimalLocation.is_current` | BooleanField | Si es la ubicación actual |

---

## Endpoints API (contrato frontend ↔ backend)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/token/` | Obtener JWT (login) |
| POST | `/api/token/refresh/` | Renovar token |
| GET/POST | `/api/animals/` | Listar / crear animales (`?category=`, `?search=`) |
| GET/PUT/DELETE | `/api/animals/{id}/` | Detalle / editar / eliminar |
| GET/POST | `/api/health/` | Eventos de salud (`?animal={id}`) |
| GET/POST | `/api/feeding/` | Registros de alimentación (`?animal={id}`) |
| GET/POST | `/api/location/farms/` | Fincas |
| GET/POST | `/api/location/assignments/` | Ubicaciones (`?animal=`, `?farm=`) |

> En el frontend, estos paths viven centralizados en
> `frontend/src/shared/api/api-routes.ts`. Los repositorios de entidad mapean el
> snake_case de DRF al camelCase del dominio.

---

## Comandos de Desarrollo

### Backend
```bash
python -m venv backend/.venv
backend/.venv/Scripts/activate            # Windows (PowerShell: backend\.venv\Scripts\Activate.ps1)
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
python backend/manage.py migrate
python backend/manage.py runserver        # http://localhost:8000/api/
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # next build
```

---

## Variables de Entorno

### backend/.env
```env
SECRET_KEY=tu-clave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> Nota: el frontend Next.js corre por defecto en el puerto **3000**, por lo que
> `CORS_ALLOWED_ORIGINS` en el backend debe incluir `http://localhost:3000`.

---

## CI/CD — GitHub Actions + Jira

El pipeline `.github/workflows/ci.yml` se ejecuta en cada `push` y Pull Request a
`main`/`dev`:

1. **Job backend**: Python 3.12 → instala deps → `migrate` → `manage.py test`.
2. **Job frontend**: Node 20 → `npm ci` → `npm run typecheck` → `npm run lint` →
   `npm run build`.

La conexión con **Jira** es por convención (app *GitHub for Jira*): incluir la
clave del issue `PGAT-XX` en rama/commit/PR hace que Jira muestre commits, PRs y
el estado de los builds del pipeline. Ver [docs/jira-integration.md](docs/jira-integration.md).
