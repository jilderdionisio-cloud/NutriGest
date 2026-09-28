# GestNutri

Foundation for a nutrition-professional web application. The repository is split into an independent React frontend and Django REST API so a small team can work by area without stepping on each other.

## Prerequisites (WSL)

- Ubuntu on WSL 2
- Python 3.12+, Node.js 20+, npm, PostgreSQL 16+

## Initial setup

From WSL, open the project and create local environment files:

```bash
cd /mnt/c/NutriGest
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
sudo -u postgres psql -c "CREATE USER gestnutri WITH PASSWORD 'change-me';"
sudo -u postgres psql -c "CREATE DATABASE gestnutri OWNER gestnutri;"
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
cd frontend && npm install && cd ..
```

Set a unique `SECRET_KEY` and PostgreSQL password in `backend/.env`; use the same password in the database setup command. Local `.env` files, dependencies, and patient data are ignored by Git.

## Start the application

Terminal 1 (API):

```bash
cd /mnt/c/NutriGest
source backend/.venv/bin/activate
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Terminal 2 (frontend):

```bash
cd /mnt/c/NutriGest/frontend
npm run dev
```

Visit `http://localhost:5173`, then sign in with the user created by `createsuperuser`.

## Checks

```bash
cd /mnt/c/NutriGest
source backend/.venv/bin/activate
cd backend && python manage.py test
cd ../frontend && npm run build
```

## API surface

- `POST /api/auth/login/` returns an authentication token.
- `GET`, `POST /api/patients/` lists or creates the signed-in professional's patients.
- `GET`, `PUT`, `PATCH /api/patients/<id>/` views or edits that professional's patient.
