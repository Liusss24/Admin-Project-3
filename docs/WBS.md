# WBS/EDT — Proyecto PGAT (corregido)
## Plataforma de Gestión de Animales de Trabajo y Producción

**Versión:** 2.0 (corregida y alineada al desarrollo real)
**Fecha:** Junio 2026
**Estado:** Activo
**Deadline (Go-Live):** 23 de junio de 2026
**Patrocinador:** Marvin Campos

---

### Leyenda de estado

| Símbolo | Significado |
|---------|-------------|
| ✓ | Completado |
| ◐ | En progreso |
| ☐ | Pendiente (dentro del alcance MVP) |
| ⊘ | **Fuera de alcance MVP** (Fase 2 / futuro) |

### Stack real del proyecto (corrige el WBS v1.0)

| Capa | Tecnología |
|------|-----------|
| Backend | **Python + Django 6 + Django REST Framework** |
| Auth | **djangorestframework-simplejwt (JWT)** |
| Frontend | **Next.js 16 (App Router) + TypeScript estricto** |
| Estilos / Iconos | **Tailwind CSS 4 + lucide-react** |
| Estado / HTTP | **`useSyncExternalStore` + `fetch` tipado** (sin Zustand ni Axios) |
| Base de datos | **SQLite (dev) → PostgreSQL (prod)** |
| ORM | **Django ORM** (sin Drizzle) |
| Build | **Turbopack** (Next 16) |
| CI/CD | **GitHub Actions** (conectado a Jira) |
| Despliegue | **Railway (backend) + Vercel (frontend)** |

> Monorepo: `backend/` (Django) + `frontend/` (Next.js) + `docs/`.
> Autoridad de convenciones del frontend: `nextjs-frontend-dev.SKILL.md`.

### Mapeo a Sprints (Jira)

| Sprint | Fechas | Foco | Issues |
|--------|--------|------|--------|
| Sprint 1 | 19 may – 1 jun | Iniciación, planificación y setup | setup |
| Sprint 2 | 2 – 8 jun | Registro individual de animales | PGAT-22 |
| Sprint 3 | 9 – 15 jun | CI/CD + salud/alimentación + clasificación | PGAT-26, 27, 29, 30 |
| Sprint 4 | 16 – 19 jun | Ubicación + integración + pruebas | PGAT-37, 38, 39 |
| Sprint 5 | 20 – 23 jun | Refinamiento y cierre (Go-Live) | PGAT-40 |

---

## 1. INICIACIÓN Y PLANIFICACIÓN — *(Sprint 1)*

### 1.1 Definición del Proyecto
- 1.1.1 ✓ Acta de constitución (Project Charter)
- 1.1.2 ✓ Identificación de stakeholders (dueños de finca, operarios, patrocinador, equipo)
- 1.1.3 ✓ Definición de objetivos y alcance
- 1.1.4 ✓ Criterios de éxito (módulos críticos, perfil <2s, registro ≤3 clics)

### 1.2 Análisis de Requisitos
- 1.2.1 ✓ Requisitos funcionales (registro, salud, alimentación, clasificación, ubicación)
- 1.2.2 ✓ Requisitos no funcionales (responsive, usabilidad para campo, BD relacional)
- 1.2.3 ☐ Matriz de trazabilidad requisitos ↔ criterios de aceptación
- 1.2.4 ◐ Validación con el cliente (feedback al cierre de cada sprint)

### 1.3 Planificación Técnica
- 1.3.1 ✓ Stack tecnológico (Django/DRF + Next.js/TS/Tailwind — ver tabla)
- 1.3.2 ✓ Arquitectura del sistema (monorepo, API REST + SPA)
- 1.3.3 ✓ Diseño de base de datos relacional
- 1.3.4 ✓ Estándares de codificación (SKILL del frontend, Conventional Commits con scope PGAT)
- 1.3.5 ✓ Plan de CI/CD (GitHub Actions + Railway/Vercel)

### 1.4 Planificación de Recursos
- 1.4.1 ◐ Estimación de esfuerzo (story points en Jira)
- 1.4.2 ✓ Asignación de roles del equipo
- 1.4.3 ☐ Plan de capacitación del equipo
- 1.4.4 ✓ Calendario de sprints/disponibilidad

