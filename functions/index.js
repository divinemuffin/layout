'use strict';
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email || "email";
const gmailPassword = functions.config().gmail.password || "password";

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {

  let template = ``;

  for (let key in req.body) {
    template += (`<p><b>${key}: </b>${req.body[key]}</p>`)
  }
  console.log("Got mail:",template);

  const mailOptions = {
    from: `NOD user <${gmailEmail}>`,
    to: `a.moskovchuk@nodeart.io`,
    subject: 'NOD-test feedback',
    html: template
  };

  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error.message);
      res.send(JSON.stringify({error: error.message}));
      return res.status(500);
    } else {
      console.log('Message sent to:', info.envelope.to);
      res.send({data: "ok"});
      res.status(200).end();
    }
  });
});