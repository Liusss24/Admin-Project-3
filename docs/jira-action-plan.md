# Plan Jira PGAT — Datos por US

**Instrucción:** en cada US, fija **Sprint**, **Due date**, **Story Points** y los enlaces **"is blocked by"** según la tabla. Jira crea el recíproco "blocks" automáticamente.

### Sprints

| Sprint | Nombre | Inicio | Fin |
|--------|--------|--------|-----|
| S2 | Planificación Base | 2 jun 2026 | 8 jun 2026 |
| S3 | Gestión de Interesados | 9 jun 2026 | 15 jun 2026 |
| S4 | Planes de Gestión e Integración | 16 jun 2026 | 19 jun 2026 |
| S5 | Cierre y Entrega Final | 20 jun 2026 | 23 jun 2026 |

### Datos por US

| US | Tipo | Resumen | Sprint | Due date | SP | Is blocked by |
|----|------|---------|--------|----------|----|---------------|
| PGAT-22 | Story | Registro individual de animales | S2 | 8 jun 2026 | 5 | — |
| PGAT-26 | Story | CI pipeline (GitHub Actions) | S3 | 15 jun 2026 | 3 | — |
| PGAT-27 | Task | CD básico + documentación | S3 | 15 jun 2026 | 3 | PGAT-26 |
| PGAT-29 | Story | Salud y alimentación | S3 | 15 jun 2026 | 8 | PGAT-22 |
| PGAT-30 | Story | Clasificación por categoría | S3 | 15 jun 2026 | 3 | PGAT-22 |
| PGAT-37 | Story | Ubicación y agrupación por finca | S4 | 19 jun 2026 | 5 | PGAT-22 |
| PGAT-38 | Task | Integrar módulos del prototipo | S4 | 19 jun 2026 | 5 | PGAT-29, PGAT-30, PGAT-37 |
| PGAT-39 | Task | Pruebas funcionales y correcciones | S4 | 19 jun 2026 | 3 | PGAT-38 |
| PGAT-40 | Task | Refinamiento y pulido final (MVP) | S5 | 23 jun 2026 | 3 | PGAT-39 |
