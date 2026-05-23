import express from 'express';
import {
  getApplicationsHandler,
  getApplicationByIdHandler,
  getApplicationsByUserIdHandler,
  getApplicationsByJobIdHandler,
  addApplicationHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
} from '../controllers/aplications.controller.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { ApplicationSchema } from '../validations/applicationsSchema.js';

const router = express.Router();

router.get('/applications', auth, getApplicationsHandler);

router.get('/applications/:id', auth, getApplicationByIdHandler);

router.get('/applications/user/:userId', auth, getApplicationsByUserIdHandler);

router.get('/applications/job/:jobId', auth, getApplicationsByJobIdHandler);

router.post('/applications', auth, validate(ApplicationSchema), addApplicationHandler);

router.put('/applications/:id', auth, updateApplicationStatusHandler);

router.delete('/applications/:id', auth, deleteApplicationHandler);

export default router;
