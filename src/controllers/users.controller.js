import bcrypt from 'bcrypt';
import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

export const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = nanoid();

  await pool.query(
    `
    INSERT INTO users
    (id, name, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [id, name, email, hashedPassword, role]
  );

  return res.status(201).json({
    status: 'success',
    message: 'User has been created',
    data: {
      id,
      name,
      email,
      role,
    },
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);

  if (!result.rows.length) {
    throw new AppError('User not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};
