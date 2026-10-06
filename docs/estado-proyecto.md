# Estado del proyecto

Este registro conserva resultados verificables de revisiones. No infiere avance desde ramas no integradas: debe indicar la rama, evidencia y si el cambio está integrado en `develop` o `main`.

## Estado actual

| Fecha de revisión | Área | Hecho comprobado | Evidencia | Integración | Estado |
| --- | --- | --- | --- | --- | --- |
| 2026-09-28 | Contexto y documentación | Existe el PDF de requisitos en `docs/requisitos/GestNutri_Plan_Gestion.pdf`. | Inspección del repositorio local | No aplica | Confirmado |
| 2026-09-28 | Base de desarrollo | Dependencias instalables mediante `backend/requirements.txt` y `frontend/package-lock.json`; `manage.py check` pasa y Vite compila. PostgreSQL local no estaba disponible para migraciones, pruebas con BD ni prueba API. | Verificación en `chore/base-desarrollo` | Rama `chore/base-desarrollo` | Confirmado / Pendiente |
| 2026-09-28 | Roles Scrum | Product Owner y Scrum Master no están asignados en el plan. | Plan de requisitos, sección 3 | No aplica | Pendiente |
| Pendiente | Integración React-Django | No hay resultado de revisión registrado. | Pendiente | Pendiente | Pendiente |
| Pendiente | Modelos y migraciones | No hay resultado de revisión registrado. | Pendiente | Pendiente | Pendiente |
| Pendiente | Pruebas y CI | No hay resultado de revisión registrado. | Pendiente | Pendiente | Pendiente |

| 2026-09-28 | Backend y API | `POST /api/auth/login/` y el listado autenticado `GET /api/patients/` funcionan con datos ficticios: el login entregó un token y el listado respondió un arreglo. La suite ejecutó migraciones y 3 pruebas, incluidas autenticación y aislamiento por nutricionista. | Ejecución local de `manage.py test` con `DJANGO_TEST_USE_SQLITE=true`; prueba HTTP temporal | `chore/base-desarrollo` | Confirmado |
| 2026-09-28 | PostgreSQL | La configuración normal del backend apunta a PostgreSQL; no había `psql`, servicio PostgreSQL ni Docker disponibles en el equipo de revisión, por lo que no se verificó allí el arranque contra PostgreSQL. SQLite está habilitado solo de forma opt-in para la suite local. | Inspección del entorno y `backend/config/settings.py` | `chore/base-desarrollo` | Pendiente |
| 2026-09-28 | Frontend | `npm ci --prefix frontend` y `npm run build --prefix frontend` completaron correctamente con dependencias fijadas en el lockfile. | Ejecución local de npm/Vite | `chore/base-desarrollo` | Confirmado |
| 2026-09-28 | Orquestador y GitHub | Se invocó el agente `orquestador`; revisó el plan, ramas y PRs con consultas de solo lectura. GitHub CLI quedó accesible por ruta explícita y las consultas evitan el proxy local defectuoso. | Revisión de prueba del orquestador; `gh auth status`, `gh pr list`, `gh pr view` | `chore/base-desarrollo` | Confirmado |
| 2026-09-28 | CI | No existe `.github/workflows` ni checks de CI reportados por GitHub. | Inspección local y `gh pr view 2` | No aplica | Pendiente |

## Plantilla de revisión

| Fecha de revisión | Área | Hecho comprobado | Evidencia | Integración (`main`, `develop`, rama o no aplica) | Estado |
| --- | --- | --- | --- | --- |
| AAAA-MM-DD |  |  |  |  | Confirmado / Pendiente |
