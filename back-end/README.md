# GetHired Back-End

NestJS REST API for the GetHired student placement tracker. Data access uses the `mysql2` promise connection pool in `src/data/database.ts`; no ORM is used.

## Structure

```text
src/
├── common/          Shared constants and response utilities
├── data/            MySQL connection pool and schema SQL
├── modules/         Applications and dashboard features
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Configure

Copy `.env.example` to `.env` and update only for your local database account:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=gethired_user
DB_PASSWORD=gethired123
DB_NAME=gethired_db
FRONTEND_URL=http://localhost:5173
PORT=3000
```

## MySQL Setup

Run the schema in the Ubuntu/WSL terminal where MySQL is running:

```bash
cd "/mnt/c/Users/R Venkata Harshith/OneDrive/Documents/GetHired/back-end"
mysql -u root -p < src/data/schema.sql
```

If the database user does not already exist, create it with the same password configured in `.env`:

```sql
CREATE USER IF NOT EXISTS 'gethired_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON gethired_db.* TO 'gethired_user'@'localhost';
FLUSH PRIVILEGES;
```

## Run

Because the intended MySQL server runs in Ubuntu/WSL, start this backend from Ubuntu/WSL as well:

```bash
cd "/mnt/c/Users/R Venkata Harshith/OneDrive/Documents/GetHired/back-end"
npm install
npm run start:dev
```

Install a Linux Node.js/npm runtime in Ubuntu first if `node --version` is unavailable there.

## Verify

```bash
npm run build
npm test
curl http://localhost:3000/
curl http://localhost:3000/dashboard/stats
```

See [docs/api.md](docs/api.md) for request and response examples.
