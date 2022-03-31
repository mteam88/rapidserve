const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const APPURL = process.env.APPURL;

console.log(APPURL)
const email_validator = require("email-validator");

// async..await is not allowed in global scope, must use a wrapper
const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });
  
    return transporter;
  };

async function nodeMailerMain(targetEmail, targetName, hash) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount().catch((err) => console.log(err))
    // create reusable transporter object using the default SMTP transport

    let transporter = createTransporter(); //.catch((err) => console.log(err))



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