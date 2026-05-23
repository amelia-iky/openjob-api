import express from 'express';
import {
  getCompaniesHandler,
  getCompanyByIdHandler,
  addCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} from '../controllers/companies.controller.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { CompanySchema } from '../validations/companiesSchema.js';

const router = express.Router();

router.get('/companies', getCompaniesHandler);
router.get('/companies/:id', getCompanyByIdHandler);
router.post('/companies', auth, validate(CompanySchema), addCompanyHandler);
router.put('/companies/:id', auth, updateCompanyHandler);
router.delete('/companies/:id', auth, deleteCompanyHandler);

export default router;
