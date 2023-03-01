const { globalHandleError } = require('./global-hanlde-error');
const { validateBody } = require('./validate-body');
const { validateContactId } = require('./validate-contact-id');
const { callController } = require('./call-controller');
const { authMiddleware } = require('./auth-middlelware');
const { uploadAvatar } = require('./upload-avatar');

module.exports = {
  globalHandleError,
  validateBody,
  validateContactId,
  callController,
  authMiddleware,
  uploadAvatar,
};
