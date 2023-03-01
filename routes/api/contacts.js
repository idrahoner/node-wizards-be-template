const express = require('express');

const {
  validateBody,
  validateContactId,
  callController,
} = require('../../middlewares');
const { contactsSchema } = require('../../helpers');

const { contactsCtrl } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const router = express.Router();

router.use(authMiddleware);

router.get('/', callController(contactsCtrl.getAll));

router.get(
  '/:contactId',
  validateContactId,
  callController(contactsCtrl.getById)
);

router.post(
  '/',
  validateBody(contactsSchema.add),
  callController(contactsCtrl.add)
);

router.delete(
  '/:contactId',
  validateContactId,
  callController(contactsCtrl.remove)
);

router.put(
  '/:contactId',
  validateContactId,
  validateBody(contactsSchema.update),
  callController(contactsCtrl.update)
);

router.patch(
  '/:contactId/favorite',
  validateContactId,
  validateBody(contactsSchema.updateStatus),
  callController(contactsCtrl.update)
);

module.exports = router;
