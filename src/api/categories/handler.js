const pool = require('../../database/pool');
const { nanoid } = require('nanoid');

const getCategoriesHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM categories');

  res.json({
    status: 'success',
    data: {
      categories: result.rows,
    },
  });
};

const getCategoryByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Category tidak ditemukan',
    });
  }

  return res.json({
    status: 'success',
    data: result.rows[0],
  });
};

const addCategoryHandler = async (req, res) => {
  const { name } = req.body;

  const id = `category-${nanoid(10)}`;

  await pool.query('INSERT INTO categories (id, name) VALUES ($1, $2)', [
    id,
    name,
  ]);

  res.status(201).json({
    status: 'success',
    message: 'Category berhasil ditambahkan',
    data: {
      id,
    },
  });
};

const updateCategoryHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await pool.query(
    'UPDATE categories SET name = $1 WHERE id = $2 RETURNING id',
    [name, id],
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Category tidak ditemukan',
    });
  }

  res.json({
    status: 'success',
    message: 'Category berhasil diupdate',
  });
};

const deleteCategoryHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM categories WHERE id = $1 RETURNING id',
    [id],
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Category tidak ditemukan',
    });
  }

  res.json({
    status: 'success',
    message: 'Category berhasil dihapus',
  });
};

module.exports = {
  getCategoriesHandler,
  getCategoryByIdHandler,
  addCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
