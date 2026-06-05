# Plan de Desarrollo — Plataforma de Gestión de Animales de Trabajo y Producción

**Proyecto:** PGAT — Plataforma de Gestión de Animales de Trabajo y Producción
**Patrocinador:** Marvin Campos
**Metodología:** Scrum (sprints semanales)
**Stack:** Django REST Framework + React + TailwindCSS + SQLite → PostgreSQL

---

## Resumen de Sprints

| Sprint | Fechas | Enfoque | Entregable Principal |
|--------|--------|---------|---------------------|
| Sprint 1 | 19–26 May | Setup e infraestructura | Repo configurado, estructura base, CI corriendo |
| Sprint 2 | 2–8 Jun | Módulo de Registro de Animales (MVP) | CRUD completo de animales con categorización |
| Sprint 3 | 9–15 Jun | Salud, Alimentación y DevOps | Módulos de salud y alimentación + CI/CD activo |
| Sprint 4 | 16–19 Jun | Ubicación e Integración | Módulo de ubicación + flujo end-to-end funcional |
| Sprint 5 | 20–23 Jun | Cierre y Go-Live | Prototipo refinado listo para demostración |

---

## Sprint 1 — Setup e Infraestructura (19–26 May)
*Hito: Organización del proyecto, investigación de herramientas y elaboración del Project Charter*

### Objetivo
Tener el entorno de desarrollo configurado, el repositorio listo y el equipo alineado en el stack y arquitectura.

### Tareas Técnicas

#### 1.1 Inicialización del repositorio
- [x] Crear repositorio en GitHub con rama `main` (producción) y `dev` (desarrollo)
- [x] Configurar `.gitignore` para Python, Node y variables de entorno
- [x] Crear estructura de carpetas: `backend/`, `frontend/`, `.github/workflows/`
- [x] Crear `project-structure.md` con arquitectura del sistema

#### 1.2 Configuración del backend (Django)
- [x] Crear entorno virtual Python (`backend/.venv`)
- [x] Instalar: Django 6, DRF, simplejwt, django-cors-headers, python-decouple
- [x] Inicializar proyecto Django `finca` con apps: `animals`, `health`, `feeding`, `location`
- [x] Configurar `settings.py` con variables de entorno, JWT, CORS, internacionalización (es-cr)
- [x] Definir modelos de dominio: `Animal`, `HealthEvent`, `FeedingRecord`, `Farm`, `AnimalLocation`
- [x] Crear migraciones iniciales y aplicar sobre SQLite
- [x] Configurar `urls.py` con rutas de todas las apps y endpoints JWT
- [x] Crear serializers y viewsets CRUD para las 4 apps

#### 1.3 Configuración del frontend (Next.js + TypeScript) — sigue la SKILL
- [x] Inicializar proyecto con Next.js 16 (App Router) + TypeScript + Tailwind 4 (`frontend/`)
- [x] Configurar alias `@/*` → `src/*` y scripts `typecheck`/`lint`/`build`
- [x] Instalar `lucide-react` (iconos; nunca emojis)
- [x] Crear estructura feature-sliced: `app/`, `features/`, `widgets/`, `entities/`, `shared/`, `i18n/`
- [x] `shared/api/http-client.ts` (fetch tipado con JWT) + `shared/api/api-routes.ts`
- [x] `shared/lib/session/session-store.ts` (useSyncExternalStore) + `shared/lib/storage/browser-storage.ts`
- [x] Sistema i18n (es/en, default `es`) + `I18nProvider`
- [x] Entidad de referencia `entities/animal` (types + repository contra la API)
- [x] Componentes base `shared/ui` (Button, Container) + pantalla home

#### 1.4 CI/CD
- [x] Crear workflow `.github/workflows/ci.yml`
  - Job backend: Python 3.12 → instalar deps → migrate → test
  - Job frontend: Node 20 → npm ci → typecheck → lint → build
- [x] Conectar CI con Jira (convención `PGAT-XX` + app GitHub for Jira) — ver `docs/jira-integration.md`
- [ ] Validar que el pipeline pasa en GitHub Actions tras el primer push

#### 1.5 Documentación
- [x] Completar Project Charter
- [x] Documentar stack y arquitectura en `project-structure.md`
- [ ] Crear `README.md` con instrucciones de setup y comandos de desarrollo

