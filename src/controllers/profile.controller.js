import pool from '../database/pool.js';

export const getProfileHandler = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, name, role FROM users WHERE id = $1', [
      req.user.id,
    ]);

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'User tidak ditemukan',
      });
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
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
