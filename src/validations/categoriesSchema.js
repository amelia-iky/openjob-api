const Joi = require('joi');

const CategorySchema = Joi.object({
  name: Joi.string().strict().required(),
}).unknown();

module.exports = CategorySchema;