### Criterios de Aceptación del Sprint
- El pipeline de CI pasa en verde en el primer push
- El servidor Django levanta en `localhost:8000` sin errores
- El frontend de Next.js levanta en `localhost:3000` sin errores
- `npm run typecheck` y `npm run lint` pasan limpios
- Los modelos de dominio están creados y migrados

---

## Sprint 2 — Planificación Base / Módulo de Registro (2–8 Jun)
*PGAT-22: [MVP] Módulo de registro individual de animales*

### Objetivo
Implementar el CRUD completo de animales con categorización, accesible desde una interfaz responsive.

### Tareas Técnicas

#### 2.1 Backend — API de Animales
- [x] Verificar y ajustar el endpoint `GET /api/animals/` con paginación
- [x] Implementar filtro por categoría: `GET /api/animals/?category=trabajo`
- [x] Implementar búsqueda por nombre/identificador: `GET /api/animals/?search=lola`
- [x] Escribir tests unitarios para el modelo `Animal` (11 tests en `animals/tests.py`, todos pasan):
  - Test: creación con campos válidos
  - Test: `identifier` único (no se repite)
  - Test: categoría obligatoria y restringida a choices válidos
  - Test: validación de campos obligatorios retorna 400

#### 2.2 Frontend — Módulo de Animales (Next.js, sigue la SKILL §10)
- [x] Entidad `entities/animal/model/animal.repository.ts` con `fetchAnimals/createAnimal/updateAnimal/deleteAnimal` (ya scaffolded)
- [x] Feature `features/animals/animal-registration/`:
  - `model/animal-registration.types.ts` + `.constants.ts` (field names + `submitOutcome`)
  - `model/animal-registration.validators.ts` (campos obligatorios, en una pasada)
  - `model/animal-registration-submit.ts` con Result tipado (mapea `HttpError` 400 → errores i18n)
  - `hooks/use-animal-registration-form.ts` (orquestador delgado)
  - `ui/animal-form/animal-form.tsx` + `.styles.ts`
- [x] Feature `features/animals/animal-list/` con filtro por categoría y búsqueda (`useAnimalList`)
- [x] Widget `widgets/animals/animal-card/` (nombre, identificador, `category-badge`)
- [x] Componente `shared/ui/category-badge/` con color por categoría (trabajo=verde, producción=azul, consumo=naranja)
- [x] Crear `shared/ui/form-field/`, `shared/ui/input/`, `shared/ui/select/`, `shared/ui/status-message/` (registrados en §6 de la SKILL)
- [x] Widget `widgets/navigation/navbar/` responsive con links de `routes.ts`
- [x] i18n: catálogo `animals` + `auth` + `messages` (es/en) con labels, validaciones y acciones
- [x] Páginas App Router: `app/animales/page.tsx` + `app/ui/animals-page.tsx` + `app/styles/animals-page.styles.ts`
  - Registro completo en 3 clics o menos desde la pantalla principal

#### 2.3 Autenticación y rutas (App Router)
- [x] Feature `features/auth/login/` con `login-submit.ts` (POST `/api/token/`) y Result tipado
- [x] Guardar tokens con `setSession` (store JWT); `httpRequest` adjunta el `Bearer` automáticamente
- [x] Página `app/login/page.tsx` + pantalla orquestadora; `useSession` para estado de sesión
- [x] Protección de rutas: `AuthGuard` redirige a `route.login` si no hay `accessToken`
- [x] Manejo de `401`: refresh transparente con `/api/token/refresh/` (single-flight) o `clearSession`

#### 2.4 Pruebas manuales / verificación
- [x] Registrar al menos 5 animales de prueba (trabajo, producción y consumo) — verificado vía smoke test e2e contra el API
- [x] Verificar que el registro se completa en 3 clics o menos (Registrar animal → completar → Guardar)
- [~] Responsive móvil (320px) / tablet (768px): implementado con breakpoints Tailwind (`sm`/`lg`); recomendado walkthrough en dispositivo
- Verificación automatizada: `npm run typecheck`, `npm run lint`, `npm run build` y 11 tests de backend en verde; SSR de `/login` y `/animales` renderiza correctamente.

> **Demo local:** usuario `demo` / `demo-pass-123`. Backend `python manage.py runserver` (8000) + frontend `npm run dev` (3000).

### Criterios de Aceptación (PGAT-22)
- El sistema permite crear el registro de un nuevo animal capturando nombre/identificador y categoría
- La categoría se selecciona desde una lista predefinida y es un campo obligatorio
- Cada animal se almacena con un identificador único
- El sistema muestra mensaje de error si faltan datos obligatorios
- El registro se completa en 3 clics o menos desde la pantalla principal
- La interfaz es responsive en celulares y tablets

