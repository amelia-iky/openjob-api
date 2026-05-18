const pool = require('../../database/pool');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const addUserHandler = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({
      status: 'failed',
      message: 'Payload tidak valid',
    });
  }

  const id = `user-${nanoid(10)}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)',
      [id, name.trim(), email.trim(), hashedPassword, role || 'user'],
    );

    return res.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kegagalan pada server',
    });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'User tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kegagalan pada server',
    });
  }
};

module.exports = {
  addUserHandler,
  getUserByIdHandler,
};
