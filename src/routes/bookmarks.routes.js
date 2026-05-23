import express from 'express';
import {
  getBookmarksHandler,
  getBookmarksByUserIdHandler,
} from '../controllers/bookmarks.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getBookmarksHandler);
router.get('/user/:userId', auth, getBookmarksByUserIdHandler);

export default router;
