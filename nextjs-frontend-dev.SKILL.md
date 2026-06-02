---
name: nextjs-frontend-dev
description: >
  Guia definitiva de arquitectura y flujo de trabajo para el frontend del
  monorepo PGAT: Next.js 16 (App Router) + TypeScript estricto + Tailwind CSS 4,
  consumiendo un backend real Django REST Framework (JWT). Usar esta skill
  cuando el usuario: empiece o toque el frontend, pregunte donde debe vivir un
  archivo, pregunte el patron correcto para un hook, repositorio o caso de uso,
  pregunte como estructurar una feature o widget, pregunte como abordar una
  User Story / issue de Jira nuevo, como conectar el frontend con la API, o
  tenga dudas sobre commits, i18n, estilos o cualquier convencion del proyecto.
  Tambien usar cuando el usuario comparta codigo de un hook o componente y
  pregunte si esta bien estructurado, o cuando quiera saber si algo es un
  hardcode. Esta skill es la referencia de autoridad para decisiones de
  estructura y convencion del frontend en este monorepo Next.js + Django.
---

> Lee este documento completo antes de proponer cambios o crear archivos.
> Contiene todo lo necesario para trabajar con la misma convencion en cualquier
> sesion: stack, reglas, estructura, patrones, helpers disponibles, integracion
> con el backend y como abordar una User Story / issue de Jira nuevo.

---

## 1. Stack y comandos

> **Monorepo.** El proyecto vive en un monorepo con dos paquetes:
> `frontend/` (Next.js, este documento) y `backend/` (Django REST Framework).
> **Todas las rutas `src/...` de esta skill son relativas a `frontend/`.**

- **Framework:** Next.js 16 (App Router) con TypeScript estricto. Es una version
  mas nueva que la de tu entrenamiento; antes de escribir codigo que toque APIs
  sensibles a la version (params/searchParams async, caching, fuentes, metadata)
  consulta `frontend/node_modules/next/dist/docs/`.
- **Estilos:** Tailwind CSS 4 (plugin PostCSS, `@import "tailwindcss"` en
  `globals.css`).
- **i18n:** sistema propio con catalogos por idioma (`es`/`en`) en
  `src/i18n/locales/*` y un Provider en `src/app/providers/i18n-provider.tsx`.
  Idioma por defecto: `es`.
- **State global:** React state local en cada hook + `useSyncExternalStore`
  para datos compartidos (sesion/JWT). Sin Redux/Zustand/Jotai.
- **Backend y persistencia:** backend real Django REST Framework bajo `backend/`.
  El frontend consume la API via `src/shared/api/http-client.ts` (fetch tipado
  con JWT). La autenticacion usa JWT (simplejwt): el access/refresh token vive en
  el store de sesion (`src/shared/lib/session/*`). **`localStorage` se usa solo
  para tokens y preferencias (idioma), nunca como base de datos de dominio.** Los
  datos de dominio se leen/escriben contra la API en los repositorios de entidad
  (`src/entities/<entidad>/model/<entidad>.repository.ts`).
- **API base URL:** `process.env.NEXT_PUBLIC_API_URL` (ver `.env.local.example`).
- **Iconos:** `lucide-react`. Nunca emojis.

### Scripts npm (en `frontend/`)

```bash
npm run dev         # next dev
npm run build       # next build
npm run start       # next start
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
```

Antes de cerrar un cambio: **siempre** correr `npm run typecheck` y
`npm run lint`. Los errores en archivos ajenos no se tocan — se documentan
en el commit pero quedan fuera del scope.

---

## 2. Reglas obligatorias

Estas reglas aplican a TODO el codigo. Cualquier archivo que se toque debe
quedar conforme antes de cerrar el cambio.

1. **Sin hardcodes.** Textos visibles, claves de almacenamiento, URLs de API,
   codigos de error y numeros magicos viven en `i18n`, `shared/constants`,
   `shared/api/api-routes.ts`, `entities` o el archivo `*.constants.ts` de la
   feature. Nunca embebidos directamente en JSX o logica.

