require('dotenv').config();
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')



let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secureConnection: false,
    tls: { ciphers: 'SSLv3' },
    secure:false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})
let transporter1 = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secureConnection: false,
    tls: { ciphers: 'SSLv3' },
    secure:false,
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


async function sendEmail(email,subject,body) {
    data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: body
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function sendOTP(email,otp) {
    data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "OTP Verification",
        template:'otp',
        context:{
            otp: otp,
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function sellerApprove(phone) {
    data = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: "Need seller approval for "+phone,
        template:'SellerRegister',
        context:{
            phone: phone,
        }
    }
    transporter.sendMail(data, function(err, info)
    {
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
        cc:process.env.SMTP_USERNAME_WELCOME,
        subject: "Welcome to Artistokart",
        template:user.role==="user"?'welcomeBuyer':'welcomeSeller',
        context: {
            displayName: user.name,
            email: user.email,
        }
    }
    transporter1.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}


async function paymentEmail(user, message) {
    data = {
        from: process.env.SMTP_USERNAME,
        to: "payment@artistokart.com",
        subject: "Payment Related Query from "+user.name,
        template:'payment',
        context: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            message:message
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}


async function orderEmail(user, message) {
    data = {
        from: process.env.SMTP_USERNAME,
        to: "order@artistokart.com",
        subject: "Order Related Query from "+user.name,
        template:'order',
        context: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            message:message
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function productEmail(user, message) {
    data = {
        from: process.env.SMTP_USERNAME,
        to: "product@artistokart.com",
        subject: "product Related Query from "+user.name,
        template:'product',
        context: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            message:message
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function otherEmail(user, message) {
    data = {
        from: process.env.SMTP_USERNAME,
        to: "others@artistokart.com",
        subject: "Other Query from "+user.name,
        template:'other',
        context: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            message:message
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

async function legalEmail(user, message) {
    data = {
        from: process.env.SMTP_USERNAME,
        to: "legal@artistokart.com",
        subject: "Legal Related Query from "+user.name,
        template:'legal',
        context: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            message:message
        }
    }
    transporter.sendMail(data, function(err, info)
    {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}



module.exports = { sendEmail, sendOTP, sellerApprove, welcomeEmail, paymentEmail, orderEmail, productEmail, otherEmail, legalEmail };
