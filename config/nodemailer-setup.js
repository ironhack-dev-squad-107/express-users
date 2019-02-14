// Routes that need to SEND EMAILS will require this file

const nodemailer = require("nodemailer");

// nodemailer transport objects have the methods for sending emails
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASS
  }
});

// we will call this function from a ROUTE
function sendSignupMail(userDoc) {
  // return the PROMISE that sendMail() gives (for then() & catch() in the route)
  return transport.sendMail({
    from: "Express Users <express.users@example.com>",
    to: `${userDoc.fullName} <${userDoc.email}>`,
    subject: "😎 Thank you for joining Express Users",
    text: `Welcome, ${
      userDoc.fullName
    }! Thank you for joining the Express Users family.`,
    html: `
      <h1 style="color: orange;">Welcome, ${userDoc.fullName}!</h1>
      <p style="font-style: italic;">Thank you for joining the Express Users family.</p>
    `
  });
}

function sendPassportMail() {
  return transport.sendMail({
    from: "Express Users <express.users@example.com>",
    to: "Mr. Blah <blah@example.com>",
    subject: "🤦‍♀️ Don't forget your password",
    text: "Don't be dumb and forget your password.",
    html:
      "<h1 style='color: orange;'>Don't be dumb and forget your password.</h1>"
  });
}

module.exports = { sendSignupMail, sendPassportMail };
