const { register } = require('./register');
const { login } = require('./login');
const { updateSubscription } = require('./update-subscription');
const { reVerify } = require('./re-verify');

module.exports = {
  register,
  login,
  updateSubscription,
  reVerify,
};
