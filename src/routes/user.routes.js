import express from 'express';
import { addUser, getUserById } from '../controllers/users.controller.js';
import validate from '../middleware/validate.js';
import { UserSchema } from '../validations/usersSchema.js';

const router = express.Router();

router.post('/', validate(UserSchema), addUser);
router.get('/:id', getUserById);

export default router;
