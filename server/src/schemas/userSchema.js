const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(8).required(),
});
