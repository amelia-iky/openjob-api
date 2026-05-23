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

router.get('/', getCategoriesHandler);
router.get('/:id', getCategoryByIdHandler);
router.post('/', auth, validate(CategorySchema), addCategoryHandler);
router.put('/:id', auth, validate(CategorySchema), updateCategoryHandler);
router.delete('/:id', auth, deleteCategoryHandler);

export default router;
