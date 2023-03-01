const requiredField = (fieldName) => ({
  'any.required': `missing required ${fieldName} field`,
});

const minLength = (fieldName, minNumber) => ({
  'string.min': `${fieldName} length must be at least ${minNumber} characters long`,
});

const maxLength = (fieldName, maxNumber) => ({
  'string.max': `${fieldName} length must be less than or equal to ${maxNumber} characters long`,
});

const emailNotValid = () => ({
  'string.email': 'email must be valid',
});

const phoneNotValid = () => ({
  'string.pattern.base': 'phone number must be digits',
});

const favoriteWrongType = () => ({
  'boolean.base': 'favorite must be a boolean',
});

const extraFieldsPresent = () => ({
  'object.unknown': 'extra fields are present',
});

const missedFields = () => ({ 'object.min': 'missing fields' });

const isNotObject = () => ({ 'object.base': 'body must be of type object' });

const oneOfRequired = (array) => ({
  'any.only': `subscription must be one of [${array.join(', ')}]`,
});

module.exports = {
  requiredField,
  minLength,
  maxLength,
  emailNotValid,
  phoneNotValid,
  favoriteWrongType,
  extraFieldsPresent,
  missedFields,
  isNotObject,
  oneOfRequired,
};
