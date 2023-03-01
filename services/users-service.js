const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { UserModel } = require('../models');
const {
  generateError,
  responseErrors,
  constants,
  saveAvatarToStorage,
  sendEmailToVerify,
} = require('../helpers');

const { JWT_SECRET_KEY } = process.env;

const register = async ({ email, password, subscription } = {}) => {
  const isEmailExisted = await UserModel.findOne({ email });
  if (isEmailExisted) throw generateError(responseErrors.emailUsed);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await UserModel.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL: gravatar.url(email),
    verificationToken,
  });

  await sendEmailToVerify(email, verificationToken);

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  };
};

const verify = async (verificationToken) => {
  const user = await UserModel.findOne({ verificationToken });
  if (!user) throw generateError(responseErrors.notFound);
  await UserModel.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  return { message: 'Verification successful' };
};

const reVerify = async (email) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw generateError(responseErrors.notFound);
  if (user.verify) throw generateError(responseErrors.verified);

  await sendEmailToVerify(email, user.verificationToken);

  return {
    message: 'Verification email sent',
  };
};

const login = async ({ email, password } = {}) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw generateError(responseErrors.unauthorized);
  if (!user.verify) throw generateError(responseErrors.verifyEmail);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw generateError(responseErrors.unauthorized);

  const token = jwt.sign({ userId: user._id.valueOf() }, JWT_SECRET_KEY);
  const updatedUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    constants.DEFAULT_UPDATE_OPTIONS
  );
  return {
    token: updatedUser.token,
    user: { email: updatedUser.email, subscription: updatedUser.subscription },
  };
};

const logout = async (user) => {
  await UserModel.findByIdAndUpdate(user._id, { token: null });
};

const updateUserStatus = async ({ subscription } = {}, userId) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { subscription },
    constants.DEFAULT_UPDATE_OPTIONS
  );
  return { email: updatedUser.email, subscription: updatedUser.subscription };
};

const updateUserAvatar = async (file, userId) => {
  await saveAvatarToStorage(file);
  const { avatarURL } = await UserModel.findByIdAndUpdate(
    userId,
    { avatarURL: `/avatars/${file.filename}` },
    constants.DEFAULT_UPDATE_OPTIONS
  );
  return { avatarURL };
};

module.exports = {
  register,
  verify,
  reVerify,
  login,
  logout,
  updateUserStatus,
  updateUserAvatar,
};
