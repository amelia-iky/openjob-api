const pool = require('../../database/pool');
const { nanoid } = require('nanoid');

const getBookmarksHandler = async (req, res) => {
  const result = await pool.query('SELECT * FROM bookmarks');

  return res.status(200).json({
    status: 'success',
    data: {
      bookmarks: result.rows,
    },
  });
};

const getBookmarkByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM bookmarks WHERE id = $1', [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Bookmark tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: result.rows[0],
  });
};

const getBookmarksByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query('SELECT * FROM bookmarks WHERE user_id = $1', [userId]);

  return res.status(200).json({
    status: 'success',
    data: {
      bookmarks: result.rows,
    },
  });
};

const addBookmarkHandler = async (req, res) => {
  const { jobId } = req.params;

  const id = `bookmark-${nanoid(10)}`;

  await pool.query(
    `
      INSERT INTO bookmarks (id, user_id, job_id)
      VALUES ($1, $2, $3)
    `,
    [id, req.user.id, jobId]
  );

  return res.status(201).json({
    status: 'success',
    message: 'Bookmark berhasil ditambahkan',
    data: {
      id,
    },
  });
};

const deleteBookmarkHandler = async (req, res) => {
  const { jobId } = req.params;

  await pool.query('DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2', [
    req.user.id,
    jobId,
  ]);

  return res.status(200).json({
    status: 'success',
    message: 'Bookmark berhasil dihapus',
  });
};

module.exports = {
  getBookmarksHandler,
  getBookmarkByIdHandler,
  getBookmarksByUserIdHandler,
  addBookmarkHandler,
  deleteBookmarkHandler,
};
