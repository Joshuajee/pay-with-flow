const nodemailer = require("nodemailer");
const { notification } = require("./email-template/notification");
require("dotenv").config({ path: "./.env" })

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});


const sendReceipt = async (tx_ref, payment) => {

  const options = {
    from: "Flow Merchant Notification", // sender address
    to: "", // receiver email
    subject: "Transaction Received", // Subject line
    text: "message"
    //html: HTML_TEMPLATE(message),
  }

  try {
    const info = await transporter.sendMail(options)
    callback(info);
  } catch (error) {
    console.log(error);
  }

}

const sendNotification = async (payload, email) => {

  const options = {
    from: `Flow Merchant Notification <${process.env.EMAIL_USER}>`, // sender address
    to: email, // receiver email
    subject: "Payment Received", // Subject line
    html: notification(payload),
  }

  try {
    await transporter.sendMail(options)
    console.log("Email sent to " , email)
  } catch (error) {
    console.log(error);
  }

}


module.exports = {
  sendNotification,
  sendReceipt
}