const express = require('express');

const {
  getCategoriesHandler,
  getCategoryByIdHandler,
  addCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require('./handler');

const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const CategorySchema = require('../../validations/categoriesSchema');

const router = express.Router();

router.get('/categories', getCategoriesHandler);

router.get('/categories/:id', getCategoryByIdHandler);

router.post('/categories', auth, validate(CategorySchema), addCategoryHandler);

router.put(
  '/categories/:id',
  auth,
  validate(CategorySchema),
  updateCategoryHandler,
);

router.delete('/categories/:id', auth, deleteCategoryHandler);

module.exports = router;
