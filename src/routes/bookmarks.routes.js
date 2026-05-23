import express from 'express';
import {
  getBookmarksHandler,
  getBookmarksByUserIdHandler,
  getBookmarkByIdHandler,
  addBookmarkHandler,
  deleteBookmarkHandler,
} from '../controllers/bookmarks.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/bookmarks', auth, getBookmarksHandler);
router.get('/bookmarks/user/:userId', auth, getBookmarksByUserIdHandler);
router.get('/jobs/:jobId/bookmark/:id', auth, getBookmarkByIdHandler);
router.post('/jobs/:jobId/bookmark', auth, addBookmarkHandler);
router.delete('/jobs/:jobId/bookmark', auth, deleteBookmarkHandler);

export default router;
