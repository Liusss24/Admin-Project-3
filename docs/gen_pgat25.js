const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require('docx');
const fs = require('fs');

const DEST = 'D:/Documentos/TEC/Administración de Proyectos/Proyecto 3';
const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] }); }
function p(text) { return new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 24 })] }); }
function li(text) { return new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text, font: 'Arial', size: 24 })] }); }
function empty() { return new Paragraph({ children: [new TextRun('')] }); }
function tHead(cols, widths) {
  return new TableRow({ tableHeader: true, children: cols.map((c, i) => new TableCell({ borders, width: { size: widths[i], type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, font: 'Arial', size: 20 })] })] })) });
}
function tRow(cols, widths) {
  return new TableRow({ children: cols.map((c, i) => new TableCell({ borders, width: { size: widths[i], type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, font: 'Arial', size: 20 })] })] })) });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 24 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, font: 'Arial', color: '1F3864' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: 'Arial', color: '2E4D8A' }, paragraph: { spacing: { before: 180, after: 90 }, outlineLevel: 1 } },
    ]
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      h1('PGAT-25: Plan de Recursos y Adquisiciones'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Objetivo'),
      p('Documentar los recursos humanos, tecnológicos e infraestructurales necesarios para el desarrollo del proyecto PGAT, así como las adquisiciones de herramientas y servicios requeridos para completar el MVP.'),
      empty(),
      h2('2. Recursos Humanos'),
      p('El equipo de desarrollo PGAT es un equipo académico multidisciplinario. Cada miembro asume roles combinados dado el alcance del proyecto:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2500, 2500, 2360, 2000],
        rows: [
          tHead(['Miembro', 'Rol principal', 'Responsabilidades', 'Dedicación'], [2500, 2500, 2360, 2000]),
          tRow(['Equipo PGAT', 'Desarrollador Full-Stack', 'Backend (Django), Frontend (Next.js), DevOps', '20 hrs/semana'], [2500, 2500, 2360, 2000]),
          tRow(['Equipo PGAT', 'Líder de proyecto / Scrum Master', 'Planificacion, Jira, documentacion, demos', '20 hrs/semana'], [2500, 2500, 2360, 2000]),
          tRow(['Docentes TEC', 'Supervisores', 'Evaluacion de entregables y retroalimentacion', 'Horas de revision'], [2500, 2500, 2360, 2000]),
        ]
      }),
      empty(),
      h2('3. Recursos Tecnológicos'),
      h2('3.1 Stack Técnico (sin costo adicional)'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2500, 4360, 2500],
        rows: [
          tHead(['Tecnología', 'Uso en el proyecto', 'Licencia'], [2500, 4360, 2500]),
          tRow(['Python 3.12 + Django 6', 'API REST del backend', 'Open Source (BSD)'], [2500, 4360, 2500]),
          tRow(['Django REST Framework', 'Serializacion y endpoints', 'Open Source (BSD)'], [2500, 4360, 2500]),
          tRow(['Simple JWT', 'Autenticacion con tokens JWT', 'Open Source (MIT)'], [2500, 4360, 2500]),
          tRow(['PostgreSQL 16', 'Base de datos relacional', 'Open Source (PostgreSQL License)'], [2500, 4360, 2500]),
          tRow(['Next.js 16 + TypeScript', 'Frontend con App Router', 'Open Source (MIT)'], [2500, 4360, 2500]),
          tRow(['Tailwind CSS 4', 'Estilos y diseno responsivo', 'Open Source (MIT)'], [2500, 4360, 2500]),
          tRow(['Git + GitHub', 'Control de versiones y CI/CD', 'Gratuito para proyectos academicos'], [2500, 4360, 2500]),
        ]
      }),
      empty(),
      h2('3.2 Herramientas de Gestión'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2500, 4360, 2500],
        rows: [
          tHead(['Herramienta', 'Uso', 'Costo'], [2500, 4360, 2500]),
          tRow(['Jira (plan gratuito)', 'Gestion del backlog y sprints', 'Gratuito (hasta 10 usuarios)'], [2500, 4360, 2500]),
          tRow(['GitHub Actions', 'Pipeline de CI/CD', 'Gratuito (2000 min/mes en repos publicos)'], [2500, 4360, 2500]),
          tRow(['VS Code', 'IDE principal del equipo', 'Gratuito (MIT)'], [2500, 4360, 2500]),
          tRow(['Postman', 'Prueba de endpoints de API', 'Gratuito (plan basico)'], [2500, 4360, 2500]),
        ]
      }),
      empty(),
      h2('4. Plan de Adquisiciones'),
      p('Las siguientes adquisiciones de servicios en la nube son necesarias para el despliegue del MVP:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 2200, 2200, 1480, 1480],
        rows: [
          tHead(['Servicio', 'Proveedor', 'Uso', 'Plan', 'Costo mensual'], [2000, 2200, 2200, 1480, 1480]),
          tRow(['Hosting backend', 'Railway', 'Despliegue Django + PostgreSQL', 'Hobby ($5/mes)', '$5 USD'], [2000, 2200, 2200, 1480, 1480]),
          tRow(['Hosting frontend', 'Vercel', 'Despliegue Next.js', 'Hobby (gratuito)', '$0 USD'], [2000, 2200, 2200, 1480, 1480]),
          tRow(['Base de datos', 'Railway (incluido)', 'PostgreSQL 16', 'Incluido en Hobby', '$0 USD'], [2000, 2200, 2200, 1480, 1480]),
          tRow(['Dominio (opcional)', 'Por definir', 'URL personalizada', 'Anual', '~$12 USD/ano'], [2000, 2200, 2200, 1480, 1480]),
        ]
      }),
      empty(),
      p('Costo estimado total del MVP (sin dominio): $5 USD/mes durante la duración del proyecto academico.'),
      empty(),
      h2('5. Equipos e Infraestructura'),
      li('Computadoras personales del equipo de desarrollo (propias, sin costo adicional al proyecto).'),
      li('Conexion a internet para reuniones virtuales y acceso a servicios cloud.'),
      li('Acceso a la red TEC para recursos academicos y comunicacion con docentes.'),
      empty(),
      h2('6. Criterios de Adquisición'),
      li('Preferencia por herramientas de codigo abierto o con planes gratuitos para proyectos academicos.'),
      li('Cualquier adquisicion con costo debe ser aprobada por el lider del proyecto.'),
      li('Los servicios en la nube se evaluan con criterios de costo, facilidad de despliegue y documentacion disponible.'),
      li('Se prioriza Railway sobre alternativas de pago por su simplicidad de configuracion con Docker y Django.'),
      empty(),
      h2('7. Conclusiones'),
      p('El proyecto PGAT logra operar con un presupuesto minimo gracias al uso extensivo de herramientas de codigo abierto y planes gratuitos de plataformas cloud. El unico costo recurrente previsto es el hosting del backend en Railway ($5 USD/mes), lo que hace al proyecto altamente accesible para la fase academica y facilmente escalable a produccion real en el futuro.'),
    ]
  }]
});

Packer.toBuffer(doc)
  .then(b => { fs.writeFileSync(`${DEST}/PGAT-25_plan_recursos_adquisiciones.docx`, b); console.log('PGAT-25 OK'); })
  .catch(e => console.error('ERROR PGAT-25:', e));
