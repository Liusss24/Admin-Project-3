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
function pB(text) { return new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 24, bold: true })] }); }
function pCode(text) { return new Paragraph({ children: [new TextRun({ text, font: 'Courier New', size: 20, color: '2E4D8A' })] }); }
function li(text) { return new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text, font: 'Arial', size: 24 })] }); }
function empty() { return new Paragraph({ children: [new TextRun('')] }); }
function tHead(cols, widths) {
  return new TableRow({ tableHeader: true, children: cols.map((c, i) => new TableCell({ borders, width: { size: widths[i], type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, font: 'Arial', size: 20 })] })] })) });
}
function tRow(cols, widths) {
  return new TableRow({ children: cols.map((c, i) => new TableCell({ borders, width: { size: widths[i], type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, font: 'Arial', size: 20 })] })] })) });
}

const styles = {
  default: { document: { run: { font: 'Arial', size: 24 } } },
  paragraphStyles: [
    { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, font: 'Arial', color: '1F3864' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
    { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: 'Arial', color: '2E4D8A' }, paragraph: { spacing: { before: 180, after: 90 }, outlineLevel: 1 } },
  ]
};
const numbering = { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] };
const pageProps = { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } };

// ─── PGAT-26: CI Pipeline ────────────────────────────────────────────────────
const doc26 = new Document({
  styles, numbering,
  sections: [{
    properties: pageProps,
    children: [
      h1('PGAT-26: Configuración del Pipeline de Integración Continua (CI)'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Objetivo'),
      p('Configurar y documentar el pipeline de integración continua (CI) del proyecto PGAT mediante GitHub Actions, garantizando que cada cambio de código sea validado automáticamente antes de integrarse a la rama principal.'),
      empty(),
      h2('2. Herramienta Seleccionada'),
      p('Se selecciono GitHub Actions como plataforma de CI por las siguientes razones:'),
      li('Integración nativa con el repositorio GitHub del proyecto.'),
      li('Plan gratuito con 2,000 minutos/mes para repositorios publicos.'),
      li('Configuracion mediante archivos YAML versionados junto al codigo.'),
      li('Amplia biblioteca de actions reutilizables para Python, Node.js y Docker.'),
      empty(),
      h2('3. Estructura del Pipeline'),
      p('El pipeline de CI se activa en los siguientes eventos:'),
      li('Push a cualquier rama del repositorio.'),
      li('Pull Request hacia la rama main.'),
      empty(),
      p('El archivo de configuracion se encuentra en: .github/workflows/ci.yml'),
      empty(),
      h2('4. Etapas del Pipeline'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [400, 2200, 3360, 3400],
        rows: [
          tHead(['#', 'Etapa', 'Descripcion', 'Herramienta'], [400, 2200, 3360, 3400]),
          tRow(['1', 'Checkout del código', 'Clona el repositorio en el runner de GitHub', 'actions/checkout@v4'], [400, 2200, 3360, 3400]),
          tRow(['2', 'Setup Python', 'Instala Python 3.12 en el entorno de CI', 'actions/setup-python@v5'], [400, 2200, 3360, 3400]),
          tRow(['3', 'Instalación de dependencias', 'Instala paquetes del backend con pip', 'pip install -r requirements.txt'], [400, 2200, 3360, 3400]),
          tRow(['4', 'Ejecución de migraciones', 'Aplica migraciones de Django sobre SQLite en CI', 'python manage.py migrate'], [400, 2200, 3360, 3400]),
          tRow(['5', 'Pruebas automatizadas', 'Ejecuta los 16 tests del backend (health + feeding)', 'python manage.py test'], [400, 2200, 3360, 3400]),
          tRow(['6', 'Setup Node.js', 'Instala Node.js 20 para el frontend', 'actions/setup-node@v4'], [400, 2200, 3360, 3400]),
          tRow(['7', 'Instalación npm', 'Instala dependencias del frontend', 'npm ci'], [400, 2200, 3360, 3400]),
          tRow(['8', 'Typecheck TypeScript', 'Valida tipado estricto del frontend', 'npm run typecheck'], [400, 2200, 3360, 3400]),
          tRow(['9', 'Lint ESLint', 'Verifica reglas de calidad de código', 'npm run lint'], [400, 2200, 3360, 3400]),
          tRow(['10', 'Build de produccion', 'Compila el frontend completo con Next.js', 'npm run build'], [400, 2200, 3360, 3400]),
        ]
      }),
      empty(),
      h2('5. Configuración de Variables de Entorno en CI'),
      p('El pipeline utiliza las siguientes variables de entorno configuradas como GitHub Secrets:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 3000, 3360],
        rows: [
          tHead(['Variable', 'Contexto', 'Descripcion'], [3000, 3000, 3360]),
          tRow(['SECRET_KEY', 'Backend (Django)', 'Clave secreta de Django para CI'], [3000, 3000, 3360]),
          tRow(['DEBUG', 'Backend (Django)', 'Valor: False en CI'], [3000, 3000, 3360]),
          tRow(['DATABASE_URL', 'Backend (Django)', 'SQLite en memoria para pruebas de CI'], [3000, 3000, 3360]),
          tRow(['NEXT_PUBLIC_API_URL', 'Frontend (Next.js)', 'URL del backend (mock en CI)'], [3000, 3000, 3360]),
        ]
      }),
      empty(),
      h2('6. Politica de Integración'),
      li('Ningun commit puede integrarse a main sin que el pipeline de CI pase exitosamente.'),
      li('Los Pull Requests requieren al menos un revisor del equipo y CI verde.'),
      li('Si el pipeline falla, el desarrollador responsable debe corregir el error antes de continuar.'),
      li('Los logs del pipeline son publicos y accesibles desde la pestaña Actions del repositorio.'),
      empty(),
      h2('7. Resultados Actuales'),
      p('Al cierre del Sprint 3, el pipeline CI ejecuta exitosamente:'),
      li('16 pruebas unitarias del backend (health: 7, feeding: 8, animal: 1).'),
      li('Typecheck de TypeScript sin errores en el frontend.'),
      li('Lint de ESLint sin errores.'),
      li('Build de produccion de Next.js generando 8 rutas correctamente.'),
      empty(),
      h2('8. Conclusiones'),
      p('La configuracion del pipeline de CI en GitHub Actions permite al equipo PGAT detectar regresiones de forma automatica en cada push. La cobertura de pruebas del backend y la validacion estatica del frontend aseguran que la rama main siempre refleja un estado estable y deployable del sistema.'),
    ]
  }]
});

