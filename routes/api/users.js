const express = require('express');

const { validateBody, callController } = require('../../middlewares');
const { usersSchema } = require('../../helpers');
const { usersCtrl } = require('../../controllers');
const { authMiddleware, uploadAvatar } = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validateBody(usersSchema.register),
  callController(usersCtrl.register)
);

router.get('/verify/:verificationToken', callController(usersCtrl.verify));

router.post(
  '/verify',
  validateBody(usersSchema.reVerify),
  callController(usersCtrl.reVerify)
);

router.post(
  '/login',
  validateBody(usersSchema.login),
  callController(usersCtrl.login)
);

router.post('/logout', authMiddleware, callController(usersCtrl.logout));

router.get('/current', authMiddleware, callController(usersCtrl.current));

router.patch(
  '/',
  authMiddleware,
  validateBody(usersSchema.updateSubscription),
  callController(usersCtrl.updateSubscription)
);

router.patch(
  '/avatars',
  authMiddleware,
  uploadAvatar,
  callController(usersCtrl.updateAvatar)
);

module.exports = router;