2. **Single Responsibility por archivo.** Cada archivo cumple una sola
   responsabilidad. Si crece o mezcla preocupaciones, dividir en padre/hijo.
   Aplica especialmente a los hooks: **un hook solo gestiona estado React**.
   Cualquier logica de dominio (validacion, transformacion de datos, llamadas
   a la API) debe vivir en funciones puras dentro de `model/` o en el
   repositorio de la entidad, e invocarse desde el hook, nunca implementarse
   dentro de el.

3. **Atributos HTML via constantes.** Usar `buttonType`, `inputType`,
   `ariaRole`, `ariaBoolean`, `ariaLive`, `autoCompleteToken`, `iconSize`,
   `statusMessageVariant` en vez de literales como `type="button"`,
   `role="alert"`, `size={16}`, `variant="error"`.

4. **Revisar `shared/` antes de crear algo nuevo.** Antes de implementar
   un componente, hook o utilidad, consultar `src/shared/ui`,
   `src/shared/hooks`, `src/shared/api` y `src/shared/lib` para no duplicar lo
   que ya existe.

5. **Widgets vs Shared.** Bloques visuales especificos de un dominio viven
   en `src/widgets/<area>/<bloque>/ui`. Si un widget se vuelve reutilizable
   entre dominios, se mueve a `src/shared/ui/<componente>`.

6. **Features encarpetadas.** Cada feature en `src/features/<dominio>/<feature>`
   agrupa sus partes en subcarpetas y expone su API publica via `index.ts`.

7. **Hooks de feature en `hooks/`.** Si un hook se usa en mas de una
   feature, se promueve a `src/shared/hooks`.

8. **Estilos colocados junto al consumidor.** Cada `*.styles.ts` vive al
   lado del componente que lo usa. Dentro de `features/.../ui/`, cada
   componente y sus estilos viven en su propia subcarpeta
   (`ui/<nombre>/<nombre>.tsx` + `ui/<nombre>/<nombre>.styles.ts`),
   igual que el patron de `widgets/` y `shared/ui/`.

9. **Padre/Hijo para archivos grandes.** Separar logica (hook/model) de
   presentacion (ui), o componer un padre con hijos pequenos cuando un
   archivo crezca demasiado.

10. **Comentarios solo donde aporten.** Explicar el "por que" en funciones
    complejas o invariantes no obvios. **No usar docstrings JSDoc multi-linea**
    que describan parametros, proposito o retorno. Solo comentarios cortos
    donde el POR QUE no es obvio.

11. **Nunca usar emojis** en codigo, comentarios, textos UI ni commits.
    Usar iconos vectoriales de `lucide-react` cuando se requiera un elemento
    grafico inline.

12. **Siempre kebab-case en nombres de archivos.** Los identificadores JS
    siguen siendo `camelCase`/`PascalCase`.

13. **El frontend nunca hace `fetch` directo.** Toda llamada de red pasa por
    `httpRequest` (en `shared/api/http-client.ts`) invocado desde un repositorio
    de entidad. Las features y los hooks llaman al repositorio, no a `fetch`.

---

## 3. Estructura de carpetas

El repositorio es un **monorepo**:

```text
Admin-Project-3/
  backend/      # Django REST Framework (API REST + JWT)
  frontend/     # Next.js + TypeScript + Tailwind (este documento)
  docs/         # Documentacion compartida (deployment, jira, etc.)
```

Dentro de `frontend/` la estructura sigue el modelo feature-sliced (todas las
rutas `src/...` son relativas a `frontend/`):

