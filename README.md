# GetHired

GetHired is a full-stack placement and job application tracker for students.

## Stack

- Frontend: React + Vite + normal CSS
- Backend: NestJS + TypeScript REST API
- Database: MySQL accessed through `mysql2`

No ORM, Redux, Redis, or CSS framework is used.

## Project Folders

```text
GetHired/
├── back-end/    NestJS API, MySQL schema, API documentation and tests
└── front-end/   React/Vite placement dashboard
```

## Start MySQL And Backend

Your intended MySQL service is in Ubuntu/WSL. Run the schema and backend there:

```bash
cd "/mnt/c/Users/R Venkata Harshith/OneDrive/Documents/GetHired/back-end"
mysql -u root -p < src/data/schema.sql
npm install
npm run start:dev
```

Create `back-end/.env` from `back-end/.env.example` and ensure the configured MySQL user exists with matching credentials.

Important: Windows also has its own MySQL service on `localhost:3306`. Running this backend from Windows can connect to that separate database instead of Ubuntu MySQL. For the WSL database, use:

```bash
/mnt/c/Users/R Venkata Harshith/OneDrive/Documents/GetHired/back-end
```

## Start Frontend

```powershell
cd "C:\Users\R Venkata Harshith\OneDrive\Documents\GetHired\front-end"
npm install
npm run dev
```

- Dashboard: `http://localhost:5173`
- API: `http://localhost:3000`
- API documentation: [back-end/docs/api.md](back-end/docs/api.md)

## Build And Test

```bash
cd back-end
npm run build
npm test
```

```bash
cd front-end
npm run build
```
