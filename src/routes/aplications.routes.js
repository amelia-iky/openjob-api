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

router.get('/', auth, getApplicationsHandler);
router.get('/user/:userId', auth, getApplicationsByUserIdHandler);
router.get('/job/:jobId', auth, getApplicationsByJobIdHandler);
router.get('/:id', auth, getApplicationByIdHandler);
router.post('/', auth, validate(ApplicationSchema), addApplicationHandler);
router.put('/:id', auth, updateApplicationStatusHandler);
router.delete('/:id', auth, deleteApplicationHandler);

export default router;