---

## Sprint 3 — Gestión de Interesados / Salud, Alimentación y DevOps (9–15 Jun)
*PGAT-26: Configurar CI en GitHub Actions*
*PGAT-27: Configurar CD (despliegue básico)*
*PGAT-29: [MVP] Módulo de seguimiento de salud y alimentación*
*PGAT-30: [MVP] Módulo de clasificación por categoría*

### Objetivo
Activar el pipeline CI/CD completo y entregar los módulos de salud y alimentación funcionales.

### Tareas Técnicas

#### 3.1 CI/CD — Pipeline (PGAT-26 y PGAT-27)
- [ ] Validar que el workflow `ci.yml` se ejecuta automáticamente en push a `main`/`dev` y PRs
- [ ] Confirmar que el pipeline ejecuta: build del proyecto + tests automatizados
- [ ] Configurar despliegue básico (CD):
  - Railway: crear proyecto, conectar repo GitHub (root `backend/`), configurar variables de entorno
  - Vercel: conectar repo (root `frontend/`), configurar `NEXT_PUBLIC_API_URL` apuntando al backend de Railway
  - Documentar el proceso de despliegue paso a paso en `docs/deployment.md`
- [ ] Hacer un deploy de prueba y verificar que la app es accesible en la URL pública
- [ ] Documentar el resultado del pipeline (éxito/fallo) y cómo visualizarlo en GitHub

#### 3.2 Backend — API de Salud (PGAT-29)
- [ ] Verificar modelo `HealthEvent` y serializer
- [ ] Endpoint `GET /api/health/?animal={id}` retorna historial ordenado por fecha desc
- [ ] Endpoint `POST /api/health/` crea evento con animal, tipo, fecha y descripción
- [ ] Validar que `event_type` está restringido a: vacunacion, desparasitacion, revision, otro
- [ ] Tests: crear evento, listar por animal, validar campos obligatorios

#### 3.3 Backend — API de Alimentación (PGAT-29)
- [ ] Verificar modelo `FeedingRecord` y serializer
- [ ] Endpoint `GET /api/feeding/?animal={id}` retorna historial de alimentación
- [ ] Endpoint `POST /api/feeding/` crea registro con animal, fecha, tipo de alimento y cantidad
- [ ] Tests: crear registro, listar por animal, validar campos

#### 3.4 Backend — Clasificación y filtros (PGAT-30)
- [ ] Asegurar que `GET /api/animals/?category={categoria}` filtra correctamente
- [ ] Test de integración: listar animales de trabajo vs. producción vs. consumo
- [ ] Verificar que la categoría se valida al momento del registro (choices estrictos)

#### 3.5 Frontend — Perfil detallado del animal
- [ ] Página `app/animales/[id]/page.tsx` + `app/ui/animal-detail-page.tsx`:
  - Cabecera con nombre, identificador, `category-badge` y especie
  - Sección de historial de salud (eventos ordenados por fecha, últimos primero)
  - Sección de historial de alimentación
  - Tiempo de carga del perfil < 2 segundos
- [ ] Widget `widgets/animals/event-list/` reutilizable para salud y alimentación

#### 3.6 Frontend — Módulo de salud (PGAT-29)
- [ ] Entidad `entities/health/model/health-event.repository.ts` (fetch/create por animal)
- [ ] Feature `features/health/health-event-registration/` (form modal, Result tipado):
  - Campos: tipo de evento (select), fecha, descripción
  - Registro en 3 clics o menos
- [ ] `shared/ui/modal/` (dialog accesible) si aún no existe
- [ ] i18n: catálogo `health` (es/en)

#### 3.7 Frontend — Módulo de alimentación (PGAT-29)
- [ ] Entidad `entities/feeding/model/feeding-record.repository.ts`
- [ ] Feature `features/feeding/feeding-registration/`: tipo de alimento, cantidad, fecha
- [ ] Panel de alimentación dentro de `animal-detail-page`

#### 3.8 Frontend — Filtro por categoría (PGAT-30)
- [ ] Filtro visual en `animal-list`: Todos / Trabajo / Producción / Consumo
- [ ] Actualizar el listado vía `router`/`searchParams` (envuelto en `<Suspense>` si usa `useSearchParams`)