```text
src/
  app/                        # Capa Next.js (App Router)
    layout.tsx
    page.tsx
    globals.css
    providers/                # Context providers (I18nProvider, etc.)
    routes/routes.ts          # Catalogo de rutas internas — NUNCA hardcodear paths
    styles/                   # Estilos de pagina (<nombre>-page.styles.ts)
    ui/                       # Pantallas orquestadoras (<nombre>-page.tsx)
    <segmento>/page.tsx       # Rutas de Next.js

  widgets/                    # Bloques visuales por area
    <area>/
      <bloque>/
        ui/
          <bloque>.tsx
          <bloque>.styles.ts
        index.ts

  features/                   # Casos de uso por dominio
    <dominio>/<feature>/
      api/                    # (opcional) wrappers de la feature sobre el repo
      hooks/                  # use-<nombre>.ts
      model/
        <feature>.types.ts
        <feature>.constants.ts
        <feature>.validators.ts
        <feature>-submit.ts
        <feature>-load.ts
        <feature>.formatters.ts
      ui/
        <nombre>/             # Una subcarpeta por componente
          <nombre>.tsx
          <nombre>.styles.ts
      lib/
      index.ts                # API publica

  entities/                   # Entidades de negocio
    <entidad>/model/
      <entidad>.types.ts
      <entidad>.repository.ts # Llama a la API (mapea DTO snake_case <-> dominio)

  shared/                     # Reuso sin conocimiento de dominio
    api/
      http-client.ts          # fetch tipado con JWT (cliente base) + HttpError
      api-routes.ts           # Catalogo de endpoints del backend
    constants/
      app.constants.ts
      html-attributes.constants.ts
      autocomplete.constants.ts
      icon-sizes.constants.ts
      storage-keys.constants.ts
    hooks/
      use-session.ts
    lib/
      crypto/
      forms/
        form-field-aria.ts
        use-field-errors.ts
      session/
        session.types.ts
        session-store.ts      # store con useSyncExternalStore (tokens JWT)
      storage/
        browser-storage.ts
    types/
    ui/
      <componente>/
        ui/
          <componente>.tsx
          <componente>.styles.ts
          <componente>.constants.ts  # cuando aplique

  i18n/
    config.ts
    translations.ts
    types.ts
    locales/
      en/<area>.ts
      es/<area>.ts
```

---

## 4. Convenciones de naming

### Archivos

| Tipo | Patron | Ejemplo |
|---|---|---|
| Hook | `use-<nombre>.ts` | `use-login-form.ts` |
| Componente UI | `<nombre>.tsx` | `login-form.tsx` |
| Estilos | `<nombre>.styles.ts` | `login-form.styles.ts` |
| Tipos de feature | `<feature>.types.ts` | `login.types.ts` |
| Constantes de feature | `<feature>.constants.ts` | `login.constants.ts` |
| Validators | `<feature>.validators.ts` | `login.validators.ts` |
| Formatters | `<feature>.formatters.ts` | `login.formatters.ts` |
| Submit use case | `<feature>-submit.ts` | `login-submit.ts` |
| Load use case | `<feature>-load.ts` | `verify-email-load.ts` |
| Repositorio | `<entidad>.repository.ts` | `animal.repository.ts` |
| Pagina Next | `page.tsx` dentro de `app/<segmento>/` | `app/animales/page.tsx` |
| Pantalla orquestadora | `<nombre>-page.tsx` en `app/ui/` | `app/ui/animals-page.tsx` |
| Estilos de pagina | `<nombre>-page.styles.ts` en `app/styles/` | `app/styles/animals-page.styles.ts` |

### Identificadores

- **Hooks:** `use<NombreCamelCase>` → `useLoginForm`, `useSession`
- **Funciones de dominio:** verbos en camelCase → `submitLogin`, `fetchAnimals`
- **Constantes objeto:** UPPER_SNAKE en claves, lowerCamelCase en el identificador → `submitOutcome.SUCCESS`, `iconSize.MD`
- **Tipos / Interfaces:** PascalCase → `LoginFormValues`, `SessionData`, `Animal`
- **Componentes React:** PascalCase exportado por funcion nombrada

---

## 5. Patrones arquitectonicos clave

### 5.1 Hook orquestador + caso de uso con Result tipado

El hook **solo gestiona state de React**. La logica de dominio viaja en una
funcion pura asincrona que llama al repositorio y retorna un Result discriminado
por `kind`.

