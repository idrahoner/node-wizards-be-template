const mongoose = require('mongoose');
const { constants } = require('../helpers');

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: Object.values(constants.SUBSCRIPTION_PLANS),
    default: constants.SUBSCRIPTION_PLANS.starter,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatarURL: String,
  token: String,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = { UserModel };
