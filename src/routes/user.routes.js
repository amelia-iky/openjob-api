import express from 'express';
import { addUser, getUserById } from '../controllers/users.controller.js';
import validate from '../middleware/validate.js';
import { UserSchema } from '../validations/usersSchema.js';

const router = express.Router();

router.post('/users', validate(UserSchema), addUser);
router.get('/users/:id', getUserById);

export default router;
