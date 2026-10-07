# Instalación del frontend

Requiere Node.js compatible con las dependencias fijadas (Node 22.12 o posterior recomendado) y npm.

Desde la raíz:

```powershell
npm ci --prefix frontend
npm run dev --prefix frontend
npm test --prefix frontend
npm run build --prefix frontend
```

Abrir la URL local que informa Vite. Para la demostración basta cualquier usuario y contraseña ficticios no vacíos. No usar información real. Sesión y registros viven en memoria y se reinician al recargar.

No requiere backend, PostgreSQL ni archivo .env. `VITE_API_URL` en `.env.example` queda reservado e inactivo: esta versión no lee esa variable. No introducir secretos en variables VITE_. Su activación y URL se definirán con el contrato aprobado; no conectar endpoints mientras falten las dependencias del Issue #4.

Pruebas: Vitest con jsdom para componentes y flujo, y pruebas del adaptador sin red. La compilación no prueba integración con Django.
