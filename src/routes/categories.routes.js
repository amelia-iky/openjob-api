import express from 'express';
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  addCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/categories.controller.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { CategorySchema } from '../validations/categoriesSchema.js';

const router = express.Router();

router.get('/categories', getCategoriesHandler);

router.get('/categories/:id', getCategoryByIdHandler);

router.post('/categories', auth, validate(CategorySchema), addCategoryHandler);

router.put('/categories/:id', auth, validate(CategorySchema), updateCategoryHandler);

router.delete('/categories/:id', auth, deleteCategoryHandler);

export default router;
