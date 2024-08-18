const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const nodemailer = require('nodemailer');
const User = require("./Models/user");
const { default: mongoose } = require('mongoose');


const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@careerhub.im2qcoj.mongodb.net`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Increase timeout value to 30 seconds
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});


async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    let db = client.db("careerHub")
    const subscriptionCollection = db.collection("subscriptions");
    // const user = db.collection("users");

    // Endpoint to handle subscription
    app.post('/subscribe', async (req, res) => {
      const { email } = req.body;

      try {
        // Check if email is already subscribed
        const existingSubscription = await subscriptionCollection.findOne({ email });
        if (existingSubscription) {
          return res.status(400).json({ error: 'Email already subscribed' });
        }

        // Create new subscription
        await subscriptionCollection.insertOne({ email, subscribed: true });
        return res.status(201).json({ message: 'Thank you for Subscribing' });
      } catch (error) {
        console.error("Error subscribing:", error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Endpoint to handle unsubscribe
    app.get('/unsubscribe', async (req, res) => {
      const email = req.query.email; // Assuming email is passed as a query parameter

      try {
        // Update subscription status to unsubscribe
        await subscriptionCollection.updateOne({ email }, { $set: { subscribed: false } });
        return res.redirect('http://yourfrontendurl.com/unsubscribed'); // Redirect to a page confirming unsubscription
      } catch (error) {
        console.error("Error unsubscribing:", error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });


    // Endpoint to send emails
    app.get('/send-mails', async (req, res) => {
      res.status(200).json({ message: 'Emails sent successfully' });

      // Fetch all subscribed users' emails from the database
      const subscribedUsers = await subscriptionCollection.find({ subscribed: true }).toArray();
      if (subscribedUsers.length === 0) {
        console.log("No subscribed users found");
        return res.status(404).json({ error: 'No subscribed users found' });
      }
      // Prepare email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lcwufyp2024@gmail.com',
          pass: 'swragilalvubeedf'
        }
      });

      // Prepare and send emails to each subscribed user
      const emailsPromises = subscribedUsers.map(async (user) => {
        const mailOptions = {
          from: 'lcwufyp2024@gmail.com',
          to: user.email,
          subject: 'Your Subscription Update',
          text: 'Hello! Thank you for subscribing to our newsletter.'
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            resolve({ response: info.response });
          });
        });
      });

      // Wait for all emails to be sent
      const emailResults = await Promise.all(emailsPromises);
      console.log(`Email ${index + 1} sent: ${result}`);
      //  Log email sending results
      emailResults.forEach((result, index) => {
        console.log(`Email ${index + 1} sent: ${result.response}`);
      });
      res.status(200).json({ message: 'Emails sent successfully' });

    });


    // signup
    app.post('/register', async (req, resp) => {

      console.warn("done")

      let user = new User(req.body);
       let result = await user.save();
      resp.send(result);
    })
    // app.post('/register', async (req, resp) => {

    //    resp.send('done');
    //   // let user = new User(req.body);
    //   // let result = await user.save();
    //   // // use to unshow password
    //   // result = result.toObject();
    //   // delete result.password;

    //   // Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    //   //     if (err) {
    //   //         resp.send({ Result: "Something went wrong, please try again later" })
    //   //     }
    //   //     resp.send({ result, auth: token })
    //   // })
    //   // resp.send(result);

    // })


    // login Api
    // app.post('/login', async (req, resp) => {
    //   // console.log(req.body)
    //   if (req.body.email && req.body.password) {
    //       let user = await User.findOne(req.body).select('-password');
    //       if (user) {
    //           Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    //               if (err) {
    //                   resp.send({ Result: "Something went wrong, please try again later" })
    //               }
    //               resp.send({ user, auth: token })
    //           })

    //       } else {
    //           resp.send({ Result: "No user found" })
    //       }
    //   } else {
    //       resp.send({ Result: "No user found" })
    //   }
    // })

  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
}

// auth token
// function verifyToken(req, resp, next) {
//   let token = req.headers['authorization']
//   if (token) {
//       token = token.split(' ')[1];
//       console.warn('middleware called', token);
//       Jwt.verify(token, jwtKey, (err, valid) => {
//           if (err) {
//               resp.status(401).send({ Result: "Please provide valid token" })
//           } else {
//               next();
//           }
//       })

//   } else {
//       resp.status(403).send({ Result: "Please add token with header" })
//   }
//   //   console.warn('middleware called',token);
// }
run();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});






