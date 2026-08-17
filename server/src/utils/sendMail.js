const nodemailer = require("nodemailer");
const config = require("../config");

const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email,
            pass: config.emailPassword
        },
    });

    const mailOption = {
        from: config.email,
        to,
        subject,
        text
    }
    return transporter.sendMail(mailOption)
}


module.exports = sendMail