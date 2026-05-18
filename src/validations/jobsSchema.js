const Joi = require('joi');

const JobSchema = Joi.object({
  title: Joi.string().strict().required(),
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
}).unknown();

const EditJobSchema = Joi.object({
  title: Joi.string().strict(),
  company_id: Joi.string(),
  category_id: Joi.string(),
}).unknown();

module.exports = {
  JobSchema,
  EditJobSchema,
};
