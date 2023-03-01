const nodemailer = require('nodemailer');

const { NODE_SENDER_EMAIL, NODE_SENDER_PASSWORD, NODEMAILER_PORT, HOST } =
  process.env;

const config = {
  host: 'smtp.meta.ua',
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: NODE_SENDER_EMAIL,
    pass: NODE_SENDER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmailToVerify = async (email, verificationToken) => {
  const verificationLink = `${HOST}/api/users/verify/${verificationToken}`;
  const emailOptions = {
    from: NODE_SENDER_EMAIL,
    to: email,
    subject: 'Verify your email',
    text: `Please follow the link to confirm your email: ${verificationLink}`,
    html: `<strong>Please follow the link to confirm your email: </strong><br><a href="${verificationLink}">${verificationLink}</a>`,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = {
  sendEmailToVerify,
};
