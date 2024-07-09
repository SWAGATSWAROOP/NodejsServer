const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp-relay.gmail.com",
  port: 587, //port for tranfering mails
  secure: true,
  auth: {
    user: "paridaswagatswaroop@gmail.com",
    pass: "huycknhqzgevybot",
  },
});

// sending mail
const sendMail = async (to_mail) => {
  try {
    await transporter.sendMail({
      from: "paridaswagatswaroop@gmail.com", // sender address
      to: to_mail, // list of receivers
      subject: `Invitation To Join Organisation`, // Subject line
      text: `You have been invited to join`, // plain text body
    });
    return true;
  } catch (error) {
    console.log("Failed to send Mail");
    return false;
  }
};

module.exports = { sendMail };
