const Joi = require('joi');

const AuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown();

module.exports = AuthSchema;
