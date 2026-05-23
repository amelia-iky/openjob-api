import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

const getCompaniesHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM companies');

  return res.status(200).json({
    status: 'success',
    data: {
      companies: result.rows,
    },
  });
};

const getCompanyByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);

  if (!result.rows.length) {
    throw new AppError('Company not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};

const addCompanyHandler = async (req, res) => {
  const { name, location, description } = req.body;
  const id = nanoid();

  await pool.query(
    'INSERT INTO companies (id, name, location, description) VALUES ($1, $2, $3, $4)',
    [id, name, location, description]
  );

  return res.status(201).json({
    status: 'success',
    message: 'Company berhasil ditambahkan',
    data: {
      id,
      name,
      location,
      description,
    },
  });
};

const updateCompanyHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await pool.query('UPDATE companies SET name = $1 WHERE id = $2 RETURNING id', [
    name,
    id,
  ]);

  if (!result.rows.length) {
    throw new AppError('Company not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Company berhasil diupdate',
  });
};

const deleteCompanyHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING id', [id]);

  if (!result.rows.length) {
    throw new AppError('Company not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Company berhasil dihapus',
  });
};

export {
  getCompaniesHandler,
  getCompanyByIdHandler,
  addCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
};