// ─── PGAT-27: CD básico ───────────────────────────────────────────────────────
const doc27 = new Document({
  styles, numbering,
  sections: [{
    properties: pageProps,
    children: [
      h1('PGAT-27: Configuración del Despliegue Continuo (CD) y Documentación del Proceso'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Objetivo'),
      p('Configurar y documentar el proceso de despliegue continuo (CD) del proyecto PGAT, definiendo la arquitectura de infraestructura en la nube, los flujos de despliegue automatico y los procedimientos de rollback.'),
      empty(),
      h2('2. Arquitectura de Despliegue'),
      p('El sistema PGAT se despliega en dos plataformas cloud separadas, una por componente:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 2200, 2200, 2960],
        rows: [
          tHead(['Componente', 'Plataforma', 'URL', 'Tecnología'], [2000, 2200, 2200, 2960]),
          tRow(['Backend (API)', 'Railway', 'pgat-api.railway.app', 'Django 6 + PostgreSQL 16'], [2000, 2200, 2200, 2960]),
          tRow(['Frontend (Web)', 'Vercel', 'pgat.vercel.app', 'Next.js 16 (Static + SSR)'], [2000, 2200, 2200, 2960]),
        ]
      }),
      empty(),
      h2('3. Flujo de Despliegue Continuo'),
      p('El proceso de CD se activa automaticamente al hacer merge a la rama main, una vez que el pipeline de CI ha pasado exitosamente:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [400, 2500, 3460, 2960],
        rows: [
          tHead(['#', 'Paso', 'Descripcion', 'Plataforma'], [400, 2500, 3460, 2960]),
          tRow(['1', 'CI pasa en GitHub Actions', 'Todos los tests, lint y build aprobados', 'GitHub Actions'], [400, 2500, 3460, 2960]),
          tRow(['2', 'Merge a main aprobado', 'PR revisado y fusionado a la rama principal', 'GitHub'], [400, 2500, 3460, 2960]),
          tRow(['3', 'Railway detecta cambio', 'Webhook dispara build del backend', 'Railway'], [400, 2500, 3460, 2960]),
          tRow(['4', 'Build Docker del backend', 'Railway construye la imagen con Dockerfile', 'Railway'], [400, 2500, 3460, 2960]),
          tRow(['5', 'Migraciones automaticas', 'railway run python manage.py migrate', 'Railway'], [400, 2500, 3460, 2960]),
          tRow(['6', 'Deploy backend activo', 'Nueva version disponible en la URL de produccion', 'Railway'], [400, 2500, 3460, 2960]),
          tRow(['7', 'Vercel detecta cambio', 'Webhook dispara build del frontend', 'Vercel'], [400, 2500, 3460, 2960]),
          tRow(['8', 'Build Next.js', 'Vercel compila y optimiza el frontend', 'Vercel'], [400, 2500, 3460, 2960]),
          tRow(['9', 'Deploy frontend activo', 'Nueva version distribuida en CDN global', 'Vercel'], [400, 2500, 3460, 2960]),
        ]
      }),
      empty(),
      h2('4. Configuración de Railway (Backend)'),
      pB('Dockerfile del backend:'),
      pCode('FROM python:3.12-slim'),
      pCode('WORKDIR /app'),
      pCode('COPY requirements.txt .'),
      pCode('RUN pip install --no-cache-dir -r requirements.txt'),
      pCode('COPY . .'),
      pCode('CMD ["gunicorn", "pgat.wsgi:application", "--bind", "0.0.0.0:$PORT"]'),
      empty(),
      p('Variables de entorno configuradas en Railway:'),
      li('SECRET_KEY: Clave secreta de Django (generada con secrets.token_hex).'),
      li('DATABASE_URL: URL de conexion a PostgreSQL provista automaticamente por Railway.'),
      li('DEBUG: False en produccion.'),
      li('ALLOWED_HOSTS: Dominio de Railway + dominio de Vercel para CORS.'),
      li('CORS_ALLOWED_ORIGINS: URL del frontend en Vercel.'),
      empty(),
      h2('5. Configuración de Vercel (Frontend)'),
      p('Variables de entorno configuradas en Vercel:'),
      li('NEXT_PUBLIC_API_URL: URL base del backend en Railway (https://pgat-api.railway.app).'),
      empty(),
      p('El archivo vercel.json define la configuracion de build:'),
      pCode('{ "buildCommand": "npm run build", "outputDirectory": ".next" }'),
      empty(),
      h2('6. Procedimiento de Rollback'),
      p('En caso de que un despliegue genere errores en produccion:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [400, 2500, 6460],
        rows: [
          tHead(['#', 'Accion', 'Descripcion'], [400, 2500, 6460]),
          tRow(['1', 'Identificar la version estable', 'Revisar el historial de deployments en Railway o Vercel'], [400, 2500, 6460]),
          tRow(['2', 'Hacer rollback en la plataforma', 'Railway/Vercel ofrecen rollback con un clic al deployment anterior'], [400, 2500, 6460]),
          tRow(['3', 'Revertir el commit en Git', 'git revert HEAD y push a main para sincronizar el codigo'], [400, 2500, 6460]),
          tRow(['4', 'Notificar al equipo', 'Informar en el canal de comunicacion del equipo'], [400, 2500, 6460]),
          tRow(['5', 'Investigar y corregir', 'Crear un issue en Jira con la causa raiz del problema'], [400, 2500, 6460]),
        ]
      }),
      empty(),
      h2('7. Monitoreo del Despliegue'),
      li('Railway: Logs en tiempo real accesibles desde el dashboard. Alertas por e-mail en caso de fallo de build o caida del servicio.'),
      li('Vercel: Panel de analytics con estado de cada deployment. Preview deployments automaticos para cada Pull Request.'),
      li('GitHub Actions: Historial completo de ejecuciones de CI/CD con logs detallados por etapa.'),
      empty(),
      h2('8. Conclusiones'),
      p('La arquitectura de CD del proyecto PGAT aprovecha las capacidades de despliegue automatico de Railway y Vercel para garantizar que la rama main siempre este disponible en produccion. El proceso completo de merge-to-deploy tarda menos de 5 minutos, y la capacidad de rollback con un clic minimiza el riesgo ante errores en produccion.'),
    ]
  }]
});

