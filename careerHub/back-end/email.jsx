// var nodemailer = require('nodemailer');
// require('dotenv').config();

// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Connection URL
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@careerhub.im2qcoj.mongodb.net`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // Connect to MongoDB
// client.connect(function(err) {
//   if (err) {
//     console.error("Error connecting to MongoDB:", err);
//     return;
//   }
  
//   console.log("Connected successfully to MongoDB");

//   // Get the database
//   var db = client.db(CareerHub);

//   // Retrieve email addresses from MongoDB
//   db.collection('emails').find({}).toArray(function(err, result) {
//     if (err) {
//       console.error("Error retrieving emails from MongoDB:", err);
//       client.close();
//       return;
//     }

//     // Close the MongoDB connection
//     client.close();

//     // Create a transporter
//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'lcwufyp2024@gmail.com',
//         pass: 'swragilalvubeedf'
//       }
//     });

//     // Prepare mail options
//     var mailOptions = {
//       from: 'lcwufyp2024@gmail.com',
//       // Concatenate email addresses retrieved from MongoDB
//       to: result.map(entry => entry.email).join(', '), 
//       subject: 'Sending Email using Node.js',
//       text: 'That was easy!'
//     };

//     // Send mail
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   });
// });



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lcwufyp2024@gmail.com',
    pass: 'swragilalvubeedf '
  }
});

var mailOptions = {
  from: 'lcwufyp2024@gmail.com',
  to: 'faiqaasghar02@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});





