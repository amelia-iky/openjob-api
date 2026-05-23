import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

export const getProfileHandler = async (req, res) => {
  const result = await pool.query('SELECT id, email, name, role FROM users WHERE id = $1', [
    req.user.id,
  ]);

  if (!result.rows.length) {
    throw new AppError('User not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    data: {
      id: result.rows[0].id,
      email: result.rows[0].email,
      name: result.rows[0].name,
      fullName: result.rows[0].name,
      role: result.rows[0].role,
    },
  });
};

export const getProfileApplicationsHandler = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      applications: [],
    },
  });
};

export const getProfileBookmarksHandler = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      bookmarks: [],
    },
  });
};
