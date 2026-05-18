const Joi = require('joi');

const CategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
});

module.exports = CategorySchema;
