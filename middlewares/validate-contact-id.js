const mongoose = require('mongoose');
const { generateError, responseErrors } = require('../helpers');

const validateContactId = (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.isValidObjectId(contactId)) {
      throw generateError(responseErrors.notFound);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateContactId,
};
