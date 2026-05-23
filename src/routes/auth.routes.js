import express from 'express';
import {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { AuthSchema } from '../validations/authSchema.js';

const router = express.Router();

router.post('/authentications', validate(AuthSchema), loginHandler);
router.put('/authentications', refreshAuthenticationHandler);
router.delete('/authentications', deleteAuthenticationHandler);

export default router;
