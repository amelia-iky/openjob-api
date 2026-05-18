const express = require('express');

const {
  getApplicationsHandler,
  getApplicationByIdHandler,
  getApplicationsByUserIdHandler,
  getApplicationsByJobIdHandler,
  addApplicationHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
} = require('./handler');

const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');

const ApplicationSchema = require('../../validations/applicationsSchema');

const router = express.Router();

router.get('/applications', auth, getApplicationsHandler);

router.get('/applications/:id', auth, getApplicationByIdHandler);

router.get('/applications/user/:userId', auth, getApplicationsByUserIdHandler);

router.get('/applications/job/:jobId', auth, getApplicationsByJobIdHandler);

router.post(
  '/applications',
  auth,
  validate(ApplicationSchema),
  addApplicationHandler,
);

router.put('/applications/:id', auth, updateApplicationStatusHandler);

router.delete('/applications/:id', auth, deleteApplicationHandler);

module.exports = router;
