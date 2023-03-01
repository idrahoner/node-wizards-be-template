const Joi = require('joi');
const { errorMessages } = require('../messages');

const login = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...errorMessages.requiredField('email'),
      ...errorMessages.emailNotValid(),
    }),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      ...errorMessages.requiredField('password'),
      ...errorMessages.minLength('name', 6),
      ...errorMessages.maxLength('name', 30),
    }),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
});

module.exports = { login };
