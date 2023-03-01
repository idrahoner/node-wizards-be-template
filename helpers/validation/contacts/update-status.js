const Joi = require('joi');
const { errorMessages } = require('../messages');
const { PHONE_PATTERN } = require('../../constants');

const updateStatus = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .messages({
      ...errorMessages.minLength('name', 3),
      ...errorMessages.maxLength('name', 30),
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional()
    .messages({
      ...errorMessages.emailNotValid(),
    }),
  phone: Joi.string()
    .pattern(PHONE_PATTERN)
    .optional()
    .messages({
      ...errorMessages.phoneNotValid(),
    }),
  favorite: Joi.boolean()
    .required()
    .messages({
      ...errorMessages.requiredField('favorite'),
      ...errorMessages.favoriteWrongType(),
    }),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
});

module.exports = {
  updateStatus,
};
