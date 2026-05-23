import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

export const getBookmarksHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM bookmarks');

  return res.status(200).json({
    status: 'success',
    data: {
      bookmarks: result.rows,
    },
  });
};

export const getBookmarkByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM bookmarks WHERE id = $1', [id]);

  if (!result.rows.length) {
    throw new AppError('Bookmark not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};

export const getBookmarksByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query('SELECT * FROM bookmarks WHERE user_id = $1', [userId]);

  return res.status(200).json({
    status: 'success',
    data: {
      bookmarks: result.rows,
    },
  });
};

export const addBookmarkHandler = async (req, res) => {
  const { jobId } = req.params;
  const id = nanoid();

  await pool.query(
    `
      INSERT INTO bookmarks (id, user_id, job_id)
      VALUES ($1, $2, $3)
    `,
    [id, req.user.id, jobId]
  );

  return res.status(201).json({
    status: 'success',
    message: 'Bookmark berhasil ditambahkan',
    data: {
      id,
    },
  });
};

export const deleteBookmarkHandler = async (req, res) => {
  const { jobId } = req.params;

  await pool.query('DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2', [
    req.user.id,
    jobId,
  ]);

  return res.status(200).json({
    status: 'success',
    message: 'Bookmark berhasil dihapus',
  });
};
