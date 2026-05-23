import Joi from 'joi';

export const CategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
});
