# Flujo simulado de Sprint 1

Rama: `feature/HU-02-patient-frontend`. Alcance: HU-01 a HU-04, únicamente frontend y documentación UI. Referencias: plan de gestión, Issue #4 adjunto y `docs/contrato-api.md` existente. No se considera contrato aprobado de Sprint 1.

## Navegación

1. `/login`: introducir usuario y contraseña ficticios; cualquier par no vacío permite entrar.
2. `/patients`: buscar en los campos editables locales, abrir expediente o registrar paciente.
3. `/patients/new`: completar formulario; guardar abre expediente con confirmación; cancelar regresa al listado.
4. `/patients/:id`: consultar datos y acceder a edición.
5. `/patients/:id/edit`: el mismo formulario precargado; guardar actualiza el expediente; cancelar descarta cambios.
6. Salir elimina la sesión en memoria. Recargar reinicia sesión y registros ficticios.

Estas rutas son de navegación del navegador, no endpoints. No se realizan llamadas HTTP de datos ni se guardan tokens o contraseñas.

## Estados reproducibles

Abrir «Probar estados de la demostración» en cada pantalla. Elegir Correcto o Error; en login y formulario, enviar para observar el resultado. Lista permite Lista vacía y expediente permite No encontrado. Volver a Correcto recupera la vista. El listado tiene Reintentar.

Cada operación muestra carga durante 450 ms; guardar e iniciar sesión desactivan el envío mientras procesan. Buscar un texto inexistente muestra Sin coincidencias. Los errores de guardado conservan los valores. El expediente muestra confirmación al crear o editar.

## Adaptador y pendientes

`src/api.js` contiene un cliente local con login, list, detail y save. Componentes consumen el cliente sin URLs. `src/data/patients.js` concentra registros, metadatos de campos y nombre visible. Cada nueva instancia del cliente copia sus datos, evitando compartir mutaciones entre pruebas.

Pendiente: diccionario provisional de Diana, contratos `docs/api/AUTENTICACION_S1.md` y `docs/api/PACIENTES_S1.md`, aprobación y cotejo de campos/validaciones. Alergias y restricciones solo tienen una sección informativa pendiente; no se inventó su representación. No hay integración backend ni autenticación real. La historia aún requiere CI y revisión humana.

## Evidencia local (2026-10-06)

- `npm test --prefix frontend`: 5 pruebas pasan (adaptador y recorridos de componentes).
- `npm run build --prefix frontend`: compilación correcta.
- `npm audit --prefix frontend`: cero vulnerabilidades tras actualizar dependencia transitiva.
- Navegador local: acceso simulado y listado comprobados; captura `evidencia/lista.png`. Vista estrecha del listado revisada.
- Sin fetch, tokens persistidos ni lectura de URL de API en `frontend/src/`.
- Cambios limitados a `frontend/` y `docs/ui/`; sin integración a develop, PR o revisión humana aún.
- Revisión visual completa de alta, edición y expediente, así como CI: **Pendiente**. Los recorridos están cubiertos por pruebas de componentes, lo que no sustituye revisión visual o humana.
