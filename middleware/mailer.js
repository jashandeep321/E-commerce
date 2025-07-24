require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendVarifyMail(to_email) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        to: to_email,
        from: process.env.EMAIL_USER,
        subject: "Verify your Mail to continue shopping",
        html: `<h2 style="color:red">Please click on link to verify email id</h2>
               <a href="http://localhost:8082/varifyemail?UEmail=${to_email}">Click here to Verify</a>`
    });
}

module.exports = sendVarifyMail;
