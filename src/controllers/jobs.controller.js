import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

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

  return res.json({
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
    throw new AppError('Job not found', 404);
  }

  return res.json({
    status: 'success',
    data: result.rows[0],
  });
};

const getJobsByCompanyHandler = async (req, res) => {
  const { companyId } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE company_id = $1', [companyId]);

  return res.json({
    status: 'success',
    data: {
      jobs: result.rows,
    },
  });
};

const getJobsByCategoryHandler = async (req, res) => {
  const { categoryId } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE category_id = $1', [categoryId]);

  return res.json({
    status: 'success',
    data: {
      jobs: result.rows,
    },
  });
};

const addJobHandler = async (req, res) => {
  const {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = req.body;

  const id = nanoid();

  await pool.query(
    `
  INSERT INTO jobs (
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13
  )
`,
    [
      id,
      company_id,
      category_id,
      title,
      description,
      job_type,
      experience_level,
      location_type,
      location_city,
      salary_min,
      salary_max,
      is_salary_visible,
      status,
    ]
  );

  return res.status(201).json({
    status: 'success',
    message: 'Job berhasil ditambahkan',
    data: {
      id,
    },
  });
};

const updateJobHandler = async (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  Object.entries(req.body).forEach(([key, value], index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  values.push(id);

  const query = `
    UPDATE jobs
    SET
      ${fields.join(', ')},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $${values.length}
    RETURNING id
  `;

  const result = await pool.query(query, values);

  if (!result.rows.length) {
    throw new AppError('Job not found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Job berhasil diupdate',
  });
};

const deleteJobHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id]);

  if (!result.rows.length) {
    throw new AppError('Job not found', 404);
  }

  return res.json({
    status: 'success',
    message: 'Job berhasil dihapus',
  });
};

export {
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyHandler,
  getJobsByCategoryHandler,
  addJobHandler,
  updateJobHandler,
  deleteJobHandler,
};
