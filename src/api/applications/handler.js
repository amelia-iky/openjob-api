const pool = require('../../database/pool');
const { nanoid } = require('nanoid');

const getApplicationsHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM applications');

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

const getApplicationByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Application tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};

const getApplicationsByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE user_id = $1', [userId]);

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

const getApplicationsByJobIdHandler = async (req, res) => {
  const { jobId } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE job_id = $1', [jobId]);

  return res.status(200).json({
    status: 'success',
    data: {
      applications: result.rows,
    },
  });
};

const addApplicationHandler = async (req, res) => {
  const { job_id } = req.body;

  const id = `application-${nanoid(10)}`;

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

const updateApplicationStatusHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT id FROM applications WHERE id = $1', [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Application tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Status application berhasil diupdate',
  });
};

const deleteApplicationHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Application tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Application berhasil dihapus',
  });
};

module.exports = {
  getApplicationsHandler,
  getApplicationByIdHandler,
  getApplicationsByUserIdHandler,
  getApplicationsByJobIdHandler,
  addApplicationHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
};
