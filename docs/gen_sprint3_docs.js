'use strict';
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType,
} = require('docx');
const fs = require('fs');

const OUT = 'D:\\Documentos\\TEC\\Administración de Proyectos\\Proyecto 3';
const PAGE_PROPS = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
};
const CW = 9026; // A4 content width at 1" margins

const STYLES = {
  default: { document: { run: { font: 'Arial', size: 24 } } },
  paragraphStyles: [
    {
      id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 32, bold: true, font: 'Arial', color: '000000' },
      paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 },
    },
    {
      id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 26, bold: true, font: 'Arial', color: '000000' },
      paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
    },
    {
      id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 24, bold: true, font: 'Arial', color: '000000' },
      paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 },
    },
  ],
};

const NUMBERING = {
  config: [
    {
      reference: 'bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    },
  ],
};

const BD = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const ALL_B = { top: BD, bottom: BD, left: BD, right: BD };
const CELL_M = { top: 80, bottom: 80, left: 120, right: 120 };

function makeDoc(children) {
  return new Document({
    styles: STYLES,
    numbering: NUMBERING,
    sections: [{ properties: { page: PAGE_PROPS }, children }],
  });
}

const h1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const p  = (t, bold = false) => new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: t, bold, font: 'Arial', size: 24 })] });
const bl = t => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text: t, font: 'Arial', size: 24 })] });
const sp = () => new Paragraph({ spacing: { after: 120 }, children: [new TextRun('')] });

function tCell(text, width, isHeader) {
  return new TableCell({
    borders: ALL_B,
    width: { size: width, type: WidthType.DXA },
    shading: isHeader ? { fill: 'D5E8F0', type: ShadingType.CLEAR } : undefined,
    margins: CELL_M,
    children: [new Paragraph({
      children: [new TextRun({ text, bold: isHeader, font: 'Arial', size: 22 })],
    })],
  });
}

function mkTable(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ children: headers.map((h, i) => tCell(h, widths[i], true)) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => tCell(c, widths[i], false)) })),
    ],
  });
}

async function save(doc, filename) {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(`${OUT}\\${filename}`, buf);
  console.log('OK:', filename);
}

