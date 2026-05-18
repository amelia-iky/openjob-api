const pool = require('../../database/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nanoid = require('../../utils/nanoid');

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `
      SELECT id, email, password, role
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({
        status: 'failed',
        message: 'Email atau password salah',
      });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        status: 'failed',
        message: 'Email atau password salah',
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: '3h',
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: '7d',
      }
    );

    await pool.query(
      `
      INSERT INTO authentications
      (id, user_id, token, expired_at)
      VALUES ($1, $2, $3, NOW() + interval '7 days')
      `,
      [nanoid(), user.id, refreshToken]
    );

    return res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kegagalan pada server',
    });
  }
};

const refreshAuthenticationHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      status: 'failed',
      message: 'refreshToken diperlukan',
    });
  }

  try {
    const tokenResult = await pool.query(
      `
      SELECT token
      FROM authentications
      WHERE token = $1
      `,
      [refreshToken]
    );

    if (!tokenResult.rows.length) {
      return res.status(400).json({
        status: 'failed',
        message: 'Refresh token tidak valid',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: '3h',
      }
    );

    return res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      status: 'failed',
      message: 'Refresh token tidak valid',
    });
  }
};

const deleteAuthenticationHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      status: 'failed',
      message: 'refreshToken diperlukan',
    });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM authentications
      WHERE token = $1
      RETURNING id
      `,
      [refreshToken]
    );

    if (!result.rows.length) {
      return res.status(400).json({
        status: 'failed',
        message: 'Refresh token tidak valid',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kegagalan pada server',
    });
  }
};

module.exports = {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
};
