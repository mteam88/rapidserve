const nodemailer = require("nodemailer");
const APPURL = process.env.APPURL;

console.log(APPURL)
const email_validator = require("email-validator");

// async..await is not allowed in global scope, must use a wrapper

async function nodeMailerMain(targetEmail, targetName, hash) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount().catch((err) => console.log(err))
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.google.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.TSLAUSER,
            pass: process.env.TSLAPASS, 
        },
        tls: {
            rejectUnauthorized:false
        }
    }); //.catch((err) => console.log(err))



    //console.log(testAccount.smtp.host);
    console.log("successfully created transporter");

    let message = {
        from: 'Tsla <tengtsla@gmail.com>',
        to: targetName + ' <' + targetEmail + '>',
        subject: targetName + ', Confirm your email for rapidserve',
        text: 'Please confirm your email by clicking the following link:\n' + APPURL + '/profile/confirm/' + hash,
        html: '<p><b>Hello' + targetName + '</b></p> <br> <p>Please confirm your email by clicking the following link:</p><br>' + APPURL + '/profile/confirm/' + hash
    };

    // send mail with defined transport object
    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        //console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

module.exports = nodeMailerMain