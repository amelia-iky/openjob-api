import Joi from 'joi';

export const AuthSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().strict().min(3).required(),
});

export const RefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
