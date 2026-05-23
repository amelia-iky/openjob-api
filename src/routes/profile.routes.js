import express from 'express';
import {
  getProfileHandler,
  getProfileApplicationsHandler,
  getProfileBookmarksHandler,
} from '../controllers/profile.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getProfileHandler);
router.get('/applications', auth, getProfileApplicationsHandler);
router.get('/bookmarks', auth, getProfileBookmarksHandler);

export default router;
