import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nanoid from '../utils/nanoid.js';
import pool from '../database/pool.js';
import { AppError } from '../utils/AppError.js';

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    `
    SELECT id, email, password, role
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  if (!result.rows.length) {
    throw new AppError('Email or password is incorrect', 401);
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new AppError('Email or password is incorrect', 401);
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '3h',
    },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: '7d',
    },
  );

  await pool.query(
    `
    INSERT INTO authentications
    (id, user_id, token, expired_at)
    VALUES ($1, $2, $3, NOW() + interval '7 days')
    `,
    [nanoid(), user.id, refreshToken],
  );

  return res.status(200).json({
    status: 'success',
    message: 'Login berhasil',
    data: {
      accessToken,
      refreshToken,
    },
  });
};

const refreshAuthenticationHandler = async (req, res) => {
  const { refreshToken } = req.body;

  const tokenResult = await pool.query(
    `
    SELECT token
    FROM authentications
    WHERE token = $1
    `,
    [refreshToken],
  );

  if (!tokenResult.rows.length) {
    throw new AppError('Refresh token tidak valid', 400);
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
  } catch {
    throw new AppError('Refresh token tidak valid', 400);
  }

  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '3h',
    },
  );

  return res.status(200).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
};

const deleteAuthenticationHandler = async (req, res) => {
  const { refreshToken } = req.body;

  const result = await pool.query(
    `
    DELETE FROM authentications
    WHERE token = $1
    RETURNING id
    `,
    [refreshToken],
  );

  if (!result.rows.length) {
    throw new AppError('Refresh token tidak valid', 400);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Refresh token berhasil dihapus',
  });
};

export {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
};
