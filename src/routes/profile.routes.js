import express from 'express';
import {
  getProfileHandler,
  getProfileApplicationsHandler,
  getProfileBookmarksHandler,
} from '../controllers/profile.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfileHandler);
router.get('/profile/applications', auth, getProfileApplicationsHandler);
router.get('/profile/bookmarks', auth, getProfileBookmarksHandler);

export default router;
