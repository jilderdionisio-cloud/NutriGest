# Contexto permanente de GestNutri

## Propósito y alcance

GestNutri es una aplicación web para profesionales de nutrición. El MVP debe permitir a un usuario autorizado iniciar sesión, administrar pacientes, registrar consultas y mediciones, consultar historial y evolución, guardar notas y, de forma opcional, formalizar notas con IA bajo revisión humana. React consume una API REST de Django/Django REST Framework y PostgreSQL conserva los datos.

El alcance del MVP incluye autenticación; lista, búsqueda, alta y edición de pacientes; expediente; contacto y acceso rápido a WhatsApp; consultas; mediciones; historial; comparación de evolución; notas, alergias, preferencias y restricciones; documentos esenciales; resumen de seguimiento y formalización opcional de notas con IA. No incluye catálogo o comparador de productos, reconocimiento de etiquetas por fotografía, recomendaciones comerciales, alianzas o patrocinios, ni funciones no necesarias para validar el flujo principal.

La fecha límite del plan es el 10 de octubre de 2026. Si hay presión de tiempo, se protege primero autenticación, pacientes, consultas, mediciones, historial, comparación de evolución, integración React-Django, persistencia y pruebas críticas.

## Responsabilidades compartidas y técnicas

Todo el Scrum Team es responsable del Increment. Las especialidades indican liderazgo técnico, no exclusividad.

- Jilder Alex Dionisio Rojas: frontend con React, interfaz e integración con la API.
- Genny D. Navarrete Aguilar: backend con Django y Django REST Framework, endpoints, permisos y lógica de negocio.
- Diana Gpe. Bojorquez Cetina: PostgreSQL, modelos, migraciones y consistencia de datos.
- Luisa Fernanda Ortiz Baeza: pruebas, GitHub Actions, calidad y apoyo técnico al Agente Orquestador.

Product Owner y Scrum Master: pendiente de definición o rotación por el equipo antes del Sprint 1.

## Documentación y decisiones

- Consultar `docs/requisitos/GestNutri_Plan_Gestion.pdf` antes de definir, cambiar o revisar requisitos, arquitectura, datos, seguridad o criterios de aceptación.
- Usar `docs/decisiones.md` para decisiones confirmadas y `docs/estado-proyecto.md` para resultados comprobados de revisiones. Lo no verificado se marca como **Pendiente**.
- Toda modificación de arquitectura, contratos de API, datos o seguridad se documenta y comunica antes de integrarse.
- Una nueva necesidad se registra como historia o Issue y el Product Owner la ordena; no se convierte una sugerencia en requisito sin esa decisión.

## Desarrollo, ramas y Pull Requests

- `main` contiene la versión estable; `develop` es la rama de integración; el trabajo de historias usa `feature/HU-XX-descripcion`. También pueden usarse ramas `fix/` y `docs/`.
- Antes de desarrollar, sincronizar con `develop`, revisar cambios recientes e identificar dependencias y contratos compartidos.
- Cada historia debe contar con criterios de aceptación, dependencias identificadas y datos de prueba antes de entrar al Sprint.
- Publicar cambios mediante Pull Request hacia `develop`. La integración requiere CI exitoso, revisión humana y correcciones de observaciones; CI no sustituye la revisión humana.
- No intercambiar carpetas completas para integrar el sistema: GitHub es la fuente oficial del código y del estado compartido.
- Los mensajes de commit son obligatoriamente en español, descriptivos y con prefijo convencional cuando corresponda: `feat:`, `fix:`, `test:`, `docs:`, `refactor:` o `chore:`.

## Calidad, integración y Definition of Done

- El autor comprende y valida cualquier propuesta asistida por IA, respeta el alcance de la historia, ejecuta pruebas y evita cambios fuera de alcance.
- Una historia está terminada solo si cumple criterios de aceptación, pruebas y CI, no contiene secretos, aporta migraciones o documentación necesarias y recibe revisión humana por Pull Request.
- Revisar contratos React-Django de forma explícita: nombres de campos, tipos, validaciones, autenticación, permisos, errores y efectos de migraciones. Los cálculos de evolución deben ser determinísticos y verificables.
- Mantener pruebas unitarias, de API/backend, frontend e integración según el cambio. En HU-09, cubrir aumento, disminución, igualdad, ausencia de consulta previa y datos nulos o inválidos.

## Datos, seguridad e IA

- Usar únicamente datos ficticios o anonimizados en desarrollo y en prompts externos. Nunca compartir datos reales de pacientes, contraseñas, tokens, claves ni secretos.
- Gestionar secretos mediante variables de entorno y mecanismos seguros del framework; nunca almacenarlos en Git.
- Django concentra autenticación, autorización, validaciones y lógica de negocio. Las credenciales de IA no se exponen en el navegador: las llamadas del producto se realizan desde el backend.
- La IA de notas es opcional, debe proponer sin inventar hechos y siempre requiere revisión humana. Si el servicio falla, las notas manuales deben seguir funcionando.

## Agente Orquestador

El orquestador mantiene contexto global, relaciona ramas, Pull Requests, contratos, migraciones, pruebas, Issues y decisiones; identifica dependencias e inconsistencias semánticas y formula recomendaciones. No sustituye GitHub, Scrum, CI ni la revisión humana. No aprueba su propio trabajo, no fusiona ramas, no elimina cambios ajenos y no convierte propuestas en requisitos.