```ts
// model/<feature>.constants.ts
export const submitOutcome = {
  SUCCESS: 'success',
  KNOWN_ERROR: 'knownError',
  UNKNOWN_ERROR: 'unknownError',
} as const;

// model/<feature>-submit.ts
export type SubmitResult =
  | { kind: typeof submitOutcome.SUCCESS; state: SuccessState }
  | { kind: typeof submitOutcome.KNOWN_ERROR }
  | { kind: typeof submitOutcome.UNKNOWN_ERROR };

export async function submitFeature(
  values: FormValues,
): Promise<SubmitResult> {
  try {
    const result = await createSomething({ ... }); // repositorio de entidad
    return { kind: submitOutcome.SUCCESS, state: { ... } };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_BAD_REQUEST) {
      return { kind: submitOutcome.KNOWN_ERROR };
    }
    return { kind: submitOutcome.UNKNOWN_ERROR };
  }
}

// hooks/use-<feature>-form.ts — orquestador delgado
export function useFeatureForm(options: Options): Result {
  // state + handleChange
  // applySubmitResult con switch(result.kind)
  // handleSubmit llama submitFeature y delega a applySubmitResult
}
```

El mismo patron aplica para `*-load.ts` (carga + validacion al montar).

### 5.2 State compartido con `useSyncExternalStore`

Para datos globales (sesion/JWT, preferencias). El store notifica listeners en
cada escritura. El hook se suscribe via `useSyncExternalStore`. Referencia:
`shared/lib/session/session-store.ts` + `shared/hooks/use-session.ts`. No
introducir librerias externas de state hasta que sea estrictamente necesario.

### 5.3 i18n via Context

- `useI18n()` devuelve `{ language, setLanguage, t }`.
- Hidratacion post-mount via `useEffect`: el server renderiza con
  `defaultLanguage` (`es`) para evitar mismatch SSR, el cliente lee
  `localStorage` y actualiza.
- Templates con placeholders: `.replace('{x}', value)` desde el componente
  que los renderiza.

### 5.4 Capa de API (backend real Django REST)

- El cliente base es `src/shared/api/http-client.ts`:
  `httpRequest<T>(path, options)` con fetch tipado, base URL desde
  `NEXT_PUBLIC_API_URL`, header `Authorization: Bearer <accessToken>` tomado del
  store de sesion, y manejo de errores via `HttpError` (status + payload).
- Las rutas del backend viven centralizadas en `src/shared/api/api-routes.ts`
  (objeto `apiRoute`). **Nunca hardcodear paths de API** en repositorios o
  features.
- Los **repositorios** de entidad (`entities/<entidad>/model/*.repository.ts`)
  son la unica capa que llama a `httpRequest`. Ahi se mapea el DTO del backend
  (snake_case de DRF) al tipo de dominio (camelCase) y viceversa. Las features
  nunca llaman `fetch` directo; usan el repositorio.
- Los casos de uso (`model/<feature>-submit.ts` / `-load.ts`) llaman al
  repositorio y traducen exitos/errores a un Result tipado por `kind`,
  mapeando `HttpError.status` y el payload de validacion de DRF a codigos de
  error de i18n.
- Para pruebas/Storybook se puede stubear el repositorio; no se mantiene un
  mock-as-database en `localStorage`. Referencia:
  `entities/animal/model/animal.repository.ts`.

### 5.5 Acceso a `localStorage`

**Siempre** via la abstraccion `shared/lib/storage/browser-storage.ts`
(`readStorage`, `writeStorage`, `removeStorage`). Cubre SSR (`typeof window`)
y `try/catch` para entornos sin storage. Nunca `window.localStorage`
directamente. Claves centralizadas en `shared/constants/storage-keys.constants.ts`.
`localStorage` guarda **solo** sesion (tokens JWT) y preferencias (idioma);
los datos de dominio van siempre a la API.

### 5.6 Timestamps de expiracion

Helper unico `isExpiredAt(expiresAt: string)`. No duplicar la logica
`Date.parse + Date.now` en cada entidad.

### 5.7 Formularios y errores

- **`use-field-errors.ts`:** hook compartido, devuelve
  `{ errors, setErrors, clearFieldError }`.
- **`form-field-aria.ts`:** `buildFieldHintId`, `buildFieldErrorId`,
  `buildFieldDescribedBy(fieldId, hasError)`.
- **Nombres de campo:** exportados tipados como `Record<Field, Field>`.
- **Validators:** funciones puras que reciben `values` + `messages` y
  devuelven `Errors`. Colectar todos los problemas en una pasada.
