import * as dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

function requiredVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const configuredPort = Number(process.env.DB_PORT || '3306');

if (!Number.isInteger(configuredPort) || configuredPort <= 0) {
  throw new Error('DB_PORT must be a valid port number');
}

export const databasePool = createPool({
  host: requiredVariable('DB_HOST'),
  port: configuredPort,
  user: requiredVariable('DB_USERNAME'),
  password: requiredVariable('DB_PASSWORD'),
  database: requiredVariable('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});