### 1.5 Gestión de Riesgos
- 1.5.1 ✓ Identificación de riesgos (conectividad rural, tiempos de sprint, usabilidad)
- 1.5.2 ☐ Análisis cualitativo de riesgos
- 1.5.3 ☐ Plan de respuesta a riesgos
- 1.5.4 ☐ Matriz de riesgos

### 1.6 Configuración de Herramientas
- 1.6.1 ✓ Repositorio Git (ramas `main`/`dev`/`Sprint-*`)
- 1.6.2 ◐ Jira + sprints + conexión con GitHub (ver `docs/jira-action-plan.md`)
- 1.6.3 ☐ Entornos: desarrollo ✓ · staging ⊘ · producción ◐
- 1.6.4 ✓ CI configurado (GitHub Actions)
- 1.6.5 ⊘ Wiki/Confluence

---

## 2. DISEÑO Y ARQUITECTURA — *(Sprint 1)*

### 2.1 Diseño de Base de Datos
- 2.1.1 ✓ Modelado de entidades: **Animal, HealthEvent, FeedingRecord, Farm, AnimalLocation**, User
- 2.1.2 ✓ Tablas y relaciones (FKs Animal→eventos; Farm→AnimalLocation)
- 2.1.3 ◐ Esquema de seguridad/permisos (JWT; RBAC multi-rol → Fase 2)
- 2.1.4 ✓ Migraciones de inicialización (Django migrations)
- 2.1.5 ☐ Documentación de BD (en `project-structure.md`)

### 2.2 Diseño de API
- 2.2.1 ☐ Especificación OpenAPI/Swagger (`drf-spectacular`) *(deseable)*
- 2.2.2 ✓ Endpoints principales (animals, health, feeding, location, token)
- 2.2.3 ✓ Autenticación/autorización (JWT con simplejwt)
- 2.2.4 ✓ Manejo de errores (DRF + `HttpError` en el cliente)
- 2.2.5 ⊘ Rate limiting avanzado

### 2.3 Diseño de Interfaz de Usuario
- 2.3.1 ☐ Wireframes de vistas principales
- 2.3.2 ☐ Prototipo de navegación
- 2.3.3 ✓ Especificación de componentes UI (`shared/ui` + tabla §6 de la SKILL)
- 2.3.4 ✓ Paleta y tipografía (Tailwind; colores por categoría)
- 2.3.5 ◐ Design System (componentes base; en construcción por sprint)
- 2.3.6 ☐ Mockups de pantallas finales

### 2.4 Arquitectura de Aplicación
- 2.4.1 ✓ Diagrama/estructura del sistema (monorepo backend+frontend)
- 2.4.2 ✓ Estructura de carpetas (feature-sliced: `app/features/widgets/entities/shared/i18n`)
- 2.4.3 ✓ Patrón arquitectónico (DRF ViewSets/serializers; hooks + Result tipado + repositorios)
- 2.4.4 ✓ Plan de modularización (apps Django; features por dominio)

---

## 3. DESARROLLO BACKEND (Django + DRF) — *(Sprints 2–4)*

### 3.1 Configuración Inicial del Backend
- 3.1.1 ✓ Setup de proyecto Django (`finca`) + DRF
- 3.1.2 ✓ Variables de entorno (`python-decouple`, `.env`)
- 3.1.3 ◐ Logging (logging de Django) *(reemplaza Winston/Morgan)*
- 3.1.4 ✓ CORS (`django-cors-headers`) y seguridad básica

### 3.2 Implementación de Base de Datos
- 3.2.1 ✓ SQLite (dev) · ◐ PostgreSQL (prod)
- 3.2.2 ✓ **Django ORM** *(reemplaza Drizzle)*
- 3.2.3 ✓ Migraciones · ◐ seeding de datos de prueba (2 fincas)
- 3.2.4 ✓ Validación de integridad (unique `identifier`, choices de categoría)
- 3.2.5 ⊘ Backup/restore procedures

### 3.3 Autenticación y Autorización — *(Sprint 2)*
- 3.3.1 ✓ JWT (simplejwt: `/api/token/`, `/api/token/refresh/`)
- 3.3.2 ⊘ Sistema de roles (Admin/Veterinario/Trabajador) → **Fase 2** (hoy: usuario único)
- 3.3.3 ✓ Login (frontend `AuthGuard` + sesión)
- 3.3.4 ✓ Refresh tokens (refresh transparente en `http-client`)
- 3.3.5 ⊘ Validación de permisos por rol → Fase 2
- 3.3.6 ☐ Recuperación de contraseña *(deseable)*

