import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

export const getApplicationsHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM applications');

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

export const getApplicationByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);

  if (!result.rows.length) {
    throw new AppError('Application not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};

export const getApplicationsByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE user_id = $1', [userId]);

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

export const getApplicationsByJobIdHandler = async (req, res) => {
  const { jobId } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE job_id = $1', [jobId]);

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

export const addApplicationHandler = async (req, res) => {
  const { job_id } = req.body;
  const id = nanoid();

  await pool.query(
    `
      INSERT INTO applications (id, user_id, job_id)
      VALUES ($1, $2, $3)
    `,
    [id, req.user.id, job_id]
  );

  return res.status(201).json({
    status: 'success',
    message: 'Application berhasil ditambahkan',
    data: {
      id,
    },
  });
};

export const updateApplicationStatusHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT id FROM applications WHERE id = $1', [id]);

  if (!result.rows.length) {
    throw new AppError('Application not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Status application berhasil diupdate',
  });
};

export const deleteApplicationHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [id]);

  if (!result.rows.length) {
    throw new AppError('Application not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Application berhasil dihapus',
  });
};
