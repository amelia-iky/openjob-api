const pool = require('../../database/pool');
const nanoid = require('../../utils/nanoid');

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
    return res.status(404).json({
      status: 'failed',
      message: 'Company tidak ditemukan',
    });
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
    [id, name.trim(), location.trim(), description.trim()]
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

  const check = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);

  if (!check.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Company tidak ditemukan',
    });
  }

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      status: 'failed',
      message: '"name" is required',
    });
  }

  await pool.query('UPDATE companies SET name = $1 WHERE id = $2', [name.trim(), id]);

  return res.status(200).json({
    status: 'success',
    message: 'Company berhasil diupdate',
  });
};

const deleteCompanyHandler = async (req, res) => {
  const { id } = req.params;

  const check = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);

  if (!check.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Company tidak ditemukan',
    });
  }

  await pool.query('DELETE FROM companies WHERE id = $1', [id]);

  return res.status(200).json({
    status: 'success',
    message: 'Company berhasil dihapus',
  });
};

module.exports = {
  getCompaniesHandler,
  getCompanyByIdHandler,
  addCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
};
