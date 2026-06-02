# PGAT — Plataforma de Gestión de Animales de Trabajo y Producción

Proyecto 3 de Administración de Proyectos — Aarón Líos y María Paula Castillo.

Plataforma web (MVP) para que fincas ganaderas registren y den seguimiento
individual a sus animales: registro e identificación, salud e historial clínico,
alimentación, clasificación por categoría y ubicación por finca/lote.

## Monorepo

| Carpeta | Descripción | Stack |
|---------|-------------|-------|
| `backend/` | API REST + base de datos | Django 6 + DRF + JWT (SQLite → PostgreSQL) |
| `frontend/` | Aplicación web | Next.js 16 (App Router) + TypeScript + Tailwind 4 |
| `docs/` | Despliegue e integración Jira | — |

## Puesta en marcha

### Backend
```bash
python -m venv backend/.venv
backend\.venv\Scripts\Activate.ps1        # Windows PowerShell
pip install -r backend/requirements.txt
copy backend\.env.example backend\.env    # configurar variables
python backend/manage.py migrate
python backend/manage.py runserver        # http://localhost:8000/api/
```

### Frontend
```bash
cd frontend
npm install
copy .env.local.example .env.local        # NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev                               # http://localhost:3000
```

## Documentación

- [project-structure.md](project-structure.md) — estructura del monorepo, modelos y endpoints.
- [development-plan.md](development-plan.md) — plan de desarrollo por sprints.
- [nextjs-frontend-dev.SKILL.md](nextjs-frontend-dev.SKILL.md) — **autoridad de convenciones del frontend**.
- [docs/deployment.md](docs/deployment.md) — despliegue (Railway + Vercel).
- [docs/jira-integration.md](docs/jira-integration.md) — conexión GitHub ↔ Jira ↔ CI/CD.

## Convenciones

- **Commits:** Conventional Commits con scope de issue de Jira — `feat(PGAT-22): ...` (en inglés, sin co-autoría).
- **Ramas:** `feature/PGAT-XX-descripcion`.
- **Calidad frontend:** `npm run typecheck` y `npm run lint` deben pasar antes de cerrar un cambio.
