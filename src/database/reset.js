import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

await pool.query(`
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
`);

console.log('Database reset successfully');

await pool.end();
