# Despliegue (CD)

Guía de despliegue del monorepo PGAT. Backend en Railway, frontend en Vercel.
Ambos se conectan al repositorio de GitHub y despliegan automáticamente en cada
push a la rama de producción (`main`).

## Backend (Django REST) — Railway

1. Crear un proyecto en [Railway](https://railway.app) y conectar el repo de GitHub.
2. **Root Directory:** `backend`.
3. Añadir un servicio **PostgreSQL** (Railway provee `DATABASE_URL`).
4. Variables de entorno del servicio:
   - `SECRET_KEY` — clave secreta de Django (generar una nueva).
   - `DEBUG` — `False`.
   - `ALLOWED_HOSTS` — dominio asignado por Railway.
   - `CORS_ALLOWED_ORIGINS` — URL del frontend en Vercel.
5. Build/Start:
   - Build: `pip install -r requirements.txt`
   - Start: `python manage.py migrate && gunicorn finca.wsgi`
   - (Añadir `gunicorn` y `dj-database-url`/`psycopg2-binary` a `requirements.txt`
     antes del primer deploy productivo con PostgreSQL.)

## Frontend (Next.js) — Vercel

1. Importar el repo en [Vercel](https://vercel.com).
2. **Root Directory:** `frontend`.
3. Framework Preset: **Next.js** (autodetectado).
4. Variable de entorno:
   - `NEXT_PUBLIC_API_URL` — URL pública del backend en Railway.
5. Deploy. Vercel reconstruye en cada push a `main` y genera previews por PR.

## Verificación post-deploy

- El frontend carga en la URL de Vercel.
- El login (`POST /api/token/`) responde desde el backend de Railway.
- Un flujo end-to-end (registrar animal → salud → ubicación) funciona contra la
  base de datos de producción.

## Conexión con Jira

Los despliegues y builds quedan visibles en Jira si el commit/PR referencia la
clave `PGAT-XX` (ver [jira-integration.md](jira-integration.md)).
