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
import { CompanySchema, UpdateCompanySchema } from '../validations/companiesSchema.js';

const router = express.Router();

router.get('/', getCompaniesHandler);
router.get('/:id', getCompanyByIdHandler);
router.post('/', auth, validate(CompanySchema), addCompanyHandler);
router.put('/:id', auth, validate(UpdateCompanySchema), updateCompanyHandler);
router.delete('/:id', auth, deleteCompanyHandler);

export default router;
