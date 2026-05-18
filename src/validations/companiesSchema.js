const Joi = require('joi');

const CompanySchema = Joi.object({
  name: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
});

module.exports = CompanySchema;