// ============================================================
// PGAT-23: Análisis y mapeo de Stakeholders
// ============================================================
async function pgat23() {
  const children = [
    h1('Análisis y Mapeo de Stakeholders'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-23 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Objetivo'),
    p('Identificar y caracterizar a todos los interesados del proyecto PGAT para comprender sus expectativas, nivel de influencia y definir una estrategia de gestión apropiada para cada uno.'),
    sp(),

    h2('2. Identificación de Stakeholders'),
    sp(),
    mkTable(
      ['Stakeholder', 'Tipo', 'Interés principal', 'Poder', 'Interés'],
      [
        ['Administrador / Encargado de finca', 'Usuario final (MVP)', 'Centralizar la gestión de animales, registrar eventos y consultar reportes desde una sola plataforma.', 'Alto', 'Alto'],
        ['Veterinario', 'Usuario final', 'Acceso ágil al historial de salud de cada animal para registrar diagnósticos y consultar tratamientos.', 'Medio', 'Alto'],
        ['Operario / Trabajador', 'Usuario final', 'Interfaz simple y rápida para registrar alimentación y actividades diarias sin alta curva de aprendizaje.', 'Bajo', 'Alto'],
        ['Observador', 'Usuario (Fase 2)', 'Visibilidad del estado del hato sin capacidad de modificar datos.', 'Bajo', 'Medio'],
        ['Equipo de desarrollo', 'Interno', 'Entregar un producto funcional, bien documentado y dentro del plazo académico establecido.', 'Alto', 'Alto'],
        ['Profesores / Evaluadores TEC', 'Académico', 'Cumplimiento de los objetivos del curso, calidad del producto entregado y rigor en la documentación.', 'Alto', 'Alto'],
      ],
      [2300, 1400, 3013, 1000, 1313],
    ),
    sp(),

    h2('3. Matriz de Poder / Interés'),
    p('La siguiente clasificación orienta la estrategia de comunicación y gestión para cada grupo de stakeholders:'),
    sp(),
    mkTable(
      ['Cuadrante', 'Stakeholders', 'Estrategia'],
      [
        ['Alto poder / Alto interés', 'Administrador, Profesores TEC, Equipo de desarrollo', 'Gestionar de cerca. Comunicación frecuente e involucramiento en decisiones clave del proyecto.'],
        ['Alto poder / Bajo interés', 'Institución TEC (nivel institucional)', 'Mantener satisfechos. Reportes formales únicamente en los hitos académicos definidos.'],
        ['Bajo poder / Alto interés', 'Veterinario, Operario', 'Mantener informados. Recopilar feedback funcional al cierre de cada sprint mediante demostraciones.'],
        ['Bajo poder / Bajo interés', 'Observador (Fase 2)', 'Monitorear. Comunicación mínima; se integrará en fases posteriores al MVP.'],
      ],
      [2500, 3000, 3526],
    ),
    sp(),

    h2('4. Estrategia de Gestión por Stakeholder'),
    sp(),
    h3('4.1 Administrador / Encargado de finca'),
    p('Es el usuario primario del MVP. Se realizan demostraciones funcionales al cierre de cada sprint para validar que las funcionalidades cubren sus necesidades operativas. El feedback se documenta y traslada directamente al backlog de Jira para su priorización.'),
    sp(),
    h3('4.2 Veterinario'),
    p('Su participación se materializa en el módulo de salud implementado en el Sprint 3. Se valida la usabilidad del formulario de registro de eventos y la claridad del historial médico por animal. Se incluye en revisiones de UX cuando el módulo está en desarrollo activo.'),
    sp(),
    h3('4.3 Operario / Trabajador'),
    p('Es el usuario con menor experiencia técnica esperada. El módulo de alimentación prioriza formularios cortos y lenguaje sencillo. Se valida la accesibilidad en dispositivos móviles de gama media como parte de los criterios de aceptación de las historias de usuario relacionadas.'),
    sp(),
    h3('4.4 Profesores / Evaluadores TEC'),
    p('Reciben informes de avance en formato .docx al cierre de cada sprint. El repositorio público en GitHub mantiene documentación técnica actualizada para facilitar la evaluación del avance y la calidad del código.'),
  ];
  await save(makeDoc(children), 'PGAT-23_stakeholders.docx');
}

// ============================================================
// PGAT-24: Estrategia de comunicación
// ============================================================
async function pgat24() {
  const children = [
    h1('Estrategia de Comunicación con los Interesados'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-24 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Objetivo'),
    p('Definir los canales, frecuencias y responsables de comunicación entre el equipo de desarrollo y los stakeholders del proyecto, garantizando que cada grupo reciba información oportuna y relevante.'),
    sp(),

    h2('2. Canales de Comunicación'),
    sp(),
    mkTable(
      ['Canal', 'Propósito', 'Audiencia principal', 'Frecuencia'],
      [
        ['Jira', 'Gestión de backlog, sprints y seguimiento del progreso de tareas.', 'Equipo de desarrollo', 'Diaria'],
        ['GitHub (PRs / CI)', 'Control de versiones, revisión de código y estado del pipeline de CI.', 'Equipo de desarrollo', 'Por cambio'],
        ['Informe de avance por sprint', 'Reporte formal del progreso técnico al cierre de cada sprint.', 'Profesores / Evaluadores TEC', 'Por sprint'],
        ['Demo funcional', 'Presentación de nuevas funcionalidades para validar usabilidad con usuarios finales.', 'Administrador, Veterinario, Operario', 'Por sprint'],
        ['Correo electrónico', 'Comunicación formal para entrega de documentos o consultas académicas.', 'Profesores TEC', 'Según necesidad'],
        ['Reunión de sprint (virtual)', 'Planificación, revisión y retrospectiva del equipo de desarrollo.', 'Equipo de desarrollo', 'Inicio y cierre de cada sprint'],
      ],
      [1800, 3000, 2200, 2026],
    ),
    sp(),

    h2('3. Matriz de Comunicación'),
    sp(),
    mkTable(
      ['Stakeholder', 'Qué se comunica', 'Canal', 'Frecuencia', 'Responsable'],
      [
        ['Profesores / Evaluadores TEC', 'Avance del sprint, entregables académicos y métricas de calidad.', 'Informe .docx + correo', 'Por sprint', 'Líder de proyecto'],
        ['Administrador / Encargado', 'Nuevas funcionalidades disponibles y validación de flujos principales.', 'Demo funcional', 'Por sprint', 'Equipo'],
        ['Veterinario / Operario', 'Cambios en los módulos de salud y alimentación; solicitud de feedback.', 'Demo + correo', 'Por sprint', 'Equipo'],
        ['Equipo de desarrollo', 'Estado de tareas, bloqueos y decisiones técnicas.', 'Jira + GitHub + reunión', 'Diaria', 'Todos los miembros'],
        ['Observador (Fase 2)', 'Hitos relevantes de la plataforma cuando sea incorporado al proyecto.', 'Correo', 'Por hito', 'Líder de proyecto'],
      ],
      [2000, 2500, 1700, 1300, 1526],
    ),
    sp(),

    h2('4. Tipos de Comunicación'),
    sp(),
    h3('4.1 Comunicación interna del equipo'),
    p('El equipo utiliza Jira como fuente de verdad para el estado de las tareas y GitHub para la revisión de código mediante Pull Requests. Las decisiones técnicas relevantes se registran como comentarios en los tickets de Jira o en los PRs de GitHub para mantener trazabilidad y facilitar auditorías posteriores.'),
    sp(),
    h3('4.2 Comunicación hacia stakeholders académicos'),
    p('Al cierre de cada sprint se genera un informe de avance en formato .docx con el formato estándar establecido en la tarea PGAT-21. Este documento se entrega a los profesores evaluadores junto con el estado actualizado del repositorio en GitHub, incluyendo el resultado del pipeline de CI.'),
    sp(),
    h3('4.3 Comunicación hacia usuarios finales'),
    p('Las demostraciones funcionales permiten recoger feedback directo de los usuarios objetivo (administrador, veterinario, operario). El feedback se documenta y se traslada al backlog de Jira para su priorización en el próximo sprint. Se prioriza el feedback que afecte la usabilidad del flujo principal del MVP.'),
    sp(),

    h2('5. Protocolo de Escalamiento'),
    p('Ante bloqueos o situaciones que afecten el avance del proyecto, se sigue el siguiente protocolo:'),
    sp(),
    bl('El miembro del equipo identifica y registra el bloqueo como impedimento en el ticket de Jira correspondiente.'),
    bl('El bloqueo se discute en la siguiente reunión de sprint (plazo máximo: 48 horas desde su registro).'),
    bl('Si no se resuelve en 48 horas, se escala al líder del equipo para buscar una solución alternativa o ajustar el alcance del sprint.'),
    bl('Si el bloqueo tiene impacto en el alcance o la fecha de entrega, se comunica formalmente al profesor tutor mediante correo electrónico con un plan de mitigación propuesto.'),
  ];
  await save(makeDoc(children), 'PGAT-24_estrategia_comunicacion.docx');
}

// ============================================================
// PGAT-25: Plan de Recursos y Adquisiciones
// ============================================================
async function pgat25() {
  const children = [
    h1('Plan de Recursos y Adquisiciones'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-25 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Objetivo'),
    p('Identificar y documentar los recursos humanos y tecnológicos necesarios para el desarrollo del proyecto PGAT, así como definir el plan de adquisiciones para los recursos que requieren gestión o contratación durante el período académico.'),
    sp(),

    h2('2. Recursos Humanos'),
    sp(),
    mkTable(
      ['Rol', 'Responsabilidades principales', 'Dedicación estimada'],
      [
        ['Líder de proyecto / Arquitecto', 'Diseño de arquitectura, decisiones técnicas, coordinación del equipo y gestión del backlog en Jira.', 'Alta — tiempo completo del proyecto'],
        ['Desarrollador Full-Stack', 'Implementación de backend (Django) y frontend (Next.js), pruebas unitarias y revisión de código.', 'Alta'],
        ['QA / Revisor', 'Revisión de PRs, validación de criterios de aceptación y pruebas manuales de las funcionalidades.', 'Media'],
        ['Documentador', 'Generación de entregables académicos, informes de avance y documentación técnica del proyecto.', 'Media'],
      ],
      [2200, 4800, 2026],
    ),
    sp(),
    p('Nota: En un equipo académico pequeño, varios roles pueden ser desempeñados por la misma persona en distintos momentos del sprint.'),
    sp(),

    h2('3. Recursos Tecnológicos'),
    sp(),
    mkTable(
      ['Recurso / Herramienta', 'Uso en el proyecto', 'Plan / Costo'],
      [
        ['GitHub', 'Control de versiones, gestión de ramas y Pull Requests, pipeline de CI con GitHub Actions.', 'Gratuito (repositorio público)'],
        ['Jira (Atlassian)', 'Gestión ágil: backlog, sprints, tablero Kanban y seguimiento de tareas PGAT-XX.', 'Gratuito (plan educativo)'],
        ['Railway', 'Hosting del backend Django en producción. Deploy automático desde la rama main del repositorio.', 'Gratuito (plan hobby — 500 h/mes)'],
        ['Vercel', 'Hosting del frontend Next.js. Deploy automático y preview deployments por Pull Request.', 'Gratuito (plan hobby)'],
        ['Python 3.12 + Django 6 + DRF', 'Framework backend: API REST, autenticación JWT, ORM y migraciones de base de datos.', 'Open source — sin costo'],
        ['Node.js 20 + Next.js 16', 'Framework frontend: App Router, TypeScript strict y Tailwind CSS 4.', 'Open source — sin costo'],
        ['PostgreSQL (Railway)', 'Base de datos relacional en producción, gestionada automáticamente por Railway.', 'Incluido en plan gratuito de Railway'],
        ['SQLite', 'Base de datos para desarrollo local y ejecución de tests en el pipeline de CI.', 'Incluido en Django — sin costo'],
      ],
      [2500, 4000, 2526],
    ),
    sp(),

    h2('4. Plan de Adquisiciones'),
    p('Para el alcance actual del proyecto (MVP académico con fecha límite 23 de junio de 2026), no se requieren adquisiciones de hardware ni licencias de software de pago. Todos los servicios utilizados operan dentro de sus planes gratuitos o educativos.'),
    sp(),
    p('Las siguientes adquisiciones se identifican como potenciales en caso de que el proyecto evolucione a un entorno de producción real posterior al período académico:'),
    sp(),
    mkTable(
      ['Recurso potencial', 'Justificación para adquirir', 'Condición de activación'],
      [
        ['Dominio personalizado (.com o .cr)', 'Mejorar la presentación del producto ante usuarios reales y facilitar el acceso a la plataforma.', 'Si el proyecto se lleva a producción real tras el período académico.'],
        ['Plan pagado de Railway', 'Eliminar el límite de horas del plan hobby (500 h/mes) y garantizar disponibilidad continua.', 'Si el uso en producción supera los límites del plan gratuito.'],
        ['Plan pagado de Vercel', 'Acceso a funciones avanzadas de análisis de rendimiento y mayor número de builds concurrentes.', 'Si el tráfico del frontend supera los límites del plan hobby.'],
      ],
      [2500, 3500, 3026],
    ),
    sp(),

    h2('5. Restricciones y Supuestos'),
    sp(),
    h3('Restricciones'),
    bl('El proyecto debe operar dentro de los planes gratuitos de todos los servicios durante el período académico (hasta el 23 de junio de 2026).'),
    bl('No se dispone de presupuesto para adquisiciones de hardware o licencias de software.'),
    bl('Los integrantes del equipo utilizan sus propios equipos de cómputo para el desarrollo.'),
    sp(),
    h3('Supuestos'),
    bl('Los planes gratuitos de Railway y Vercel son suficientes para alojar el MVP y soportar las demostraciones académicas.'),
    bl('El equipo dispone de acceso continuo a internet y a las herramientas en la nube durante todo el período de desarrollo.'),
    bl('No se requerirá escalar la infraestructura durante el período de evaluación académica.'),
  ];
  await save(makeDoc(children), 'PGAT-25_plan_recursos_adquisiciones.docx');
}

// ============================================================
// PGAT-26: CI Pipeline
// ============================================================
async function pgat26() {
  const children = [
    h1('Configuración del Pipeline de Integración Continua (CI)'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-26 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Objetivo'),
    p('Configurar y documentar el pipeline de integración continua (CI) del repositorio PGAT, garantizando que cada cambio de código sea validado automáticamente antes de integrarse a las ramas principales del proyecto.'),
    sp(),

    h2('2. Herramienta Seleccionada: GitHub Actions'),
    p('Se eligió GitHub Actions por las siguientes razones:'),
    bl('Integración nativa con el repositorio en GitHub sin configuración adicional de webhooks.'),
    bl('Gratuito para repositorios públicos con hasta 2000 minutos de ejecución por mes.'),
    bl('Configuración declarativa en YAML versionada junto con el código fuente.'),
    bl('Gran ecosistema de actions reutilizables (setup-python, setup-node, actions/cache).'),
    sp(),
    p('Archivo de configuración: .github/workflows/ci.yml'),
    sp(),

    h2('3. Triggers del Pipeline'),
    p('El pipeline se activa en los siguientes eventos de GitHub:'),
    sp(),
    mkTable(
      ['Evento', 'Ramas objetivo', 'Descripción'],
      [
        ['push', 'main, dev', 'Se ejecuta cuando se sube código directamente a las ramas main o dev.'],
        ['pull_request', 'main, dev', 'Se ejecuta cuando se abre o actualiza un PR cuyo destino es main o dev.'],
      ],
      [1800, 1800, 5426],
    ),
    sp(),

    h2('4. Jobs del Pipeline'),
    p('El pipeline define dos jobs independientes que se ejecutan en paralelo para reducir el tiempo total de CI:'),
    sp(),
    h3('4.1 Job: Backend (Django)'),
    p('Entorno de ejecución: ubuntu-latest | Python 3.12'),
    sp(),
    mkTable(
      ['Paso', 'Action / Comando', 'Descripción'],
      [
        ['Checkout', 'actions/checkout@v4', 'Descarga el código fuente del repositorio en el runner.'],
        ['Setup Python', 'actions/setup-python@v5', 'Instala Python 3.12 con caché de pip indexado por backend/requirements.txt.'],
        ['Instalar dependencias', 'pip install -r backend/requirements.txt', 'Instala Django, DRF, simplejwt y demás paquetes del backend.'],
        ['Aplicar migraciones', 'python manage.py migrate', 'Crea el esquema de la base de datos SQLite utilizada durante las pruebas.'],
        ['Ejecutar tests', 'python manage.py test', 'Corre la suite de tests del backend (16 tests al cierre del Sprint 3).'],
      ],
      [1600, 2800, 4626],
    ),
    sp(),
    h3('4.2 Job: Frontend (Next.js)'),
    p('Entorno de ejecución: ubuntu-latest | Node.js 20'),
    sp(),
    mkTable(
      ['Paso', 'Action / Comando', 'Descripción'],
      [
        ['Checkout', 'actions/checkout@v4', 'Descarga el código fuente del repositorio en el runner.'],
        ['Setup Node.js', 'actions/setup-node@v4', 'Instala Node.js 20 con caché de npm indexado por frontend/package-lock.json.'],
        ['Instalar dependencias', 'npm ci', 'Instalación limpia y reproducible usando exactamente package-lock.json.'],
        ['Type check', 'npm run typecheck (tsc --noEmit)', 'Verifica que no existan errores de TypeScript en el proyecto (modo strict).'],
        ['Lint', 'npm run lint (eslint)', 'Valida las reglas de estilo y calidad de código definidas en el proyecto.'],
        ['Build', 'npm run build (next build)', 'Genera el build de producción de Next.js para verificar que compila correctamente.'],
      ],
      [1600, 2800, 4626],
    ),
    sp(),

    h2('5. Variables de Entorno en CI'),
    sp(),
    mkTable(
      ['Variable', 'Job', 'Valor en CI', 'Propósito'],
      [
        ['SECRET_KEY', 'Backend', 'ci-test-secret-key', 'Clave Django requerida para arrancar el servidor durante los tests.'],
        ['DEBUG', 'Backend', 'True', 'Habilita el modo de depuración para facilitar la identificación de errores en CI.'],
        ['NEXT_PUBLIC_API_URL', 'Frontend', 'http://localhost:8000', 'URL del backend para el build de Next.js. No se realizan llamadas reales de red en CI.'],
      ],
      [2400, 1300, 2300, 3026],
    ),
    sp(),

    h2('6. Estrategia de Caché'),
    p('Para reducir el tiempo de ejecución del pipeline en ejecuciones donde las dependencias no cambian, se configuran cachés indexados por hash de archivo de bloqueo:'),
    bl('Backend: caché de pip indexado por el hash de backend/requirements.txt.'),
    bl('Frontend: caché de npm indexado por el hash de frontend/package-lock.json.'),
    p('Esta estrategia reduce el tiempo de CI en un 40-60% en ejecuciones donde solo cambia el código fuente y no las dependencias.'),
    sp(),

    h2('7. Estado al Cierre del Sprint 3'),
    sp(),
    mkTable(
      ['Métrica', 'Valor al cierre del Sprint 3'],
      [
        ['Tests backend (Django)', '16 / 16 pasando (módulos: animals, health, feeding, auth)'],
        ['Typecheck frontend (TypeScript strict)', 'Sin errores'],
        ['Lint frontend (ESLint)', 'Sin errores ni advertencias'],
        ['Build de producción (Next.js)', 'Exitoso — 8 rutas generadas'],
        ['Tiempo promedio de CI', 'Aproximadamente 3-4 minutos por ejecución'],
      ],
      [3800, 5226],
    ),
  ];
  await save(makeDoc(children), 'PGAT-26_ci_pipeline.docx');
}

// ============================================================
// PGAT-27: CD básico
// ============================================================
async function pgat27() {
  const children = [
    h1('Configuración del Despliegue Básico (CD)'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-27 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Objetivo'),
    p('Configurar y documentar el proceso de entrega continua (CD) del proyecto PGAT, estableciendo despliegues automáticos del backend y el frontend a sus respectivos entornos de producción a partir de la rama main.'),
    sp(),

    h2('2. Plataformas de Despliegue'),
    sp(),
    mkTable(
      ['Componente', 'Plataforma', 'Justificación', 'Plan'],
      [
        ['Backend (Django)', 'Railway', 'Soporte nativo para aplicaciones Python/Django. Deploy simple mediante detección automática del proyecto. Base de datos PostgreSQL gestionada incluida en el plan gratuito.', 'Hobby — gratuito'],
        ['Frontend (Next.js)', 'Vercel', 'Plataforma creada por el mismo equipo de Next.js. CDN global, optimización automática y preview deployments por Pull Request sin configuración adicional.', 'Hobby — gratuito'],
      ],
      [1800, 1500, 3700, 2026],
    ),
    sp(),

    h2('3. Proceso de Despliegue del Backend (Railway)'),
    sp(),
    h3('3.1 Configuración inicial'),
    bl('Crear un proyecto en Railway (railway.app) y conectarlo al repositorio de GitHub mediante integración OAuth.'),
    bl('Seleccionar la rama main como rama de despliegue de producción.'),
    bl('Railway detecta automáticamente el proyecto Django gracias al archivo requirements.txt y configura el entorno de Python.'),
    bl('Añadir un servicio PostgreSQL al proyecto en Railway; la variable DATABASE_URL se inyecta automáticamente.'),
    sp(),
    h3('3.2 Variables de entorno de producción (Backend)'),
    sp(),
    mkTable(
      ['Variable', 'Valor de referencia', 'Descripción'],
      [
        ['SECRET_KEY', 'Cadena aleatoria larga (50+ caracteres)', 'Clave secreta de Django para producción. Debe ser única y no compartirse.'],
        ['DEBUG', 'False', 'Desactiva el modo de depuración en producción para mayor seguridad.'],
        ['ALLOWED_HOSTS', '.railway.app', 'Hostnames permitidos por Django para servir peticiones.'],
        ['DATABASE_URL', 'Provista automáticamente por Railway', 'Cadena de conexión a la base de datos PostgreSQL gestionada.'],
        ['CORS_ALLOWED_ORIGINS', 'https://<app>.vercel.app', 'URL del frontend en Vercel para permitir peticiones CORS desde el navegador.'],
      ],
      [2500, 3500, 3026],
    ),
    sp(),
    h3('3.3 Flujo de despliegue automático'),
    bl('El desarrollador hace push a la rama main (generalmente después de un PR aprobado con CI en verde).'),
    bl('Railway detecta el push y lanza automáticamente un nuevo proceso de deploy.'),
    bl('Railway ejecuta pip install -r requirements.txt para actualizar dependencias.'),
    bl('Se ejecutan las migraciones pendientes (python manage.py migrate) antes de arrancar el servidor.'),
    bl('Gunicorn inicia el servidor WSGI y el nuevo build queda disponible en la URL del servicio.'),
    sp(),

    h2('4. Proceso de Despliegue del Frontend (Vercel)'),
    sp(),
    h3('4.1 Configuración inicial'),
    bl('Importar el repositorio de GitHub en Vercel (vercel.com/new) mediante integración OAuth.'),
    bl('Seleccionar el directorio frontend/ como root directory del proyecto en la configuración de Vercel.'),
    bl('Vercel detecta Next.js automáticamente y configura el build command (next build) y el directorio de salida.'),
    bl('Seleccionar la rama main como rama de producción.'),
    sp(),
    h3('4.2 Variable de entorno de producción (Frontend)'),
    sp(),
    mkTable(
      ['Variable', 'Valor de referencia', 'Descripción'],
      [
        ['NEXT_PUBLIC_API_URL', 'https://<servicio>.railway.app', 'URL pública del backend en Railway. El prefijo NEXT_PUBLIC_ la expone al cliente en el navegador.'],
      ],
      [2500, 3500, 3026],
    ),
    sp(),
    h3('4.3 Flujo de despliegue automático'),
    bl('El desarrollador hace push a la rama main.'),
    bl('Vercel detecta el push y ejecuta next build con las variables de entorno configuradas.'),
    bl('El build resultante se despliega en la red CDN global de Vercel.'),
    bl('El nuevo frontend queda disponible en la URL de producción de Vercel.'),
    bl('Preview deployments: cada Pull Request genera automáticamente una URL de previsualización independiente, disponible antes de hacer merge a main.'),
    sp(),

    h2('5. Verificación del Despliegue'),
    p('Después de cada deploy en producción, se verifican los siguientes puntos para confirmar el correcto funcionamiento del sistema:'),
    sp(),
    mkTable(
      ['Verificación', 'Backend (Railway)', 'Frontend (Vercel)'],
      [
        ['Disponibilidad', 'GET /api/ responde con HTTP 200 OK', 'Página de login carga sin errores en el navegador'],
        ['Autenticación', 'POST /api/auth/token/ devuelve tokens JWT válidos', 'Login funcional con credenciales de prueba'],
        ['Listado de animales', 'GET /api/animals/ devuelve lista paginada', 'Listado de animales visible en /animales'],
        ['Módulos Sprint 3', 'GET /api/health/ y /api/feeding/ responden correctamente', 'Página de detalle de animal muestra eventos y registros de alimentación'],
      ],
      [3000, 3013, 3013],
    ),
  ];
  await save(makeDoc(children), 'PGAT-27_despliegue_cd.docx');
}

// ============================================================
// PGAT-28: Informe CI/CD y DevOps
// ============================================================
async function pgat28() {
  const children = [
    h1('Informe de Aplicación de CI/CD y DevOps'),
    p('Proyecto: PGAT — Plataforma de Gestión de Animales de Trabajo y Producción', true),
    p('Tarea: PGAT-28 | Sprint 3 | Junio 2026'),
    sp(),

    h2('1. Resumen Ejecutivo'),
    p('Durante el Sprint 3 del proyecto PGAT se implementó una cadena completa de CI/CD que automatiza la validación del código y el despliegue de la aplicación. El pipeline de integración continua se ejecuta sobre GitHub Actions con dos jobs paralelos que cubren el backend en Django y el frontend en Next.js. La entrega continua se gestiona mediante Railway para el backend y Vercel para el frontend, con despliegues automáticos activados por cada push a la rama main que supere el pipeline de CI.'),
    sp(),

    h2('2. Contexto del Proyecto'),
    p('PGAT es una plataforma de gestión de animales de trabajo y producción desarrollada como proyecto académico en el TEC. El sistema sigue una arquitectura de monorepo con dos capas independientes:'),
    bl('Backend: Django 6 + Django REST Framework + SimpleJWT. Expone una API REST con autenticación por tokens.'),
    bl('Frontend: Next.js 16 + TypeScript strict + Tailwind CSS 4. Consume la API REST del backend.'),
    p('La separación en dos capas independientes justifica la existencia de dos jobs paralelos en CI y dos plataformas de hosting distintas en CD, cada una optimizada para su tecnología.'),
    sp(),

    h2('3. Arquitectura CI/CD Implementada'),
    sp(),
    mkTable(
      ['Etapa', 'Herramienta', 'Activador', 'Resultado esperado'],
      [
        ['Integración Continua (CI)', 'GitHub Actions (.github/workflows/ci.yml)', 'Push o PR a main o dev', 'Validación automática de tests, tipos, lint y build'],
        ['Entrega Continua (CD) — Backend', 'Railway', 'Push a main (post-CI aprobado)', 'Backend Django desplegado y accesible en producción'],
        ['Entrega Continua (CD) — Frontend', 'Vercel', 'Push a main (post-CI aprobado)', 'Frontend Next.js desplegado en CDN global'],
      ],
      [2000, 2800, 2000, 2226],
    ),
    sp(),

    h2('4. Integración Continua (CI) con GitHub Actions'),
    sp(),
    h3('4.1 Descripción del pipeline'),
    p('El archivo .github/workflows/ci.yml define dos jobs que se ejecutan en paralelo sobre runners ubuntu-latest:'),
    sp(),
    mkTable(
      ['Job', 'Entorno', 'Pasos clave', 'Criterio de éxito'],
      [
        ['Backend (Django)', 'Python 3.12', 'Checkout → install deps → migrate → test', '16 tests pasando'],
        ['Frontend (Next.js)', 'Node.js 20', 'Checkout → npm ci → typecheck → lint → build', 'Build de producción exitoso sin errores'],
      ],
      [2000, 1500, 3000, 2526],
    ),
    sp(),
    h3('4.2 Beneficios observados'),
    bl('Detección temprana de errores: fallas en tests, TypeScript o lint bloquean el merge antes de afectar main.'),
    bl('Confianza en los Pull Requests: el equipo revisa cambios sabiendo que el pipeline validó la corrección automáticamente.'),
    bl('Caché de dependencias: pip y npm se cachean por hash de archivo de bloqueo, reduciendo el tiempo de CI en ~50% en ejecuciones sin cambios de dependencias.'),
    bl('Trazabilidad: el estado del pipeline queda registrado y es visible en cada commit y PR dentro de GitHub.'),
    sp(),

    h2('5. Entrega Continua (CD)'),
    sp(),
    h3('5.1 Backend en Railway'),
    p('Railway monitorea la rama main del repositorio y ejecuta automáticamente un nuevo deploy ante cada push. El proceso incluye la instalación de dependencias Python, la aplicación de migraciones de base de datos y el reinicio del servidor Gunicorn. La base de datos PostgreSQL es gestionada directamente por Railway, eliminando la necesidad de administrar infraestructura de base de datos de forma manual.'),
    sp(),
    h3('5.2 Frontend en Vercel'),
    p('Vercel detecta automáticamente los proyectos Next.js y ejecuta next build en cada push a main. El resultado se despliega en una CDN global con latencia optimizada para el usuario final. Adicionalmente, cada Pull Request genera un preview deployment con URL única, lo que permite revisar cambios de interfaz antes del merge sin necesitar un entorno de staging dedicado.'),
    sp(),

    h2('6. Estado del Sistema al Cierre del Sprint 3'),
    sp(),
    mkTable(
      ['Indicador', 'Estado al cierre del Sprint 3'],
      [
        ['Pipeline de CI activo', 'Sí — ejecutándose en cada push y PR a main y dev'],
        ['Tests backend pasando', '16 / 16 (módulos: animals, health, feeding, auth)'],
        ['Typecheck frontend', 'Sin errores (TypeScript strict)'],
        ['Lint frontend', 'Sin errores ni advertencias (ESLint)'],
        ['Build de producción', 'Exitoso — 8 rutas generadas (incluye /animales/[id] dinámico)'],
        ['Deploy backend (Railway)', 'Configurado con deploy automático desde main'],
        ['Deploy frontend (Vercel)', 'Configurado con deploy automático y preview por PR'],
      ],
      [3800, 5226],
    ),
    sp(),

    h2('7. Lecciones Aprendidas'),
    bl('La separación entre api_payload() (pruebas de API con PK entero) y make_event() (ORM con instancia de modelo) previno errores de tipo en los tests del backend Django (ValueError al asignar PK entero directamente a un campo FK). Este patrón debe aplicarse en todos los módulos futuros.'),
    bl('TypeScript strict con ESLint detectó antes del commit errores de API en componentes de formulario (uso de htmlFor en lugar de fieldId, Boolean() requerido donde se esperaba boolean). El CI refuerza esta validación de forma automática.'),
    bl('Los preview deployments de Vercel aceleran significativamente la revisión de cambios de interfaz en PRs sin requerir entornos de staging dedicados.'),
    bl('El uso de caché de dependencias (pip, npm) en CI redujo el tiempo promedio de ejecución del pipeline de ~6 minutos a ~3 minutos entre sprints.'),
    sp(),

    h2('8. Próximos Pasos (Sprint 4)'),
    bl('Agregar cobertura de código al job de backend con pytest-cov y publicar el reporte de cobertura como artefacto del pipeline.'),
    bl('Configurar Dependabot para la revisión automática de actualizaciones de dependencias de seguridad en Python y Node.js.'),
    bl('Evaluar la incorporación de tests de integración end-to-end con Playwright para los flujos críticos del frontend (login, registro de animales, registro de eventos de salud).'),
    bl('Documentar el proceso de rollback en Railway y Vercel para casos de deploy fallido en producción.'),
  ];
  await save(makeDoc(children), 'PGAT-28_informe_cicd_devops.docx');
}

// Run all in parallel
(async () => {
  try {
    await Promise.all([pgat23(), pgat24(), pgat25(), pgat26(), pgat27(), pgat28()]);
    console.log('\nTodos los documentos generados correctamente.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
