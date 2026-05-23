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
import {
  getBookmarkByIdHandler,
  addBookmarkHandler,
  deleteBookmarkHandler,
} from '../controllers/bookmarks.controller.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { JobSchema, UpdateJobSchema } from '../validations/jobsSchema.js';

const router = express.Router();

router.get('/', getJobsHandler);
router.get('/company/:companyId', getJobsByCompanyHandler);
router.get('/category/:categoryId', getJobsByCategoryHandler);
router.get('/:jobId/bookmark/:id', auth, getBookmarkByIdHandler);
router.post('/:jobId/bookmark', auth, addBookmarkHandler);
router.delete('/:jobId/bookmark', auth, deleteBookmarkHandler);
router.post('/', auth, validate(JobSchema), addJobHandler);
router.get('/:id', getJobByIdHandler);
router.put('/:id', auth, validate(UpdateJobSchema), updateJobHandler);
router.delete('/:id', auth, deleteJobHandler);

export default router;
