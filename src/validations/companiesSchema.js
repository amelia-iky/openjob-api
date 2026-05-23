import Joi from 'joi';

export const CompanySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  location: Joi.string().trim().min(3).max(255).required(),
  description: Joi.string().trim().required(),
});
