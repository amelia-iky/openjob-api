const Joi = require('joi');

const BookmarkSchema = Joi.object({
  user_id: Joi.number().integer().strict().required(),
  job_id: Joi.number().integer().strict().required(),
});

module.exports = BookmarkSchema;
