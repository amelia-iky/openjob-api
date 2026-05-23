import Joi from 'joi';

export const UserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').required(),
});