- **Errores del backend:** mapear el payload de validacion de DRF (objeto
  `{ campo: [mensajes] }`) a `Errors` dentro del caso de uso, traduciendo a
  claves de i18n. El repositorio devuelve el `HttpError` crudo.

### 5.8 Procesamiento de archivos (File → base64, validaciones)

Nunca implementar `FileReader` ni validaciones de tipo/tamano dentro de
un hook. Extraer a una funcion pura en `model/<dominio>-upload.ts` que
retorne un Result tipado con `kind`.

```ts
// model/logo-upload.ts
export const uploadOutcome = {
  SUCCESS: 'success',
  INVALID_TYPE: 'invalidType',
  FILE_TOO_LARGE: 'fileTooLarge',
} as const;

export type UploadResult =
  | { kind: typeof uploadOutcome.SUCCESS; base64: string; fileName: string }
  | { kind: typeof uploadOutcome.INVALID_TYPE }
  | { kind: typeof uploadOutcome.FILE_TOO_LARGE };

export function processFile(file: File): Promise<UploadResult> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return Promise.resolve({ kind: uploadOutcome.INVALID_TYPE });
  }
  if (file.size > MAX_BYTES) {
    return Promise.resolve({ kind: uploadOutcome.FILE_TOO_LARGE });
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({
        kind: uploadOutcome.SUCCESS,
        base64: e.target?.result as string,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  });
}
```

---

## 6. Componentes y helpers shared

### Componentes UI (`shared/ui/<componente>/ui/`)

| Componente | Estado | Resumen |
|---|---|---|
| `Button` | listo | Boton basico, `type` por defecto `'button'`, variantes `primary`/`secondary`. |
| `Container` | listo | Wrapper con `max-w-5xl mx-auto px-...`. |
| `FormField` | por crear | Label + slot para input + hint + error. Recibe `htmlFor`, `label`, `error`, `hint`, `required`. |
| `Input` | por crear | `<input>` con `forwardRef`. |
| `PasswordInput` | por crear | Input con toggle mostrar/ocultar + iconos. |
| `Modal` | por crear | Dialog accesible (focus trap, escape, backdrop click). |
| `SectionHeading` | por crear | Titulo + descripcion centrados. |
| `StatusMessage` | por crear | Bloque info/success/error. Usar con `statusMessageVariant.INFO/SUCCESS/ERROR`. |

> Al crear un componente nuevo, registralo aqui y marca su estado.

### Constantes shared (`shared/constants/`)

| Archivo | Exporta |
|---|---|
| `app.constants.ts` | `appInfo` (`NAME`, `DESCRIPTION`) |
| `html-attributes.constants.ts` | `buttonType`, `inputType`, `ariaRole`, `ariaBoolean`, `ariaLive` |
| `autocomplete.constants.ts` | `autoCompleteToken` (`OFF`, `NAME`, `EMAIL`, `ORGANIZATION`) |
| `icon-sizes.constants.ts` | `iconSize` (`XS=14`, `SM=16`, `MD=18`, `LG=20`, `XL=24`, `XXL=28`) |
| `storage-keys.constants.ts` | Todas las claves de `localStorage` del proyecto |

### API shared (`shared/api/`)

| Archivo | Exporta |
|---|---|
| `http-client.ts` | `httpRequest<T>`, `httpMethod`, `HttpError`, `RequestOptions` |
| `api-routes.ts` | `apiRoute` (catalogo de endpoints del backend) |

---

## 7. Ruteo en Next.js (App Router)

- Catalogo de rutas internas en `src/app/routes/routes.ts`. **Nunca** hardcodear
  paths en componentes. (Los endpoints del backend van aparte, en
  `shared/api/api-routes.ts`.)
- Cada `page.tsx` se mantiene minimo: importa la pantalla y la renderiza.
- **Si la pantalla usa `useSearchParams()`, envolverla en `<Suspense>`:**

```tsx
// app/<segmento>/page.tsx
import { Suspense } from 'react';
import { FeaturePage } from '@/app/ui/feature-page';

export default function Page() {
  return (
    <Suspense>
      <FeaturePage />
    </Suspense>
  );
}
```

