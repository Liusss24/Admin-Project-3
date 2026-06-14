# Integración Jira ↔ GitHub ↔ CI/CD

Este documento explica cómo está conectado el repositorio con Jira y cómo el
pipeline de CI se refleja en los issues.

## 1. Cómo funciona la conexión (vía convención, sin secrets)

El repositorio de GitHub está vinculado a Jira Cloud mediante la app oficial
**GitHub for Jira** (Atlassian). Una vez instalada y autorizada sobre la
organización/repositorio, la asociación entre el trabajo de GitHub y los issues
de Jira es **automática y por convención**: basta con que la **clave del issue**
(`PGAT-22`, `PGAT-29`, …) aparezca en alguno de estos lugares:

- El **nombre de la rama** — ej. `feature/PGAT-22-registro-animales`
- El **mensaje de commit** — ej. `feat(PGAT-22): add animal registration`
- El **título o cuerpo del Pull Request**

Cuando la clave está presente, Jira muestra en el panel de desarrollo del issue:

| Sección en Jira | Qué aparece |
|---|---|
| Commits | Los commits que referencian la clave |
| Branches | Las ramas cuyo nombre contiene la clave |
| Pull requests | Los PRs que referencian la clave |
| Builds | El estado de los **GitHub Actions checks** (CI) del commit/PR |
| Deployments | Los GitHub Deployments (si se configuran) |

> No se necesitan secrets ni pasos extra en el workflow para que los **builds**
> de GitHub Actions aparezcan como tales en Jira: la app GitHub for Jira lee los
> check runs del commit asociado a la clave.

## 2. Convención obligatoria del equipo

1. **Ramas:** `feature/PGAT-XX-descripcion-corta`, `fix/PGAT-XX-...`,
   `chore/PGAT-XX-...`.
2. **Commits (Conventional Commits):** `tipo(PGAT-XX): descripción en inglés`.
3. **Pull Requests:** incluir `PGAT-XX` en el título.

Esto satisface el requisito de "CI/CD conectado con Jira" sin configuración
adicional.

## 3. Smart Commits (opcional, sin secrets)

Con GitHub for Jira se pueden usar **Smart Commits** para actuar sobre el issue
desde el mensaje de commit. El email del autor del commit debe coincidir con un
usuario de Jira con permisos.

```
PGAT-22 #comment formulario de registro terminado
PGAT-22 #time 3h
PGAT-22 #in-review        # transición (el nombre depende del workflow de Jira)
```

## 4. Opción avanzada: transiciones automáticas desde CI (requiere secrets)

Si se quiere que el pipeline **mueva** el issue automáticamente (p. ej. a
"In Review" al abrir PR, o a "Done" al hacer merge a `main`), se puede añadir un
job con las acciones `atlassian/gajira-*`. Esto **sí** requiere configurar
secrets en GitHub:

- `JIRA_BASE_URL` — ej. `https://tu-organizacion.atlassian.net`
- `JIRA_USER_EMAIL` — email de la cuenta de servicio de Jira
- `JIRA_API_TOKEN` — token de API generado en `id.atlassian.com`

Ejemplo de job (añadir a `.github/workflows/`):

```yaml
jira-transition:
  name: Jira transition on merge
  runs-on: ubuntu-latest
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  steps:
    - uses: actions/checkout@v4
    - name: Login to Jira
      uses: atlassian/gajira-login@v3
      env:
        JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
        JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
        JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
    - name: Find issue key in commit
      id: jira
      uses: atlassian/gajira-find-issue-key@v3
      with:
        from: commits
    - name: Transition issue to Done
      uses: atlassian/gajira-transition@v3
      with:
        issue: ${{ steps.jira.outputs.issue }}
        transition: "Done"
```

> Recomendación: empezar solo con la convención (sección 2). Añadir el job de
> `gajira` únicamente si el equipo necesita transiciones automáticas, ya que
> implica mantener credenciales de Jira como secrets.
