const pool = require('../../database/pool');
const { nanoid } = require('nanoid');

const getJobsHandler = async (req, res) => {
  const { title, 'company-name': companyName } = req.query;

  let query = `
    SELECT jobs.*
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE 1=1
  `;

  const values = [];

  if (title) {
    values.push(`%${title}%`);
    query += ` AND LOWER(jobs.title) LIKE LOWER($${values.length})`;
  }

  if (companyName) {
    values.push(`%${companyName}%`);
    query += ` AND LOWER(companies.name) LIKE LOWER($${values.length})`;
  }

  const result = await pool.query(query, values);

  res.json({
    status: 'success',
    data: {
      jobs: result.rows,
    },
  });
};

const getJobByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Job tidak ditemukan',
    });
  }

  return res.json({
    status: 'success',
    data: result.rows[0],
  });
};

const getJobsByCompanyHandler = async (req, res) => {
  const { companyId } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE company_id = $1', [
    companyId,
  ]);

  res.json({
    status: 'success',
    data: {
      jobs: result.rows,
    },
  });
};

const getJobsByCategoryHandler = async (req, res) => {
  const { categoryId } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE category_id = $1', [
    categoryId,
  ]);

  res.json({
    status: 'success',
    data: {
      jobs: result.rows,
    },
  });
};

const addJobHandler = async (req, res) => {
  const { title, company_id, category_id } = req.body;

  const id = `job-${nanoid(10)}`;

  await pool.query(
    `
      INSERT INTO jobs (id, title, company_id, category_id)
      VALUES ($1, $2, $3, $4)
    `,
    [id, title, company_id, category_id],
  );

  res.status(201).json({
    status: 'success',
    message: 'Job berhasil ditambahkan',
    data: {
      id,
    },
  });
};

const updateJobHandler = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const result = await pool.query(
    `
      UPDATE jobs
      SET title = $1
      WHERE id = $2
      RETURNING id
    `,
    [title, id],
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Job tidak ditemukan',
    });
  }

  res.json({
    status: 'success',
    message: 'Job berhasil diupdate',
  });
};

const deleteJobHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM jobs WHERE id = $1 RETURNING id',
    [id],
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Job tidak ditemukan',
    });
  }

  res.json({
    status: 'success',
    message: 'Job berhasil dihapus',
  });
};

module.exports = {
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyHandler,
  getJobsByCategoryHandler,
  addJobHandler,
  updateJobHandler,
  deleteJobHandler,
};
