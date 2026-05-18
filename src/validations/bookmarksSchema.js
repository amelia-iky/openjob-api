const Joi = require('joi');
const { id } = require('./usersSchema');

const BookmarkSchema = Joi.object({
  user_id: Joi.string().length(13).required(),
  job_id: Joi.string().length(13).required(),
});

module.exports = BookmarkSchema;
