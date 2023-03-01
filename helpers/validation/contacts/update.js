const Joi = require('joi');
const { errorMessages } = require('../messages');
const { PHONE_PATTERN } = require('../../constants');

const update = Joi.object({
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
    .optional()
    .messages({
      ...errorMessages.favoriteWrongType(),
    }),
})
  .min(1)
  .messages({
    ...errorMessages.extraFieldsPresent(),
    ...errorMessages.missedFields(),
    ...errorMessages.isNotObject(),
  });

module.exports = {
  update,
};
