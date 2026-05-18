const Joi = require('joi');

const ApplicationSchema = Joi.object({
  job_id: Joi.string().required(),
}).unknown();

module.exports = ApplicationSchema;
