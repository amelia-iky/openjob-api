const express = require('express');
const {
  getCompaniesHandler,
  getCompanyByIdHandler,
  addCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} = require('./handler');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const CompanySchema = require('../../validations/companiesSchema');

const router = express.Router();

router.get('/companies', getCompaniesHandler);
router.get('/companies/:id', getCompanyByIdHandler);
router.post('/companies', auth, validate(CompanySchema), addCompanyHandler);
router.put('/companies/:id', auth, updateCompanyHandler);
router.delete('/companies/:id', auth, deleteCompanyHandler);

module.exports = router;
