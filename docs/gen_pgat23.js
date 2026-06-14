const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require('docx');
const fs = require('fs');

const DEST = 'D:/Documentos/TEC/Administración de Proyectos/Proyecto 3';

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}
function p(text) {
  return new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 24 })] });
}
function pB(text) {
  return new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 24, bold: true })] });
}
function li(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children: [new TextRun({ text, font: 'Arial', size: 24 })]
  });
}
function empty() {
  return new Paragraph({ children: [new TextRun('')] });
}
function tHead(cols, widths) {
  return new TableRow({
    tableHeader: true,
    children: cols.map((c, i) => new TableCell({
      borders, width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: 'D5E8F0', type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, font: 'Arial', size: 20 })] })]
    }))
  });
}
function tRow(cols, widths) {
  return new TableRow({
    children: cols.map((c, i) => new TableCell({
      borders, width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: c, font: 'Arial', size: 20 })] })]
    }))
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 24 } } },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: '1F3864' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial', color: '2E4D8A' },
        paragraph: { spacing: { before: 180, after: 90 }, outlineLevel: 1 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      h1('PGAT-23: Análisis y Mapeo de Stakeholders'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Objetivo'),
      p('Identificar, clasificar y analizar a todos los interesados del proyecto PGAT, estableciendo su nivel de influencia e interés para definir estrategias de gestión diferenciadas.'),
      empty(),
      h2('2. Identificación de Stakeholders'),
      p('Los siguientes interesados fueron identificados durante la fase de inicio del proyecto y revisados en Sprint 3:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1200, 2500, 2000, 1830, 1830],
        rows: [
          tHead(['ID', 'Stakeholder', 'Rol', 'Influencia', 'Interés'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-01', 'Equipo de desarrollo PGAT', 'Ejecutor del proyecto', 'Alta', 'Alta'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-02', 'Docentes evaluadores TEC', 'Supervisión académica', 'Alta', 'Media'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-03', 'Administrador de finca', 'Usuario principal (MVP)', 'Media', 'Alta'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-04', 'Veterinario', 'Usuario técnico', 'Media', 'Alta'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-05', 'Operario de campo', 'Usuario operativo', 'Baja', 'Alta'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-06', 'Observador / inversor', 'Consultor de datos (Fase 2)', 'Baja', 'Media'], [1200, 2500, 2000, 1830, 1830]),
          tRow(['SH-07', 'TEC (institución)', 'Marco académico', 'Alta', 'Baja'], [1200, 2500, 2000, 1830, 1830]),
        ]
      }),
      empty(),
      h2('3. Matriz Poder / Interés'),
      p('La clasificación según la matriz Poder-Interés define la estrategia de gestión de cada grupo:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 3510, 3510],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: '', font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Interés Bajo', bold: true, font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Interés Alto', bold: true, font: 'Arial', size: 20 })] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Poder Alto', bold: true, font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Mantener satisfecho: TEC, Docentes evaluadores', font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Gestionar de cerca: Equipo PGAT, Docentes', font: 'Arial', size: 20 })] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Poder Bajo', bold: true, font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Monitorear: Observador / inversor', font: 'Arial', size: 20 })] })] }),
              new TableCell({ borders, width: { size: 3510, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Mantener informado: Admin finca, Veterinario, Operario', font: 'Arial', size: 20 })] })] }),
            ]
          }),
        ]
      }),
      empty(),
      h2('4. Perfil Detallado de Stakeholders'),
      empty(),
      pB('SH-01 — Equipo de desarrollo PGAT'),
      li('Interés: Entregar el proyecto con calidad técnica dentro del plazo académico.'),
      li('Expectativas: Metodología ágil clara, retroalimentación oportuna, herramientas modernas.'),
      li('Estrategia: Reuniones de planificación de sprint semanales, tablero Jira actualizado.'),
      empty(),
      pB('SH-02 — Docentes evaluadores TEC'),
      li('Interés: Cumplimiento de rúbricas académicas, evidencia de gestión de proyectos.'),
      li('Expectativas: Documentación completa, sprints entregados en tiempo, buenas prácticas.'),
      li('Estrategia: Informes de avance por sprint, demostraciones funcionales en hitos.'),
      empty(),
      pB('SH-03 — Administrador de finca (usuario MVP)'),
      li('Interés: Plataforma fácil de usar para registrar animales y obtener reportes.'),
      li('Expectativas: Interfaz intuitiva, datos organizados por categoría, acceso multiplataforma.'),
      li('Estrategia: Prototipo funcional presentado en Sprint 3, retroalimentación en Sprint 4.'),
      empty(),
      pB('SH-04 — Veterinario'),
      li('Interés: Módulos de salud y alimentación con historial completo por animal.'),
      li('Expectativas: Registro de eventos médicos, historial cronológico, exportación de datos.'),
      li('Estrategia: Módulo implementado en Sprint 3, mejoras basadas en retroalimentación en Sprint 4.'),
      empty(),
      pB('SH-05 — Operario de campo'),
      li('Interés: Registro rápido de alimentación y condición de animales.'),
      li('Expectativas: Formularios simples, acceso móvil, sin capacitación extensa.'),
      li('Estrategia: Diseño responsivo priorizado desde Sprint 2, validación en Sprint 4.'),
      empty(),
      pB('SH-06 — Observador / inversor (Fase 2)'),
      li('Interés: Datos consolidados de rentabilidad y producción.'),
      li('Expectativas: Dashboards con métricas financieras, exportación a PDF/Excel.'),
      li('Estrategia: Perfil contemplado en diseño arquitectónico, implementación diferida a Fase 2.'),
      empty(),
      pB('SH-07 — TEC (institución académica)'),
      li('Interés: Proyecto que cumpla con los requisitos del curso de Administración de Proyectos.'),
      li('Expectativas: Aplicación de PMBOK/Scrum, documentación de gestión, entrega junio 2026.'),
      li('Estrategia: Mantener documentación al día, seguir cronograma de sprints acordado.'),
      empty(),
      h2('5. Conclusiones'),
      p('El proyecto PGAT cuenta con un grupo reducido de interesados concentrado en el entorno académico y en los usuarios finales del sistema. La estrategia de gestión prioriza la comunicación frecuente con el equipo de desarrollo y los evaluadores, mientras mantiene informados a los usuarios finales mediante demostraciones funcionales en cada sprint. El observador/inversor se gestiona como stakeholder de Fase 2 sin impacto en el alcance actual del MVP.'),
    ]
  }]
});

Packer.toBuffer(doc)
  .then(b => { fs.writeFileSync(`${DEST}/PGAT-23_stakeholders.docx`, b); console.log('PGAT-23 OK'); })
  .catch(e => console.error('ERROR PGAT-23:', e));
