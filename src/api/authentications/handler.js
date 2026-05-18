const pool = require('../../database/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const invalidTokens = [];

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

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
      { id: user.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' },
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_KEY,
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
    return res.status(500).json({
      status: 'failed',
      message: error.message,
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

  if (invalidTokens.includes(refreshToken)) {
    return res.status(400).json({
      status: 'failed',
      message: 'Refresh token tidak valid',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' },
    );

    return res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
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
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    invalidTokens.push(refreshToken);

    return res.status(200).json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: 'Refresh token tidak valid',
    });
  }
};

module.exports = {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
};
