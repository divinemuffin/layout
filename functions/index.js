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

exports.sendMail = functions.https.onRequest((request, response) => {

  let userEmail = (request.body.email) ? request.body.email : gmailEmail;
  // mailTransport.auth.user = userEmail;

  let template = ``;

  for (let key in request.body) {
    template += (`<p><b>${key}: </b>${request.body[key]}</p></br>`)
  }
  console.log("Got mail:",template);

  const mailOptions = {
    from: `NOD user <${userEmail}>`,
    to: `a.moskovchuk@nodeart.io`,
    subject: 'NOD-test feedback',
    html: template
  };

  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error.message);
      response.send(JSON.stringify({error: error.message}));
      return response.status(500);
    } else {
      console.log('Message sent to:', info.envelope.to);
      response.send({data: "ok", envelope: info.envelope, options: mailOptions, body: template});
      response.status(200).end();
    }
  });
});