### 3.4 API de Gestión de Animales — *(Sprint 2 · PGAT-22)*
- 3.4.1 ✓ `GET /api/animals/` (listar, paginado)
- 3.4.2 ✓ `GET /api/animals/{id}/`
- 3.4.3 ✓ `POST /api/animals/`
- 3.4.4 ✓ `PUT /api/animals/{id}/`
- 3.4.5 ✓ `DELETE /api/animals/{id}/`
- 3.4.6 ✓ Validaciones de entrada (serializer)
- 3.4.7 ✓ Paginación + filtro `?category=` + búsqueda `?search=`

### 3.5 API de Salud — *(Sprint 3 · PGAT-29)*
- 3.5.1 ◐ `POST /api/health/` (crear evento: tipo, fecha, descripción)
- 3.5.2 ◐ `GET /api/health/?animal={id}` (historial)
- 3.5.3 ◐ `GET/PUT/DELETE /api/health/{id}/`
- 3.5.4 ◐ Validaciones (choices de `event_type`)

### 3.6 API de Alimentación (y crecimiento) — *(Sprint 3 · PGAT-29)*  *(módulo añadido)*
- 3.6.1 ◐ `POST /api/feeding/` (fecha, tipo de alimento, cantidad)
- 3.6.2 ◐ `GET /api/feeding/?animal={id}` (historial)
- 3.6.3 ◐ `GET/PUT/DELETE /api/feeding/{id}/`
- 3.6.4 ☐ Registro de peso/crecimiento *(opcional, parte del módulo)*

### 3.7 API de Clasificación por Categoría — *(Sprint 3 · PGAT-30)*
- 3.7.1 ✓ Filtro/validación por categoría (trabajo/producción/consumo) en el ViewSet de animales

### 3.8 API de Ubicación — *(Sprint 4 · PGAT-37)*  *(módulo añadido — faltaba en v1.0)*
- 3.8.1 ◐ `GET/POST /api/location/farms/` (fincas)
- 3.8.2 ◐ `GET/POST /api/location/assignments/` (asignar lote/potrero)
- 3.8.3 ◐ Marcar ubicación actual (`is_current`) al reasignar
- 3.8.4 ◐ Filtros `?animal=` / `?farm=`

### 3.9 Pruebas de Backend — *(transversal)*
- 3.9.1 ✓ Tests del módulo de animales (11 tests, `animals/tests.py`)
- 3.9.2 ◐ Tests de salud / alimentación / ubicación

### 3.10 Gestión de Usuarios (RBAC) — ⊘ **Fase 2**
- 3.10.1–3.10.6 ⊘ CRUD de usuarios, cambio de rol, unicidad de email

### 3.11 Reportes y Estadísticas — ⊘ **Fase 2** *(no es módulo del charter)*
- 3.11.1–3.11.4 ⊘ Reportes de salud/producción, estadísticas de población/enfermedades

### 3.12 Logging/Auditoría y Performance — ⊘ **Fase 2** (salvo logging básico)
- 3.12.x ⊘ Auditoría de cambios, índices avanzados, caché, compresión

---

## 4. DESARROLLO FRONTEND (Next.js) — *(Sprints 2–5)*

### 4.1 Configuración Inicial del Frontend
- 4.1.1 ✓ Proyecto Next.js 16 (App Router) + TypeScript
- 4.1.2 ✓ Build con Turbopack *(reemplaza Vite/Webpack)*
- 4.1.3 ✓ Routing (App Router + `routes.ts`) *(reemplaza React Router)*
- 4.1.4 ✓ Estado: `useSyncExternalStore` *(reemplaza Zustand)*
- 4.1.5 ✓ HTTP: `fetch` tipado en `http-client.ts` con JWT *(reemplaza Axios)*