---

## 8. i18n — como agregar textos

1. Agregar el tipo del catalogo a `src/i18n/types.ts`.
2. Agregar las strings en `src/i18n/locales/es/<area>.ts` (catalogo fuente, sin
   `as const` para que el tipo se derive con valores `string`) y replicar la
   misma forma en `en/<area>.ts` (tipado con el tipo derivado del catalogo `es`).
3. Si es area nueva, registrar el catalogo en `translations.ts` y extender
   `AppTranslations`.
4. Consumir desde el componente con `useI18n().t.<area>.<key>`.

**Convenciones de keys:**

| Tipo | Patron | Ejemplo |
|---|---|---|
| Validaciones | `messages.validation.<regla>` | `messages.validation.nameRequired` |
| Errores del backend | `messages.<codigoEnCamelCase>` | `messages.identifierAlreadyExists` |
| Templates con placeholder | `<key>Template` con `{placeholder}` | `welcomeTemplate` |
| Labels de campos | `form.fields.<field>.label/hint/placeholder` | `form.fields.name.label` |
| Acciones | `submitButton.idle/loading` | `submitButton.idle` |

---

## 9. Convenciones de commits

### Formato obligatorio — Conventional Commits

```
<type>(<scope>): <short description>
```

- **`type`** — uno de los valores de la tabla de abajo.
- **`scope`** — clave del issue de Jira entre parentesis cuando el commit
  pertenece a un issue concreto (`PGAT-22`, `PGAT-29`). Se omite en cambios
  transversales. La clave conecta el commit con Jira (app *GitHub for Jira*) y
  habilita Smart Commits. Mismo criterio para nombres de rama:
  `feature/PGAT-22-registro-animales`.
- **`short description`** — imperativo, minuscula, sin punto final, **en ingles**.

El cuerpo (opcional) lista los cambios principales con guiones, tambien
en ingles.

### Tipos permitidos

| Tipo | Cuando usarlo |
|---|---|
| `feat` | Nueva funcionalidad visible para el usuario o el sistema |
| `fix` | Correccion de bug o incumplimiento de reglas (hardcodes, SRP, etc.) |
| `refactor` | Cambio de estructura sin alterar comportamiento (mover archivos, renombrar, extraer logica) |
| `docs` | Solo cambios en archivos de documentacion |
| `chore` | Cambios de configuracion, dependencias o archivos de soporte |

### Ejemplos

```
feat(PGAT-22): add individual animal registration

- add animal form with category validation
- add animals list with category filter
- wire animal repository to the DRF endpoint
```

```
fix(PGAT-29): replace hardcoded HTML attribute literals with constants
```

```
refactor(PGAT-37): extract location logic into model/location-submit.ts
```

```
docs: document monorepo backend integration in the skill
```

Smart Commit opcional (transiciona/comenta el issue en Jira):

```
feat(PGAT-22): add animal registration form

PGAT-22 #comment registration form complete #time 3h #in-review
```

### Reglas adicionales

- Mensajes **siempre en ingles**.
- **Sin emojis**, ni en el titulo ni en el cuerpo.
- **NO incluir** `Co-Authored-By` ni ningun atributo de herramienta. Los
  commits deben salir unicamente a nombre del autor humano.
- No usar `git push --force` ni `--no-verify` (salvo peticion explicita).
- Errores de lint pre-existentes en archivos ajenos: mencionarlos en el
  cuerpo del commit, no arreglarlos en el mismo commit.

---

## 10. Como abordar una User Story / issue de Jira nuevo

1. **Leer el issue (PGAT-XX)** — pantallas, criterios de aceptacion,
   validaciones, mensajes de error, tiempos. Anotar todo lo que necesita i18n.
2. **Backend primero (si aplica)** — confirmar/crear el endpoint en `backend/`
   (modelo + serializer + viewset + ruta) y registrar su path en
   `shared/api/api-routes.ts`. Ver §14.
3. **Rutas y storage** — agregar entradas a `app/routes/routes.ts` y, si hace
   falta, a `shared/constants/storage-keys.constants.ts`.
