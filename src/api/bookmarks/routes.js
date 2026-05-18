const express = require('express');

const {
  getBookmarksHandler,
  getBookmarkByIdHandler,
  getBookmarksByUserIdHandler,
  addBookmarkHandler,
  deleteBookmarkHandler,
} = require('./handler');

const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/bookmarks', auth, getBookmarksHandler);

router.get('/bookmarks/user/:userId', auth, getBookmarksByUserIdHandler);

router.get('/jobs/:jobId/bookmark/:id', auth, getBookmarkByIdHandler);

router.post('/jobs/:jobId/bookmark', auth, addBookmarkHandler);

router.delete('/jobs/:jobId/bookmark', auth, deleteBookmarkHandler);

module.exports = router;
