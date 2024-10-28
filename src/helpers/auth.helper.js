const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// const mailSender = async (email, title, body) => {
//   try {
//     // Create a Transporter to send emails
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: 587,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });
//     // Send emails to users
//     let info = await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: title,
//       html: body,
//     });
//     console.log('Email info: ', info);
//     return info;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = transporter;
