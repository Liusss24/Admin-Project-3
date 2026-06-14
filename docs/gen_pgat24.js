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
      h1('PGAT-24: Estrategia de Comunicación con los Interesados'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Objetivo'),
      p('Definir los canales, frecuencias, formatos y responsables de la comunicación entre todos los interesados del proyecto PGAT, garantizando transparencia y alineación durante el ciclo de vida del proyecto.'),
      empty(),
      h2('2. Principios de Comunicación'),
      li('Claridad: Mensajes directos y concisos, sin ambigüedades.'),
      li('Oportunidad: Comunicar en el momento adecuado para la toma de decisiones.'),
      li('Trazabilidad: Todo acuerdo o decisión queda registrado en Jira o en minutas.'),
      li('Adaptabilidad: El canal y el nivel de detalle se ajustan al perfil del interesado.'),
      empty(),
      h2('3. Canales de Comunicación'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 2500, 2000, 2660],
        rows: [
          tHead(['Canal', 'Propósito', 'Audiencia', 'Frecuencia'], [2200, 2500, 2000, 2660]),
          tRow(['Jira (tablero)', 'Seguimiento de tareas y estado del sprint', 'Equipo + Docentes', 'Tiempo real'], [2200, 2500, 2000, 2660]),
          tRow(['GitHub (commits/PR)', 'Control de versiones y revisión de código', 'Equipo de desarrollo', 'Por entrega'], [2200, 2500, 2000, 2660]),
          tRow(['Reunión semanal (virtual)', 'Planificación y retrospectiva de sprint', 'Equipo de desarrollo', 'Semanal'], [2200, 2500, 2000, 2660]),
          tRow(['Informe de avance (docx)', 'Reporte formal a docentes por sprint', 'Docentes TEC', 'Por sprint'], [2200, 2500, 2000, 2660]),
          tRow(['Demostración funcional', 'Presentación del prototipo al usuario', 'Admin finca, Docentes', 'Por sprint'], [2200, 2500, 2000, 2660]),
          tRow(['Correo electrónico', 'Comunicaciones formales y urgencias', 'Todos', 'Según necesidad'], [2200, 2500, 2000, 2660]),
          tRow(['WhatsApp / mensajería', 'Coordinación rápida del equipo', 'Equipo de desarrollo', 'Diario'], [2200, 2500, 2000, 2660]),
        ]
      }),
      empty(),
      h2('4. Plan de Comunicación por Interesado'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 2000, 2000, 1680, 1680],
        rows: [
          tHead(['Stakeholder', 'Información necesaria', 'Canal', 'Frecuencia', 'Responsable'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Docentes TEC', 'Avance, riesgos, entregables', 'Informe + Demo', 'Por sprint', 'Líder de proyecto'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Equipo PGAT', 'Tareas, bloqueos, decisiones', 'Jira + Reunión', 'Diario/Semanal', 'Scrum Master'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Admin finca', 'Funcionalidades disponibles', 'Demo funcional', 'Por sprint', 'Líder de proyecto'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Veterinario', 'Módulos de salud y alimentación', 'Demo + Correo', 'Sprint 3-4', 'Desarrollador'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Operario', 'Acceso y usabilidad del sistema', 'Demo presencial', 'Sprint 4', 'Líder de proyecto'], [2000, 2000, 2000, 1680, 1680]),
          tRow(['Observador', 'Progreso general del proyecto', 'Correo / Informe', 'Mensual', 'Líder de proyecto'], [2000, 2000, 2000, 1680, 1680]),
        ]
      }),
      empty(),
      h2('5. Reuniones del Proyecto'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2500, 2000, 2000, 2860],
        rows: [
          tHead(['Tipo de reunión', 'Participantes', 'Duración', 'Objetivo'], [2500, 2000, 2000, 2860]),
          tRow(['Planificación de sprint', 'Equipo PGAT', '1 hora', 'Definir backlog y compromisos del sprint'], [2500, 2000, 2000, 2860]),
          tRow(['Revisión de sprint', 'Equipo + Docentes', '30 min', 'Demostrar funcionalidades completadas'], [2500, 2000, 2000, 2860]),
          tRow(['Retrospectiva', 'Equipo PGAT', '30 min', 'Identificar mejoras al proceso'], [2500, 2000, 2000, 2860]),
          tRow(['Sesion con usuario', 'Líder + Admin/Vet', '45 min', 'Validar prototipos y recopilar retroalimentacion'], [2500, 2000, 2000, 2860]),
        ]
      }),
      empty(),
      h2('6. Gestión de Cambios en la Comunicación'),
      p('Cualquier cambio en el plan de comunicación debe ser aprobado por el líder del proyecto. Los cambios de canal o frecuencia con impacto en los docentes evaluadores requieren notificación formal por correo electrónico con al menos 48 horas de anticipación.'),
      empty(),
      h2('7. Conclusiones'),
      p('La estrategia de comunicación del proyecto PGAT está diseñada para mantener alineados a todos los interesados con el avance real del proyecto. El uso de Jira como herramienta central de seguimiento, complementado con informes de sprint formales y demostraciones funcionales, garantiza transparencia hacia los evaluadores académicos, mientras que la comunicación directa con usuarios finales permite validar el producto de forma continua.'),
    ]
  }]
});

Packer.toBuffer(doc)
  .then(b => { fs.writeFileSync(`${DEST}/PGAT-24_estrategia_comunicacion.docx`, b); console.log('PGAT-24 OK'); })
  .catch(e => console.error('ERROR PGAT-24:', e));
