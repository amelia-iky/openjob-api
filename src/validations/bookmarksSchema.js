const Joi = require('joi');

const BookmarkSchema = Joi.object({
  job_id: Joi.string().required(),
}).unknown();

module.exports = BookmarkSchema;
