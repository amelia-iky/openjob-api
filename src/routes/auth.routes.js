import express from 'express';
import {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { AuthSchema, RefreshTokenSchema } from '../validations/authSchema.js';

const router = express.Router();

router.post('/', validate(AuthSchema), loginHandler);
router.put('/', validate(RefreshTokenSchema), refreshAuthenticationHandler);
router.delete('/', validate(RefreshTokenSchema), deleteAuthenticationHandler);

export default router;
