const express = require('express');

const auth = require('../../middleware/auth');

const {
  getProfileHandler,
  getProfileApplicationsHandler,
  getProfileBookmarksHandler,
} = require('./handler');

const router = express.Router();

router.get('/profile', auth, getProfileHandler);

router.get('/profile/applications', auth, getProfileApplicationsHandler);

router.get('/profile/bookmarks', auth, getProfileBookmarksHandler);

module.exports = router;