### Criterios de Aceptación
- Pipeline CI activo y ejecutándose automáticamente en push/PR
- Despliegue básico documentado y funcional en URL pública
- Sistema permite registrar eventos de salud y alimentación con fecha y descripción
- Historial de salud/alimentación almacenado vinculado al animal
- Registro de evento en 3 clics o menos
- Perfil de animal carga en < 2 segundos
- Filtro por categoría funcional en la interfaz
- Interfaz responsive y de acceso rápido para emergencias

---

## Sprint 4 — Planes de Gestión e Integración (16–19 Jun)
*PGAT-37: [MVP] Módulo de ubicación y agrupación por finca*
*PGAT-38: Integrar todos los módulos en un flujo completo*
*PGAT-39: Ejecutar pruebas funcionales y corregir defectos*

### Objetivo
Completar el módulo de ubicación e integrar todos los módulos en un flujo end-to-end sin rupturas.

### Tareas Técnicas

#### 4.1 Backend — API de Ubicación (PGAT-37)
- [ ] Verificar modelos `Farm` y `AnimalLocation`
- [ ] Endpoint `GET /api/location/farms/` lista todas las fincas
- [ ] Endpoint `POST /api/location/farms/` crea nueva finca
- [ ] Endpoint `POST /api/location/assignments/` asigna animal a finca y lote
  - Al crear nueva asignación, marcar las anteriores del mismo animal como `is_current=False`
- [ ] Endpoint `GET /api/location/assignments/?animal={id}` retorna historial de ubicaciones
- [ ] Endpoint `GET /api/location/assignments/?farm={id}` retorna todos los animales de una finca
- [ ] Tests: asignar ubicación, consultar por animal, consultar por finca, actualizar ubicación actual

#### 4.2 Frontend — Módulo de ubicación (PGAT-37)
- [ ] Entidad `entities/location/model/` (`farm.repository.ts`, `animal-location.repository.ts`)
- [ ] Página `app/ubicacion/page.tsx` + pantalla: lista de fincas con conteo de animales y "Nueva finca"
- [ ] Feature `features/location/location-assignment/`: sección de ubicación en `animal-detail-page`
  - Ubicación actual: finca + lote
  - Botón "Actualizar ubicación" → modal con select de finca y campo de lote
  - Registro en 3 clics o menos
- [ ] i18n: catálogo `location` (es/en)

#### 4.3 Integración de todos los módulos (PGAT-38)
- [ ] Verificar que el `navbar` enlaza (vía `routes.ts`): Inicio / Animales / Salud / Alimentación / Ubicación
- [ ] Revisar que `animal-detail-page` consolida: perfil + salud + alimentación + ubicación
- [ ] Flujo completo end-to-end sin rupturas:
  1. Login
  2. Registrar un animal → categoría asignada
  3. Desde el perfil: registrar evento de salud
  4. Desde el perfil: registrar registro de alimentación
  5. Desde el perfil: asignar a finca y lote
- [ ] Verificar que todos los módulos comparten la misma base de datos (consistencia)
- [ ] Probar navegación entre módulos en móvil, tablet y escritorio

#### 4.4 Pruebas funcionales (PGAT-39)
- [ ] Ejecutar casos de prueba para todos los módulos:
  - Registro: crear, editar, eliminar animal
  - Salud: registrar vacunación, desparasitación, revisión
  - Alimentación: registrar con fecha y tipo de alimento
  - Ubicación: asignar y cambiar ubicación de un animal
- [ ] Cargar datos de prueba de al menos 2 fincas (ej. "Finca El Roble" y "Finca La Montaña") con animales de trabajo y producción
- [ ] Documentar los defectos encontrados en GitHub Issues o Jira
- [ ] Corregir todos los defectos bloqueantes
- [ ] Verificar tiempos de respuesta:
  - Perfil de animal: < 2 segundos
  - Registro de cualquier evento: < 3 clics

### Criterios de Aceptación
- Módulo de ubicación: asignar y consultar lote/potrero por animal y por finca
- Todos los módulos accesibles desde navegación común
- Datos consistentes entre módulos (mismo animal, misma DB)
- Flujo completo end-to-end funcionando sin errores ni rupturas
- Módulos críticos (registro, salud, alimentación, ubicación) sin errores bloqueantes
- Responsive en celulares, tablets y escritorio

---

## Sprint 5 — Cierre y Entrega Final (20–23 Jun)
*PGAT-40: Refinamiento y pulido final del prototipo funcional (MVP)*

