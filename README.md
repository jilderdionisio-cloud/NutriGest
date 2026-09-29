# GestNutri: base de desarrollo local

GestNutri es una aplicación web para profesionales de nutrición. Esta rama prepara la base local para React/Vite, Django/Django REST Framework y PostgreSQL. No contiene todavía el MVP completo.

## Requisitos en Windows

- Git.
- Node.js 20.19 o posterior, con npm.
- Python 3.13 o posterior disponible como `python`.
- PostgreSQL 16 o posterior, con `psql` disponible en `PATH`.

## 1. Crear la base de datos PostgreSQL

Instala e inicia PostgreSQL en tu equipo. En PowerShell, con una contraseña local que no sea una credencial real, ejecuta:

```powershell
psql -U postgres -h localhost -p 5432 -c "CREATE ROLE gestnutri LOGIN PASSWORD 'elige-una-contrasena-local-segura';"
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE gestnutri OWNER gestnutri;"
```

Si el rol o la base ya existen, no repitas esos comandos. Puedes comprobar la conexión así:

```powershell
psql -U gestnutri -h localhost -p 5432 -d gestnutri -c "SELECT current_database(), current_user;"
```

## 2. Configurar y arrancar el backend

Desde la raíz del repositorio, crea el entorno y la configuración:

```powershell
Copy-Item backend\.env.example backend\.env
python -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install --upgrade pip
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

Después entra en el directorio del backend para ejecutar Django:

```powershell
Set-Location backend
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test
.\.venv\Scripts\python.exe manage.py runserver
```

Edita `backend\.env` para que `POSTGRES_PASSWORD` coincida con la contraseña local elegida. `backend\.env` está ignorado por Git: no debe versionarse. La API queda en `http://localhost:8000/api/`.

Para ejecutar la suite sin instalar PostgreSQL (por ejemplo, en una revisión local), usa SQLite solo para ese proceso:

```powershell
$env:DJANGO_TEST_USE_SQLITE = "true"
.\.venv\Scripts\python.exe manage.py test
Remove-Item Env:DJANGO_TEST_USE_SQLITE
```

No uses esa variable al iniciar el servidor habitual: el entorno de desarrollo de GestNutri usa PostgreSQL.

## 3. Configurar y arrancar el frontend

En otra terminal, desde la raíz:

```powershell
Copy-Item frontend\.env.example frontend\.env
npm ci --prefix frontend
npm run build --prefix frontend
npm run dev --prefix frontend
```

El navegador queda disponible normalmente en `http://localhost:5173`. La variable `VITE_API_URL` debe apuntar al backend; no se deben colocar secretos en variables que empiezan por `VITE_`.

## Verificaciones rápidas

Con backend y frontend en ejecución:

1. Desde `backend`, crea un usuario local de Django con `.\.venv\Scripts\python.exe manage.py createsuperuser`.
2. Abre el frontend, inicia sesión con ese usuario y confirma que se muestra la lista vacía de pacientes.
3. Para comprobar la API directamente, consulta [el contrato actual](docs/contrato-api.md).

## Alcance actual

La base incluye autenticación por token y API de pacientes. Consultas, mediciones, evolución, WhatsApp e IA de notas no se implementan en esta rama. El contrato existente se documenta en [docs/contrato-api.md](docs/contrato-api.md).

## Agente orquestador

El agente de coordinación está definido en [`.codex/agents/orquestador.toml`](.codex/agents/orquestador.toml). En una conversación de Codex desde la raíz del proyecto, solicítale: `Invoca al agente orquestador para revisar las ramas y Pull Requests de GestNutri.` Su función es de solo lectura: contrasta el plan, el estado del repositorio y los contratos, y separa hechos comprobados de pendientes. No sustituye el flujo de Pull Request ni opera GitHub.

La función de IA para formalizar notas del producto es una historia posterior y es independiente del agente orquestador; no se necesita ninguna credencial de IA para arrancar esta base.
