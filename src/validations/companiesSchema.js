const Joi = require('joi');

const CompanySchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  location: Joi.string().trim().min(3).max(255).required(),
  description: Joi.string().trim().required(),
});

module.exports = CompanySchema;
