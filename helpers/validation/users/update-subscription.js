const Joi = require('joi');
const { SUBSCRIPTION_PLANS } = require('../../constants');
const { errorMessages } = require('../messages');

const availablePlans = Object.values(SUBSCRIPTION_PLANS);

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...availablePlans)
    .required()
    .messages({ ...errorMessages.requiredField('subscription') }),
}).messages({
  ...errorMessages.extraFieldsPresent(),
  ...errorMessages.isNotObject(),
  ...errorMessages.oneOfRequired(availablePlans),
});

module.exports = { updateSubscription };
