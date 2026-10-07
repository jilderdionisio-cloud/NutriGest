# Pantallas y campos provisionales

Los nombres existentes proceden de `docs/contrato-api.md`; su aprobación para Sprint 1 y cotejo con Diana están **Pendientes**. La definición local está en `frontend/src/data/patients.js`. No se agregaron campos de paciente.

| Campo | Tipo visible | Uso | Validación visual provisional |
| --- | --- | --- | --- |
| first_name | Texto | Alta, edición, lista y expediente | Obligatorio, no solo espacios, máximo 100 |
| last_name | Texto | Alta, edición, lista y expediente | Obligatorio, no solo espacios, máximo 100 |
| birth_date | Fecha | Alta, edición y expediente | Opcional; vacío se representa como null |
| email | Correo | Alta, edición, lista y expediente | Opcional; formato nativo del navegador |
| phone | Teléfono | Alta, edición, lista y expediente | Opcional; máximo 30 |
| notes | Texto multilínea | Alta, edición y expediente | Opcional |
| id | Número | Identificar registro local y navegación | Generado; no editable |
| created_at, updated_at | Fecha ISO | Metadatos del mock | Generados; no editables ni mostrados |

Login conserva nombres username/password de la base; requiere valores no vacíos. No verifica identidad. No introducir credenciales reales.

La búsqueda local ignora mayúsculas y acentos y consulta todos los campos editables. Es comportamiento de demostración, no especificación de búsqueda del servidor. Teléfonos se dejan vacíos para evitar números reales y los correos usan example.com.

Alergias y restricciones: **Pendiente**, sin campo ni validación hasta recibir definición. No se reemplazan por notes.

## Accesibilidad

Etiquetas asociadas mediante envoltura de controles, obligatoriedad indicada, enlaces con propósito identificable, estados con role=status/alert, formulario con aria-busy, foco visible, enlace para saltar al contenido y foco en contenido al navegar. Formularios y expediente se adaptan a una columna en pantalla estrecha. La validación visual no sustituye la del servidor.

## Comprobación manual

Recorrer login → lista → búsqueda → alta → expediente → edición → cancelar/guardar → salir. Revisar tabulación, campos obligatorios, correo inválido, errores simulados conservando formulario, lista vacía, búsqueda sin resultados, expediente inexistente y ancho móvil. Revisión visual en navegador: **Pendiente** hasta completar la comprobación.
