// const nodemailer = require("nodemailer");
// const sendEmail = function sendEmail(to) {
//   //function to send email
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.email,
//       pass: process.env.password
//     },
//   });
//   const mailOptions = {
//     from: process.env.email,
//     to: to,
//     subject: "Registered for CINE'22",
//     text: `Team CSI congratulates you for being successfully registered for CINE'22. Brace yourself, fasten your seatbelts, polish your skills, and be ready for the most exciting recruitment drive.

//     Mode: Offline
//     Date: 19 Sept 2022
//     Time: 4pm-6pm
//     Venue: Basic IT Lab( CSIT Block)
//     Stay Tuned to our Instagram page for further information.
//     https://www.instagram.com/csi_akgec/
//     Regards,
//     Team CSI`
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(info.response);
//     }
//   });
// };

// module.exports = sendEmail;