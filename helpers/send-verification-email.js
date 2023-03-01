const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDER_EMAIL, HOST } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${HOST}/api/users/verify/${verificationToken}`;
  const msg = {
    to: email,
    from: SENDER_EMAIL,
    subject: 'Verify your email',
    text: `Please follow the link to confirm your email: ${verificationLink}`,
    html: `<strong>Please follow the link to confirm your email: </strong><br><a href="${verificationLink}">${verificationLink}</a>`,
  };
  await sgMail.send(msg);
};

module.exports = {
  sendVerificationEmail,
};
