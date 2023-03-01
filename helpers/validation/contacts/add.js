const Joi = require('joi');
const { errorMessages } = require('../messages');
const { PHONE_PATTERN } = require('../../constants');

const add = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      ...errorMessages.requiredField('name'),
      ...errorMessages.minLength('name', 3),
      ...errorMessages.maxLength('name', 30),
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      ...errorMessages.requiredField('email'),
      ...errorMessages.emailNotValid(),
    }),
  phone: Joi.string()
    .pattern(PHONE_PATTERN)
    .required()
    .messages({
      ...errorMessages.requiredField('phone'),
      ...errorMessages.phoneNotValid(),
    }),
  favorite: Joi.boolean()
    .optional()
    .messages({
      ...errorMessages.favoriteWrongType(),
    }),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
});

module.exports = {
  add,
};