4. **i18n** — extender `src/i18n/types.ts` con los nuevos tipos y completar
   ambos catalogos (`es/` fuente y `en/`). Si es area nueva, registrar en
   `translations.ts`.
5. **Entidad y repositorio** — crear/extender `entities/<entidad>/model/` con
   `*.types.ts` (dominio camelCase) y `*.repository.ts` (llama a `httpRequest`,
   mapea DTO snake_case <-> dominio).
6. **Feature** — crear `src/features/<dominio>/<feature>` con:
   - `model/<feature>.types.ts`
   - `model/<feature>.constants.ts` (field names + outcome objects)
   - `model/<feature>.validators.ts`
   - `model/<feature>-submit.ts` o `-load.ts` con Result tipado
   - `hooks/use-<feature>-form.ts` orquestador delgado
   - `ui/<nombre>/<nombre>.tsx` + `ui/<nombre>/<nombre>.styles.ts`
     (una subcarpeta por componente)
   - `index.ts` que exporta lo publico
7. **Widgets** — crear `src/widgets/<dominio>/<bloque>/ui/...` para los bloques
   visuales que el flujo requiera.
8. **App pages** — crear:
   - `src/app/<segmento>/page.tsx` (con `<Suspense>` si usa `useSearchParams`)
   - `src/app/ui/<feature>-page.tsx` (orquesta widgets y features)
   - `src/app/styles/<feature>-page.styles.ts`
9. **Validar** — `npm run typecheck` y `npm run lint`.
10. **Commit** — Conventional Commits, en ingles, scope `PGAT-XX`, sin co-autoria.

---

## 11. Referencia de features implementadas por dominio

Antes de empezar un issue nuevo, localiza el dominio mas cercano en esta tabla
y toma sus archivos como plantilla. Al terminar el primer issue de un dominio
nuevo, registra aqui su entrada siguiendo el mismo formato.

| Dominio | Feature | Rutas | Archivos clave |
|---|---|---|---|
| animal | _(entidad scaffolded como referencia)_ | `/animales` | `entities/animal/model/animal.types.ts`, `entities/animal/model/animal.repository.ts` |

**API y repositorios por dominio:**
- `entities/<entidad>/model/<entidad>.repository.ts` — unica capa que llama a
  `httpRequest`. Referencia: `entities/animal/model/animal.repository.ts`.
- Endpoints centralizados en `shared/api/api-routes.ts`.

---

## 12. Checklist al crear o tocar un archivo

- [ ] No hay strings/numeros magicos ni paths de API en JSX o logica.
- [ ] El archivo cumple una sola responsabilidad. Si crece, dividir.
- [ ] Se consulto `shared/ui`, `shared/hooks`, `shared/api` y `shared/lib` antes de crear algo.
- [ ] Se usan `buttonType`, `inputType`, `ariaRole`, `ariaBoolean`,
      `autoCompleteToken`, `iconSize`, `statusMessageVariant` en vez de literales.
- [ ] Los estilos viven en su propia subcarpeta junto al componente.
- [ ] Si un hook se usa en mas de una feature, vive en `shared/hooks`.
- [ ] No hay docstrings JSDoc multi-linea. Solo comentarios cortos donde el
      por que no es obvio.
- [ ] No hay emojis en codigo, UI, comentarios ni commits.
- [ ] Si la pantalla usa `useSearchParams`, el `page.tsx` la envuelve en
      `<Suspense>`.
- [ ] Las llamadas de red pasan por `httpRequest` desde un repositorio; ninguna
      feature hace `fetch` directo.
- [ ] `localStorage` pasa por `browser-storage.ts` (solo tokens/preferencias),
      nunca por `window.localStorage` directo ni como base de datos de dominio.
- [ ] Tokens de seguridad usan `crypto.randomUUID()`, no `Math.random`.
- [ ] `npm run typecheck` y `npm run lint` pasan limpios en los archivos tocados.
- [ ] El hook **solo** gestiona estado React. Logica de dominio esta en `model/`
      o en el repositorio.

---

## 13. Gotchas conocidos

