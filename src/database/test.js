import 'dotenv/config';
import pool from './pool.js';

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Database connected:', res.rows);
  }
  process.exit();
});
