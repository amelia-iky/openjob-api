import express from 'express';
import {
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyHandler,
  getJobsByCategoryHandler,
  addJobHandler,
  updateJobHandler,
  deleteJobHandler,
} from '../controllers/jobs.controller.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { JobSchema, UpdateJobSchema } from '../validations/jobsSchema.js';

const router = express.Router();

router.get('/jobs', getJobsHandler);
router.get('/jobs/:id', getJobByIdHandler);
router.get('/jobs/company/:companyId', getJobsByCompanyHandler);
router.get('/jobs/category/:categoryId', getJobsByCategoryHandler);
router.post('/jobs', auth, validate(JobSchema), addJobHandler);
router.put('/jobs/:id', auth, validate(UpdateJobSchema), updateJobHandler);
router.delete('/jobs/:id', auth, deleteJobHandler);

export default router;