- **Next.js 16 + Turbopack por defecto.** `next dev` y `next build` usan
  Turbopack. `next lint` fue removido: el script `lint` invoca `eslint`
  directamente. Ante dudas de API, leer `frontend/node_modules/next/dist/docs/`.
- **`useSearchParams` exige `<Suspense>`** en Next.js 16 App Router. Sin el
  wrapper el build SSG falla.
- **`react-hooks/set-state-in-effect`** es aceptable para hidratacion desde
  `localStorage`; agregar `eslint-disable-next-line` con comentario que
  justifique el por que (ver `i18n-provider.tsx`). Para datos compartidos
  preferir `useSyncExternalStore`.
- **Hydration mismatches:** el server renderiza con valores por defecto. Valores
  que cambian entre server y client deben hidratarse en `useEffect`, no en un
  lazy initializer.
- **`useFieldErrors<T>`** requiere `T extends Record<string, string | undefined>`.
- **Catalogos i18n:** el catalogo fuente (`es`) NO lleva `as const` para que el
  tipo derivado tenga valores `string`; las demas locales se tipan con ese tipo.
- **`FileReader` y APIs de procesamiento de archivos:** siempre en `model/`,
  nunca dentro del hook.

---

## 14. Integracion con el backend (Django REST Framework)

El frontend consume una API REST servida por `backend/` (Django + DRF +
`djangorestframework-simplejwt`). Contrato actual:

| Metodo | Endpoint | Uso |
|---|---|---|
| POST | `/api/token/` | Login: obtiene `access` + `refresh` |
| POST | `/api/token/refresh/` | Renueva el `access` token |
| GET/POST | `/api/animals/` | Listar / crear animales (`?category=`, `?search=`) |
| GET/PUT/DELETE | `/api/animals/{id}/` | Detalle / editar / eliminar |
| GET/POST | `/api/health/` | Eventos de salud (`?animal={id}`) |
| GET/POST | `/api/feeding/` | Registros de alimentacion (`?animal={id}`) |
| GET/POST | `/api/location/farms/` | Fincas |
| GET/POST | `/api/location/assignments/` | Ubicaciones (`?animal=`, `?farm=`) |

**Reglas de integracion:**

- Mapear siempre snake_case (DRF) a camelCase (dominio) en el repositorio.
  Ejemplo: `category_display` → `categoryDisplay`, `birth_date` → `birthDate`.
- DRF pagina las listas: la respuesta de un `GET` de lista es
  `{ count, next, previous, results }`. El repositorio devuelve `results`
  mapeado al tipo de dominio.
- Autenticacion JWT: tras un login exitoso, guardar tokens con `setSession`
  (`shared/lib/session/session-store.ts`). `httpRequest` adjunta el `access`
  automaticamente. Un `401` debe disparar refresh o `clearSession`.
- Errores de validacion: DRF responde `400` con `{ campo: [mensajes] }`. El
  caso de uso traduce ese payload a claves de i18n; el repositorio solo lanza
  `HttpError`.
- La base URL viene de `NEXT_PUBLIC_API_URL`. En desarrollo, el backend corre en
  `http://localhost:8000` y el frontend en `http://localhost:3000`
  (CORS habilitado en `backend/finca/settings.py`).

---

## 15. Jira y CI/CD

- El repositorio de GitHub esta conectado a Jira mediante la app **GitHub for
  Jira**. La asociacion es **por convencion**: incluir la clave del issue
  (`PGAT-XX`) en el nombre de la rama, en los commits y/o en el titulo/cuerpo
  del PR hace que Jira muestre automaticamente commits, ramas, PRs y el estado
  de los **GitHub Actions checks** (builds) en el panel de desarrollo del issue.
  No requiere secrets.
- **Smart Commits** (`PGAT-22 #comment ... #time 2h #in-review`) permiten
  comentar, registrar tiempo y transicionar issues desde el commit.
- El detalle de la configuracion y la opcion avanzada (transiciones automaticas
  via `atlassian/gajira-*`, que si requiere secrets) esta en
  `docs/jira-integration.md`.
- El pipeline (`.github/workflows/ci.yml`) corre en cada push/PR: job de backend
  (migrate + tests) y job de frontend (`typecheck` + `lint` + `build`).
