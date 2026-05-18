const Joi = require('joi');

const JobSchema = Joi.object({
  category_id: Joi.number().integer().strict().required(),
  company_id: Joi.number().integer().strict().required(),
  title: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(10).required(),
  job_type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required(),
  experience_level: Joi.string().valid('entry', 'mid', 'senior').required(),
  location_type: Joi.string().valid('remote', 'on-site', 'hybrid').required(),
  location_city: Joi.string().trim().min(2).max(100).required(),
  salary_min: Joi.number().precision(2).strict().min(0).required(),
  salary_max: Joi.number().precision(2).strict().min(Joi.ref('salary_min')).required(),
  is_salary_visible: Joi.boolean().strict().required(),
  status: Joi.string().valid('open', 'closed').required(),
});

module.exports = {
  JobSchema,
};