### Objetivo
Pulir la usabilidad, estabilidad y consistencia visual del MVP para la demostración/Go-Live.

### Tareas Técnicas

#### 5.1 Refinamiento de UI/UX (PGAT-40)
- [ ] Revisar y corregir detalles de interfaz identificados en Sprint 4
- [ ] Asegurar consistencia visual en toda la app (tipografía, colores, espaciado, iconos)
- [ ] Revisar mensajes de error y de éxito: que sean claros para usuarios con poca experiencia técnica
- [ ] Verificar que todos los formularios validan correctamente en cliente y muestran mensajes útiles
- [ ] Revisar accesibilidad básica: contraste de colores, tamaño de botones táctiles (mínimo 44px)
- [ ] Probar en dispositivos reales o simulados: iPhone SE (375px), iPad (768px), escritorio (1280px)
- [ ] Optimizar el tiempo de carga inicial del frontend (lazy loading de rutas si aplica)

#### 5.2 Estabilidad y correcciones finales
- [ ] Ejecutar todos los tests del backend: `python manage.py test`
- [ ] Corregir cualquier test fallido o warning en el pipeline CI
- [ ] Verificar que el deploy en Railway/Vercel está actualizado con la versión final
- [ ] Asegurar que el 100% de los módulos críticos están funcionales y estables:
  - Registro de animales ✓
  - Historial de salud ✓
  - Registro de alimentación ✓
  - Módulo de ubicación ✓

#### 5.3 Datos de demostración
- [ ] Cargar datos de prueba representativos en el entorno productivo:
  - Finca 1 "Finca El Roble": 3+ animales de trabajo (buey, caballo), 2+ de producción (vaca, cabra)
  - Finca 2 "Finca La Montaña": 2+ animales de consumo (res, cerdo), 1+ de trabajo
  - Al menos 2 eventos de salud por animal
  - Al menos 3 registros de alimentación por animal
  - Ubicaciones asignadas a todos los animales
- [ ] Preparar flujo de demostración (script de 5 minutos mostrando el recorrido completo)

#### 5.4 Entregables finales
- [ ] Completar `README.md` con instrucciones de instalación, uso y arquitectura
- [ ] Crear `docs/manual-usuario.md` con guía para administradores y trabajadores de campo
- [ ] Documentar proceso de despliegue en `docs/deployment.md` (si no se hizo en Sprint 3)
- [ ] Grabar video de demostración mostrando el flujo completo de la plataforma
- [ ] Verificar que el prototipo está accesible en la URL pública (Go-Live)

### Criterios de Aceptación (PGAT-40)
- Detalles menores de interfaz corregidos
- Interfaz intuitiva para personal de campo con poca experiencia tecnológica
- Responsive en celulares, tablets y escritorio
- 100% de módulos críticos funcionales y estables
- Prototipo listo para demostración con datos de prueba de al menos 2 fincas

---

## Tabla de Endpoints por Sprint

| Sprint | Endpoints implementados |
|--------|------------------------|
| Sprint 1 | `/api/token/`, `/api/token/refresh/` (JWT setup) |
| Sprint 2 | `GET/POST /api/animals/`, `GET/PUT/DELETE /api/animals/{id}/` |
| Sprint 3 | `GET/POST /api/health/`, `GET/POST /api/feeding/`, filtros por categoría |
| Sprint 4 | `GET/POST /api/location/farms/`, `GET/POST /api/location/assignments/` |
| Sprint 5 | Todos los endpoints estables en producción |

---

## Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Conectividad intermitente en campo | Alta | Alto | PWA o cache local en Sprint 5 si hay tiempo; documentar como mejora futura |
| Retrasos en sprints | Media | Alto | Priorizar módulos MVP críticos primero; sacrificar módulos no-MVP si hay retraso |
| Rechazo por usabilidad | Media | Alto | Pruebas con usuarios en Sprint 4; diseño mobile-first desde Sprint 2 |
| Configuración CI/CD compleja | Baja | Medio | GitHub Actions con templates conocidos; Railway tiene deploy automático |

---

## Definición de Done (DoD)

Una tarea está **Terminada** cuando:
1. El código está en la rama `dev` o `main` y el pipeline CI pasa en verde
2. La funcionalidad es accesible desde la UI y opera sin errores en consola
3. Se escribió al menos un test por endpoint/vista del backend
4. La interfaz fue probada en móvil (≤768px) y escritorio (≥1280px)
5. No hay errores bloqueantes reportados en la sesión de pruebas
