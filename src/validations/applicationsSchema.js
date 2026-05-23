import Joi from 'joi';

export const ApplicationSchema = Joi.object({
  user_id: Joi.string().length(13).required(),
  job_id: Joi.string().length(13).required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});
