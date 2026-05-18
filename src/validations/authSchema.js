const Joi = require('joi');

const AuthSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().strict().min(6).required(),
});

module.exports = AuthSchema;
