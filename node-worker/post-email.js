const nodemailer = require("nodemailer");
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
        from: "TESTING <sender@gmail.com>", // sender address
        to: "evuetaphajoshua@gmail.com", // receiver email
        subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
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

console.log({
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  })


sendReceipt()



module.exports = {
    sendReceipt
}