const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown();

module.exports = UserSchema;
