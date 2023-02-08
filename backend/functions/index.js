const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const express = require('express');
const cors = require('cors');

// initialize firebase admin
admin.initializeApp();

// set sendgrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// set sendgrid configuration info
const createRecipientConfig = (recipientEmail) => {
  return {
    to: recipientEmail, // Change to your recipient
    from: "mohammadhunan@gmail.com", // Change to your verified sender
    subject: "Test Email 0.0.1 From TicketHero",
    text: "Test Email From TicketHero using SendGrid + Firebase Functions",
    html: "<strong>Test Email From TicketHero" +
     "using SendGrid + Firebase Functions</strong>",
  };
};

exports.helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  admin.auth().listUsers().then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      console.log("user", userRecord.toJSON());
      const recipientEmail = userRecord.email;
      const recipientConfig = createRecipientConfig(recipientEmail);
      sgMail
          .send(recipientConfig)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
    });
    response.send("attempted to send emails to all users");
  });
});

exports.addNewCar = functions.https.onRequest((request, response) => { });

exports.scheduledFunction = functions.pubsub.schedule("every monday 09:00")
    .onRun((_context) => {
      console.log("This will be run every monday at 09:00");
      return null;
    });
