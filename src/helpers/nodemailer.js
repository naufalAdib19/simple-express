const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sage.corkery@ethereal.email",
    pass: "gtWbMAq79ds6Hx4JVz",
  },
});

module.exports = transporter;
