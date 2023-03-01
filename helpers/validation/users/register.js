const Joi = require('joi');
const { SUBSCRIPTION_PLANS } = require('../../constants');
const { errorMessages } = require('../messages');

const availablePlans = Object.values(SUBSCRIPTION_PLANS);

const register = Joi.object({
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
  subscription: Joi.string().valid(...availablePlans),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
  ...errorMessages.oneOfRequired(availablePlans),
});

module.exports = { register };
