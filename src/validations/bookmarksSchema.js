import Joi from 'joi';

export const BookmarkSchema = Joi.object({
  user_id: Joi.string().length(13).required(),
  job_id: Joi.string().length(13).required(),
});
