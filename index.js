//File: index.js

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const LOGGING = process.env.LOGGING === 'true' ? true : false;
const ALLOW_DOMAIN = process.env.ALLOW_DOMAIN || '*';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

//Initialize Resend email client with API key
const resend = new Resend(RESEND_API_KEY);

//Middleware
app.use(cors({
  origin: ALLOW_DOMAIN
}));
app.use(express.json());

/**
 * Takes request body and sends email with data.
 * @param {*} req The request JSON object (name, email, phone, message)
 * @param {*} res The response JSON object (success, message)
 * @example 
 * Request Object:
 *  {
 *    name: "Tyler Durden",
 *    email: "soapguy@paperstreet.com",
 *    phone: "288-555-0153",
 *    message: "We are running low on lye again."
 *  }
 * @example
 * Response Object:
 *  {
 *    success: "true",
 *    message: "📬 Email sent successfully"
 *  }
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

    await resend.emails.send({
      from: 'onboarding@resend.dev', //Required for sending without owning domain
      to: process.env.EMAIL_USER,
      subject: `📬 Portfolio Contact from ${name}`,
      text: `${message}\n\n📧 Email: ${email}\n📱 Phone: ${phone}`,
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