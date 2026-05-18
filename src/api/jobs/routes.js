const express = require('express');
const {
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyHandler,
  getJobsByCategoryHandler,
  addJobHandler,
  updateJobHandler,
  deleteJobHandler,
} = require('./handler');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { JobSchema, UpdateJobSchema } = require('../../validations/jobsSchema');

const router = express.Router();

router.get('/jobs', getJobsHandler);
router.get('/jobs/:id', getJobByIdHandler);
router.get('/jobs/company/:companyId', getJobsByCompanyHandler);
router.get('/jobs/category/:categoryId', getJobsByCategoryHandler);
router.post('/jobs', auth, validate(JobSchema), addJobHandler);
router.put('/jobs/:id', auth, validate(UpdateJobSchema), updateJobHandler);

router.delete('/jobs/:id', auth, deleteJobHandler);

module.exports = router;
