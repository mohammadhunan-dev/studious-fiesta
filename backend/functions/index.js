/* eslint-disable camelcase */
/* eslint-disable max-len */


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore");
const sgMail = require("@sendgrid/mail");
const express = require("express");
const cors = require("cors");

// initialize firebase admin
admin.initializeApp();

// get the firestore database
const db = getFirestore();

// initialize the express app
const app = express();
// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// set sendgrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// set sendgrid configuration info
const createRecipientConfig = (recipientEmail, message) => {
  return {
    to: recipientEmail, // Change to your recipient
    from: "mohammadhunan@gmail.com", // Change to your verified sender
    subject: "Test Email 0.0.3 From TicketHero",
    text: message,
    html: `<strong>${message}</strong>`,
  };
};

// exports.helloWorld = functions.https.onRequest((_request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   admin.auth().listUsers().then((listUsersResult) => {
//     listUsersResult.users.forEach((userRecord) => {
//       console.log("user", userRecord.toJSON());
//       const recipientEmail = userRecord.email;
//       const recipientConfig = createRecipientConfig(recipientEmail);
//       sgMail
//           .send(recipientConfig)
//           .then(() => {
//             console.log("Email sent");
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//     });
//     response.send("attempted to send emails to all users");
//   });
// });


// Register a new car
// Adds the car to the database
// Sends an email to the user that the car has been added
// with a note saying that you can view a list of tickets in the app
app.post("/new", (req, res) => {
  const {user_id, carName, carLicensePlate} = req.body;

  const docRef = db.collection("Cars").doc(carName);
  docRef.set({
    user_id: user_id,
    carName,
    carLicensePlate,
  })
      .then(async function() {
        // get the user email
        admin.auth().getUser(user_id)
            .then((userRecord) => {
              const recipientEmail = userRecord.email;

              console.log("recipientEmail", recipientEmail);
              const message = `${carName} has been added to your account`;
              const recipientConfig = createRecipientConfig(recipientEmail, message);
              sgMail
                  .send(recipientConfig)
                  .then(() => {
                    console.log("Email sent");
                  })
                  .catch((error) => {
                    console.error(error);
                  });

              res.send("Car added successfully, and email sent",
                  docRef.id, docRef.carName);
            });
      })
      .catch((error) => {
        res.send("Error adding car: ", error);
      });
});

// get cars by user id
app.get("/:uid", (req, res) => {
  const {uid} = req.params;
  const cars = [];
  db.collection("Cars")
      .where("user_id", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cars.push(doc.data());
        });
        res.send(cars);
      })
      .catch((error) => {
        res.send("Error getting cars: ", error);
      });
});

// Expose Express API as a single Cloud Function:
exports.cars = functions.https.onRequest(app);


// weekly scheduled email
exports.scheduledFunction = functions.pubsub.schedule("every monday 09:00")
    .onRun((_context) => {
      console.log("This will be run every monday at 09:00");
      admin.auth().listUsers()
          .then((listUsersResult) => {
            listUsersResult.forEach((userRecord) => {
              const recipientEmail = userRecord.email;
              const message = "Todo: add message";
              const recipientConfig = createRecipientConfig(recipientEmail, message);

              sgMail
                  .send(recipientConfig)
                  .then(() => {
                    console.log("Email sent to ", recipientEmail);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
            });
          })
          .catch((error) => {
            console.error("Error getting users: ", error);
          });

      return null;
    });

exports.scheduledFunctionEveryTwoMinutes = functions.pubsub.schedule("every 2 minutes")
    .onRun((_context) => {
      console.log("This will be run every 2 minutes");
      admin.auth().listUsers()
          .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
              const recipientEmail = userRecord.email;
              const message = "Todo: add message";
              const recipientConfig = createRecipientConfig(recipientEmail, message);

              sgMail
                  .send(recipientConfig)
                  .then(() => {
                    console.log("Email sent to ", recipientEmail);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
            });
          })
          .catch((error) => {
            console.error("Error getting users: ", error);
          });

      return null;
    });


// exports.helloWorld = functions.https.onRequest((_request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   admin.auth().listUsers().then((listUsersResult) => {
//     listUsersResult.users.forEach((userRecord) => {
//       const recipientEmail = userRecord.email;
//       const recipientConfig = createRecipientConfig(recipientEmail);
//       sgMail
//           .send(recipientConfig)
//           .then(() => {
//             console.log("Email sent");
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//     });
//     response.send("attempted to send emails to all users");
//   });
// });
