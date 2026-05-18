const Joi = require('joi');
const { user } = require('pg/lib/defaults');

const ApplicationSchema = Joi.object({
  user_id: Joi.number().integer().strict().required(),
  job_id: Joi.number().integer().strict().required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});

module.exports = ApplicationSchema;