### 4.2 Componentes Base y Utilidades
- 4.2.1 ✓ Componentes UI (`Button`, `Container`, `FormField`, `Input`, `Select`, `StatusMessage`, `CategoryBadge`)
- 4.2.2 ✓ Hooks (`useSession`, `useFieldErrors`, hooks de feature)
- 4.2.3 ✓ Contexto de i18n (`I18nProvider`) + sesión (store JWT)
- 4.2.4 ✓ Manejo de auth en `http-client` (Bearer + refresh 401)
- 4.2.5 ✓ Validadores/formatters por feature (`model/`)

### 4.3 Autenticación en Frontend — *(Sprint 2)*
- 4.3.1 ✓ Página de login (`/login`)
- 4.3.2 ⊘ Registro de usuario público → Fase 2 (alta la hace admin)
- 4.3.3 ☐ Recuperación de contraseña *(deseable)*
- 4.3.4 ✓ Persistencia de sesión (localStorage de tokens)
- 4.3.5 ✓ Logout y redirección (`AuthGuard`)

### 4.4 Dashboard / Layout — *(Sprint 4)*
- 4.4.1 ◐ Layout principal
- 4.4.2 ✓ Navbar / navegación (`widgets/navigation/navbar`)
- 4.4.3 ☐ Widget de bienvenida / resumen
- 4.4.4 ☐ Resumen de estadísticas básicas
- 4.4.5 ☐ Notificaciones/alertas *(deseable)*
- 4.4.6 ◐ Responsive design (breakpoints Tailwind)

### 4.5 Módulo de Gestión de Animales — *(Sprint 2 · PGAT-22)*
- 4.5.1 ✓ Listado de animales (`animal-list`)
- 4.5.2 ✓ Búsqueda y filtrado por categoría
- 4.5.3 ◐ Detalle de animal individual *(Sprint 3)*
- 4.5.4 ✓ Formulario de crear animal (`animal-form`)
- 4.5.5 ☐ Formulario de editar animal
- 4.5.6 ☐ Confirmación de eliminación
- 4.5.7 ⊘ Exportación CSV/PDF → Fase 2

### 4.6 Módulo de Salud — *(Sprint 3 · PGAT-29)*
- 4.6.1 ◐ Historial de salud (en detalle del animal)
- 4.6.2 ◐ Formulario de nuevo evento de salud
- 4.6.3 ☐ Edición de eventos
- 4.6.4 ⊘ Gráficos de tendencias → Fase 2
- 4.6.5 ☐ Alertas de vacunación próxima *(deseable)*
- 4.6.6 ⊘ Timeline visual → Fase 2

### 4.7 Módulo de Alimentación — *(Sprint 3 · PGAT-29)*  *(módulo añadido)*
- 4.7.1 ◐ Registro de alimentación (fecha, tipo, cantidad)
- 4.7.2 ◐ Historial de alimentación en el perfil del animal

### 4.8 Módulo de Clasificación — *(Sprint 3 · PGAT-30)*
- 4.8.1 ✓ Filtro/visualización por categoría (badges de color)

### 4.9 Módulo de Ubicación — *(Sprint 4 · PGAT-37)*  *(módulo añadido — faltaba en v1.0)*
- 4.9.1 ◐ Lista de fincas con conteo de animales
- 4.9.2 ◐ Asignar/actualizar ubicación (lote/potrero) en el perfil
- 4.9.3 ◐ Agrupar/listar animales por finca

### 4.10 Internacionalización y Configuración
- 4.10.1 ✓ i18n es/en (default es) — `I18nProvider` + catálogos
- 4.10.2 ☐ Perfil de usuario (cambiar contraseña) *(deseable)*
- 4.10.3 ⊘ Tema oscuro/claro → Fase 2 (hay estilos dark básicos)
- 4.10.4 ☐ Selector de idioma en la UI

### 4.11 Integración y Pruebas de UI — *(Sprint 4 · PGAT-38/39)*
- 4.11.1 ◐ Integrar módulos en un flujo end-to-end
- 4.11.2 ◐ Pruebas funcionales sobre el prototipo

### 4.12 Administración de Usuarios / Reportes (UI) — ⊘ **Fase 2**
- 4.12.x ⊘ Listado/edición de usuarios, asignación de roles, reportes, optimización avanzada

---

## 5. TESTING — ASEGURAMIENTO DE CALIDAD (QA) — *(transversal · Sprint 4)*

