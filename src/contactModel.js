const nodemailer = require("nodemailer");
require('dotenv').config();
const { validate } = require('../src/functions');
const requiredfields = ['from', 'to', 'subject', 'text'];
const tablename = "contact";

const config = {
    service: process.env.NOTIFICATION_SERVICE || 'gmail',
    host: process.env.NOTIFICATION_HOST || "localhost",
    port: process.env.NOTIFICATION_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NOTIFICATION_USER,
        pass: process.env.NOTIFICATION_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
}

function sendEmail(body) {
    return new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport(config);
        const isValid = validate([body], requiredfields);
        if (!isValid) return reject(`Error, revise los campos requeridos de ${tablename}: ${requiredfields.join(', ')}`);
        return resolve(transporter.sendMail(body));
    });
}

module.exports = {
  sendEmail,
}