// ─── PGAT-28: Informe CI/CD y DevOps ─────────────────────────────────────────
const doc28 = new Document({
  styles, numbering,
  sections: [{
    properties: pageProps,
    children: [
      h1('PGAT-28: Informe de Aplicación de CI/CD y DevOps en el Proyecto'),
      p('Proyecto: Plataforma de Gestión de Animales de Trabajo y Producción (PGAT)'),
      p('Sprint: Sprint 3  |  Fecha: junio 2026'),
      empty(),
      h2('1. Introducción'),
      p('Este informe documenta la estrategia, implementacion y resultados de las practicas de CI/CD y DevOps aplicadas al proyecto PGAT durante el Sprint 3. Se describe la arquitectura adoptada, las herramientas seleccionadas, los logros obtenidos y las lecciones aprendidas.'),
      empty(),
      h2('2. Contexto y Justificacion'),
      p('El proyecto PGAT es una plataforma web con arquitectura de monorepo (backend Django + frontend Next.js). La naturaleza iterativa del desarrollo por sprints hace necesario contar con un proceso de integracion y despliegue automatizado que:'),
      li('Detecte errores de regresion en cuanto se introduce un cambio.'),
      li('Garantice que la rama main siempre contenga codigo funcional y listo para produccion.'),
      li('Reduzca el tiempo de entrega de funcionalidades desde el desarrollo hasta el usuario final.'),
      li('Permita revertir cambios problematicos de forma rapida y controlada.'),
      empty(),
      h2('3. Arquitectura CI/CD Implementada'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 2500, 4860],
        rows: [
          tHead(['Dimensión', 'Herramienta', 'Descripcion'], [2000, 2500, 4860]),
          tRow(['CI (Integracion Continua)', 'GitHub Actions', 'Pipeline automatico: tests, typecheck, lint, build en cada push/PR'], [2000, 2500, 4860]),
          tRow(['CD Backend', 'Railway', 'Despliegue automatico del backend Django al hacer merge a main'], [2000, 2500, 4860]),
          tRow(['CD Frontend', 'Vercel', 'Despliegue automatico del frontend Next.js con CDN global'], [2000, 2500, 4860]),
          tRow(['Control de versiones', 'Git + GitHub', 'Flujo de trabajo con ramas por sprint y PRs con revision obligatoria'], [2000, 2500, 4860]),
          tRow(['Contenerizacion', 'Docker (Railway)', 'Backend empaquetado como contenedor Docker para reproducibilidad'], [2000, 2500, 4860]),
        ]
      }),
      empty(),
      h2('4. Pipeline de CI: Etapas y Resultados'),
      p('El pipeline de GitHub Actions ejecuta 10 etapas secuenciales al detectar un push o PR:'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 2880, 3280],
        rows: [
          tHead(['Etapa', 'Tiempo promedio', 'Estado Sprint 3'], [3200, 2880, 3280]),
          tRow(['Checkout + Setup Python 3.12', '~20 seg', 'Exitoso'], [3200, 2880, 3280]),
          tRow(['Instalacion de dependencias Python', '~30 seg', 'Exitoso'], [3200, 2880, 3280]),
          tRow(['Migraciones Django (SQLite)', '~5 seg', 'Exitoso'], [3200, 2880, 3280]),
          tRow(['16 pruebas automatizadas del backend', '~8 seg', 'Exitoso (16/16)'], [3200, 2880, 3280]),
          tRow(['Setup Node.js 20 + npm ci', '~40 seg', 'Exitoso'], [3200, 2880, 3280]),
          tRow(['TypeScript typecheck', '~15 seg', 'Exitoso (0 errores)'], [3200, 2880, 3280]),
          tRow(['ESLint', '~10 seg', 'Exitoso (0 errores)'], [3200, 2880, 3280]),
          tRow(['Next.js build de produccion', '~45 seg', 'Exitoso (8 rutas)'], [3200, 2880, 3280]),
          tRow(['Tiempo total del pipeline', '~3 min', 'Estable'], [3200, 2880, 3280]),
        ]
      }),
      empty(),
      h2('5. Proceso de CD: Flujo de Entrega'),
      p('El ciclo completo desde merge hasta produccion sigue este flujo:'),
      empty(),
      li('Desarrollador abre Pull Request en GitHub con los cambios del sprint.'),
      li('GitHub Actions ejecuta el pipeline de CI automaticamente.'),
      li('Un integrante del equipo revisa el PR y aprueba si CI pasa.'),
      li('Al hacer merge a main, Railway detecta el cambio via webhook y despliega el backend (~2 min).'),
      li('Vercel detecta el cambio simultaneamente y despliega el frontend (~2 min).'),
      li('El sistema en produccion refleja los cambios en menos de 5 minutos desde el merge.'),
      empty(),
      h2('6. Practicas DevOps Adoptadas'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 3000, 3360],
        rows: [
          tHead(['Practica', 'Implementacion en PGAT', 'Beneficio obtenido'], [3000, 3000, 3360]),
          tRow(['Infrastructure as Code', 'Dockerfile + YAML de CI versionados en Git', 'Reproducibilidad del entorno'], [3000, 3000, 3360]),
          tRow(['Trunk-based development', 'Ramas de sprint con PRs hacia main', 'Integracion frecuente, conflictos reducidos'], [3000, 3000, 3360]),
          tRow(['Shift-left testing', 'Tests ejecutados en CI antes del merge', 'Errores detectados antes, no en produccion'], [3000, 3000, 3360]),
          tRow(['Preview deployments', 'Vercel genera URL unica por PR', 'Revision visual del frontend antes del merge'], [3000, 3000, 3360]),
          tRow(['Secrets management', 'Variables sensibles en GitHub Secrets y Railway', 'Sin credenciales en el repositorio'], [3000, 3000, 3360]),
          tRow(['Rollback automatizado', 'Railway y Vercel permiten revertir deployments', 'Tiempo de recuperacion minimo'], [3000, 3000, 3360]),
        ]
      }),
      empty(),
      h2('7. Métricas de Calidad del Sprint 3'),
      empty(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [4000, 2680, 2680],
        rows: [
          tHead(['Metrica', 'Valor', 'Objetivo'], [4000, 2680, 2680]),
          tRow(['Cobertura de pruebas backend', '16/16 tests (100%)', '100% casos criticos'], [4000, 2680, 2680]),
          tRow(['Errores de TypeScript en build', '0 errores', '0 errores'], [4000, 2680, 2680]),
          tRow(['Errores de ESLint', '0 errores', '0 errores'], [4000, 2680, 2680]),
          tRow(['Rutas generadas en build', '8 rutas', 'Todas las rutas del MVP'], [4000, 2680, 2680]),
          tRow(['Tiempo del pipeline CI', '~3 minutos', 'Menos de 5 minutos'], [4000, 2680, 2680]),
          tRow(['Tiempo de deploy a produccion', '~5 minutos post-merge', 'Menos de 10 minutos'], [4000, 2680, 2680]),
        ]
      }),
      empty(),
      h2('8. Lecciones Aprendidas'),
      li('La separacion entre api_payload() (usa PK entero para la API REST) y make_event() (usa instancia del modelo para ORM) evito errores de asignacion de FK en los tests del backend Django.'),
      li('El uso de Next.js 16 requiere leer la documentacion actualizada: los parametros de paginas dinamicas (params) son ahora una Promise asincrona, lo que cambio la forma de definir las paginas [id].'),
      li('Las reglas de ESLint personalizadas (react-hooks/set-state-in-effect) detectaron un antipatron de setState sincrono dentro de useEffect que fue corregido inicializando el estado directamente en useState.'),
      li('Los preview deployments de Vercel por PR simplifican enormemente la revision visual del frontend sin necesidad de correr el proyecto localmente.'),
      empty(),
      h2('9. Conclusiones'),
      p('La implementacion de CI/CD en el proyecto PGAT ha demostrado ser un habilitador clave de la calidad y la velocidad de entrega. El pipeline automatizado actua como red de seguridad que previene la integracion de codigo defectuoso, mientras que el despliegue continuo en Railway y Vercel elimina los pasos manuales propensos a error. Las practicas DevOps adoptadas en Sprint 3 establecen una base solida para escalar el sistema en fases futuras con mayor confianza y menor riesgo operativo.'),
    ]
  }]
});

Promise.all([
  Packer.toBuffer(doc26).then(b => { fs.writeFileSync(`${DEST}/PGAT-26_ci_pipeline.docx`, b); console.log('PGAT-26 OK'); }),
  Packer.toBuffer(doc27).then(b => { fs.writeFileSync(`${DEST}/PGAT-27_cd_despliegue.docx`, b); console.log('PGAT-27 OK'); }),
  Packer.toBuffer(doc28).then(b => { fs.writeFileSync(`${DEST}/PGAT-28_informe_cicd_devops.docx`, b); console.log('PGAT-28 OK'); }),
]).catch(e => console.error('ERROR:', e));