### 5.1 Planificación de Testing
- 5.1.1 ☐ Estrategia de testing
- 5.1.2 ☐ Plan de cobertura
- 5.1.3 ☐ Matriz de casos de prueba
- 5.1.4 ✓ Ambiente de testing (dev local + CI)

### 5.2 Testing Automatizado
- 5.2.1 ✓ Tests backend (Django `manage.py test`)
- 5.2.2 ◐ Tests de salud/alimentación/ubicación
- 5.2.3 ✓ Calidad frontend: `typecheck` + `lint` + `build` en CI
- 5.2.4 ☐ Tests unitarios de componentes/hooks (frontend) *(deseable)*

### 5.3 Testing de Integración — *(Sprint 4 · PGAT-39)*
- 5.3.1 ◐ Tests de endpoints API
- 5.3.2 ◐ Tests de flujos completos (registro→salud→alimentación→ubicación)
- 5.3.3 ◐ Smoke test e2e contra el servidor real

### 5.4 Testing Manual — *(Sprint 4–5)*
- 5.4.1 ◐ Casos funcionales con datos de 2 fincas
- 5.4.2 ☐ Compatibilidad de navegadores
- 5.4.3 ◐ Responsive en móvil/tablet
- 5.4.4 ◐ Verificación de tiempos (perfil <2s, registro ≤3 clics)
- 5.4.5 ◐ Usabilidad para personal de campo

### 5.5 Gestión de Defectos — *(Sprint 4)*
- 5.5.1 ◐ Registro de bugs · 5.5.2 ◐ Priorización · 5.5.3 ◐ Seguimiento · 5.5.4 ◐ Verificación

### 5.6 Testing de Seguridad / Performance / Staging — ⊘ **Fase 2** (salvo validaciones básicas)
- 5.6.x ⊘ Pentesting (SQLi/XSS/CSRF), load/stress testing, staging dedicado

---

## 6. INTEGRACIÓN CONTINUA Y DESPLIEGUE (CI/CD) — *(Sprint 3 · PGAT-26/27)*

### 6.1 Configuración de CI
- 6.1.1 ✓ Pipeline en GitHub Actions
- 6.1.2 ✓ Triggers en push/PR (`main`/`dev`)
- 6.1.3 ✓ Estadios: backend (migrate+test) · frontend (typecheck+lint+build)
- 6.1.4 ◐ Notificaciones de fallos / reflejo en Jira

### 6.2 Despliegue (CD)
- 6.2.1 ◐ Backend en **Railway** (root `backend/`)
- 6.2.2 ◐ Frontend en **Vercel** (root `frontend/`)
- 6.2.3 ☐ Variables de entorno productivas (`NEXT_PUBLIC_API_URL`, `DATABASE_URL`, etc.)
- 6.2.4 ◐ Proceso documentado (`docs/deployment.md`)
- 6.2.5 ✓ Conexión CI ↔ Jira por convención `PGAT-XX` (`docs/jira-integration.md`)

### 6.3 Dockerización / Registry / Zero-downtime / Rollback — ⊘ **Fase 2**
- 6.3.x ⊘ Dockerfiles, docker-compose, deploy zero-downtime, rollback automático

---

## 7. DOCUMENTACIÓN — *(transversal)*

### 7.1 Documentación Técnica
- 7.1.1 ✓ Arquitectura (`project-structure.md`) y convenciones (`nextjs-frontend-dev.SKILL.md`)
- 7.1.2 ◐ Documentación de BD (modelos)
- 7.1.3 ☐ API docs (OpenAPI) *(deseable)*
- 7.1.4 ◐ Documentación de componentes frontend (tabla §6 de la SKILL)
- 7.1.5 ✓ Guía de despliegue e integración Jira (`docs/`)

### 7.2 Documentación de Usuario — *(Sprint 5)*
- 7.2.1 ☐ Manual de usuario (admin y trabajadores de campo) — *entregable del charter*
- 7.2.2 ☐ Guías de características principales
- 7.2.3 ⊘ FAQs · 7.2.4 ⊘ Troubleshooting · 7.2.5 ⊘ Video tutorials

### 7.3 Documentación de Proyecto — *(Sprint 1 y 5)*
- 7.3.1 ✓ Acta de constitución
- 7.3.2 ☐ Matriz RACI · 7.3.3 ☐ Plan de comunicación
- 7.3.4 ☐ Lecciones aprendidas · 7.3.5 ☐ Cierre de proyecto

