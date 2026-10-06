# Contrato actual de API

Este documento describe únicamente las rutas que ya existen en la base de desarrollo. No agrega requisitos ni implementa historias pendientes.

Base local: `http://localhost:8000/api`

## Autenticación

### `POST /auth/login/`

Ruta completa: `POST /api/auth/login/`. No requiere token.

Solicitud JSON:

```json
{
  "username": "nutricionista_demo",
  "password": "contrasena-local"
}
```

Respuesta exitosa (`200 OK`):

```json
{
  "token": "token-de-drf",
  "username": "nutricionista_demo"
}
```

Respuesta por credenciales inválidas (`401 Unauthorized`):

```json
{
  "detail": "Credenciales inválidas."
}
```

El frontend debe guardar el token y enviarlo en las rutas protegidas:

```http
Authorization: Token token-de-drf
```

## Pacientes

Todas las rutas de pacientes requieren autenticación. Django limita los resultados al usuario autenticado: un nutricionista no puede consultar ni actualizar pacientes de otro usuario.

### Campos serializados

| Campo | Tipo JSON | Requerido al crear | Notas |
| --- | --- | --- | --- |
| `id` | número | No | Solo lectura. |
| `first_name` | texto | Sí | Máximo 100 caracteres. |
| `last_name` | texto | Sí | Máximo 100 caracteres. |
| `birth_date` | fecha ISO `AAAA-MM-DD` o `null` | No | Puede omitirse. |
| `email` | texto | No | Debe ser correo válido si se envía. |
| `phone` | texto | No | Máximo 30 caracteres. |
| `notes` | texto | No | Notas manuales actuales. |
| `created_at` | fecha-hora ISO | No | Solo lectura. |
| `updated_at` | fecha-hora ISO | No | Solo lectura. |

### `GET /patients/`

Ruta completa: `GET /api/patients/`. Devuelve `200 OK` y un arreglo JSON de pacientes del usuario, ordenado por `last_name` y `first_name` de forma ascendente. No hay búsqueda ni paginación implementadas todavía.

### `POST /patients/`

Ruta completa: `POST /api/patients/`. Crea un paciente asociado automáticamente al usuario autenticado.

Solicitud mínima:

```json
{
  "first_name": "Ana",
  "last_name": "López"
}
```

Respuesta: `201 Created` con el paciente completo, incluidos `id`, `created_at` y `updated_at`.

### `GET /patients/:id/`

Ruta completa de ejemplo: `GET /api/patients/12/`. Devuelve `200 OK` con el paciente si pertenece al usuario autenticado; si no existe o pertenece a otra persona, devuelve `404 Not Found`.

### `PUT` o `PATCH /patients/:id/`

Ruta completa de ejemplo: `PATCH /api/patients/12/`. Actualiza únicamente un paciente propio y devuelve `200 OK` con el registro completo. `PUT` requiere una representación completa; `PATCH` permite enviar solo los campos que cambian.

Los errores de validación de DRF se devuelven con `400 Bad Request` y un objeto cuyas claves son los campos inválidos. Una ruta protegida sin token devuelve `401 Unauthorized`.

## Rutas aún inexistentes

No hay rutas API para consultas, mediciones, historial, evolución, WhatsApp, documentos, resumen ni formalización de notas con IA. Aunque existen modelos iniciales de consulta y medición, todavía no hay serializers, vistas ni URLs para exponerlos.
