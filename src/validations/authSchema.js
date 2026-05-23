import Joi from 'joi';

export const AuthSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().strict().min(6).required(),
});
