require('dotenv').config();
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')


let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secureConnection: false,
    tls: {ciphers: 'SSLv3'},
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})
let transporter1 = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secureConnection: false,
    tls: {ciphers: 'SSLv3'},
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME_WELCOME,
        pass: process.env.SMTP_PASSWORD
    }
})

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions))
transporter1.use('compile', hbs(handlebarOptions))


async function sendEmail(email, subject, body) {
    data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: body
    }
    transporter.sendMail(data, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function sendOTP(email, otp) {
    data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "OTP Verification",
        template: 'otp',
        context: {
            otp: otp,
        }
    }
    transporter.sendMail(data, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}


async function welcomeEmail(user) {
    // const setting = await Setting.findOne();
    data = {
        from: process.env.SMTP_USERNAME_WELCOME,
        to: user.email,
        cc: process.env.SMTP_USERNAME_WELCOME,
        subject: "Welcome to Artistokart",
        template: user.role === "user" ? 'welcomeBuyer' : 'welcomeSeller',
        context: {
            displayName: user.name,
            email: user.email,
        }
    }
    transporter1.sendMail(data, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}


module.exports = {sendEmail, sendOTP, welcomeEmail};