---

## 8. CAPACITACIÓN Y ONBOARDING — *(Sprint 5)* *(reducido para MVP)*

- 8.1 ☐ Onboarding técnico del equipo (setup, convenciones, flujo Git/PR)
- 8.2 ☐ Capacitación de usuarios (demo a admin/operarios)
- 8.3 ☐ Guía rápida de inicio + checklist de setup
- 8.4 ⊘ Capacitación formal por rol, sesiones Q&A extensas → Fase 2

---

## 9. MONITOREO, MANTENIMIENTO Y SOPORTE — ⊘ **Fase 2 (post Go-Live)**

- 9.1 ⊘ Monitoreo (Prometheus/DataDog/ELK) y dashboards
- 9.2 ⊘ Soporte L1/L2/L3, ticketing, SLAs, escalamiento
- 9.3 ◐ Mantenimiento básico (actualización de dependencias, patches)
- 9.4 ⊘ Análisis de uptime/errores/uso

> Para el MVP basta con: logs de la plataforma de hosting + revisión manual.

---

## 10. CIERRE DE PROYECTO — *(Sprint 5 · PGAT-40)*

### 10.1 Validación de Entregables
- 10.1.1 ☐ Checklist de aceptación (100% módulos críticos)
- 10.1.2 ◐ Regresión final
- 10.1.3 ☐ Verificación de requisitos vs. criterios
- 10.1.4 ☐ Sign-off del patrocinador

### 10.2 Transición a Producción (Go-Live)
- 10.2.1 ☐ Decisión Go/No-go
- 10.2.2 ☐ Demo/simulación con datos de 2 fincas — *entregable del charter*
- 10.2.3 ◐ Despliegue productivo (Railway + Vercel)
- 10.2.4 ☐ Validación en producción

### 10.3 Cierre Administrativo
- 10.3.1 ⊘ Cierre de contratos *(no aplica al contexto académico)*
- 10.3.2 ☐ Archivado de documentación (repo + `docs/`)
- 10.3.3 ⊘ Devolución de recursos · 10.3.4 ⊘ CMDB

### 10.4 Lecciones Aprendidas
- 10.4.1 ☐ Retrospectiva del proyecto
- 10.4.2 ☐ Documentación de lecciones
- 10.4.3 ☐ Recomendaciones para Fase 2
- 10.4.4 ☐ Cierre

---

## RESUMEN DE ENTREGABLES (alineado al charter)

| Fase | Entregables MVP | Estado |
|------|-----------------|--------|
| 1. Iniciación | Charter, requisitos, arquitectura, setup, Jira | ✓/◐ |
| 2. Diseño | Modelos BD, API, estructura, Design System base | ✓/◐ |
| 3. Backend | API animals ✓, salud/alimentación/ubicación ◐, JWT ✓ | ◐ |
| 4. Frontend | Auth ✓, animales ✓, salud/alimentación/ubicación ◐, i18n ✓ | ◐ |
| 5. QA | Tests backend ✓, CI ✓, pruebas funcionales ◐ | ◐ |
| 6. CI/CD | CI ✓, CD a Railway/Vercel ◐ | ◐ |
| 7. Documentación | Técnica ✓, manual de usuario ☐ | ◐ |
| 8. Capacitación | Demo/onboarding básico | ☐ |
| 10. Cierre | Demo 2 fincas, sign-off, Go-Live | ☐ |

**Excluido del MVP (Fase 2):** RBAC multi-rol, reportes/estadísticas, monitoreo
(Prometheus/ELK), soporte L1/L2/L3 + SLAs, dockerización, staging dedicado,
testing de seguridad/carga, exportaciones e historiales gráficos.

---

## NOTAS IMPORTANTES (Jira)

- **Deadlines / Story Points / Dependencias / Comunicación / Flexibilidad:**
  configurarlos en Jira siguiendo `docs/jira-action-plan.md`.
- **Commits y ramas:** Conventional Commits con scope `PGAT-XX`, ramas
  `feature/PGAT-XX-...` (ver `nextjs-frontend-dev.SKILL.md`).
- **Cambios de scope:** documentarlos formalmente (label `scope-change` en Jira)
  y actualizar este WBS, indicando el movimiento entre MVP y Fase 2.
