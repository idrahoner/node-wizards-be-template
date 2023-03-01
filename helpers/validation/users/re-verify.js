const Joi = require('joi');
const { errorMessages } = require('../messages');

const reVerify = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...errorMessages.requiredField('email'),
      ...errorMessages.emailNotValid(),
    }),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
});

module.exports = { reVerify };
