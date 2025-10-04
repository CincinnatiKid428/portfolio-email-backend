//File: index.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const LOGGING = process.env.LOGGING === 'true' ? true : false;
const ALLOW_DOMAIN = process.env.ALLOW_DOMAIN || '*';

//Middleware
app.use(cors({
  origin: ALLOW_DOMAIN
}));
app.use(express.json());

/**
 * Takes request body and sends email with data (name, email, message).
 * @param {*} req The request JSON object
 * @param {*} res The response JSON object
 */
async function handleEmailReq(req, res) {

  //Destructure fields for email from request body
  const { name, email, phone, message } = req.body;

  LOGGING && console.log(`Received email request body data:\n
    name: ${name}
    email:${email}
    phone:${phone}
    message:${message}`);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📬 Portfolio Contact from ${name}`,
      text: `${message}\n* Email: ${email}\n* Phone: ${phone}`,
      replyTo: email
    });

    res.status(200).json({ success: true, message: '📬 Email sent successfully' });
  } catch (err) {
    console.error('🚨 Error sending email:', err);
    res.status(500).json({ success: false, message: `🚨 Error sending email: ${err.message}` });
  }
}

//Http POST endpoint to send email
app.post('/contact', handleEmailReq);

//Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n     📭 Portfolio Email Server listening on port ${PORT}... 📬\n`);
});