const Joi = require('joi');

const JobSchema = Joi.object({
  category_id: Joi.string().length(13).required(),
  company_id: Joi.string().length(13).required(),
  title: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(10).required(),
  job_type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required(),
  experience_level: Joi.string().valid('entry', 'mid', 'senior').required(),
  location_type: Joi.string().valid('remote', 'onsite', 'hybrid').required(),
  location_city: Joi.string().trim().min(2).max(100).required(),
  salary_min: Joi.number().precision(2).strict().min(0).required(),
  salary_max: Joi.number().precision(2).strict().min(Joi.ref('salary_min')).required(),
  is_salary_visible: Joi.boolean().strict().required(),
  status: Joi.string().valid('open', 'closed').required(),
});

const UpdateJobSchema = Joi.object({
  company_id: Joi.string().length(13),
  category_id: Joi.string().length(13),
  title: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim(),
  job_type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship'),
  experience_level: Joi.string().valid('entry', 'mid', 'senior'),
  location_type: Joi.string().valid('remote', 'onsite', 'hybrid'),
  location_city: Joi.string().trim(),
  salary_min: Joi.number().precision(2).min(0),
  salary_max: Joi.number().precision(2).min(0),
  status: Joi.string().valid('draft', 'published', 'closed'),
}).min(1);

module.exports = {
  JobSchema,
  UpdateJobSchema,
};
