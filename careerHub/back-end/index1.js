const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const validator = require('validator'); 


const User = require("./Models/user");
const Subscribe = require("./Models/subscribe");


const jwtKey = 'careerHub';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

const convertToPST = (date) => {
  return moment(date).tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss');
};

const connectionString = "mongodb+srv://lcwufyp2024:j3eGUlX58KhEeBg4@careerhub.im2qcoj.mongodb.net/careerHub?retryWrites=true&w=majority";
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lcwufyp2024@gmail.com',
    pass: 'wimuwxtysvzsuciv'
  }
});

//  transporter.sendMail({
//   from: 'lcwufyp2024@gmail.com',
//   to: 'shamzahanif10@gmail.com',
//   subject: 'Latest updates',
//   html: `<p>Thank you for subscribing!</p>
//          <p>If you wish to unsubscribe, click <a href="">here</a>.</p>`
// });

// update profile
app.put('/profile/:id', upload.single('profilePicture'), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const profilePicture = req.file;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    if (profilePicture) {
      const filename = `${user._id}_${Date.now()}_${profilePicture.originalname}`;
      const filePath = path.join('uploads', filename);

      // Move the file to the destination directory
      fs.renameSync(profilePicture.path, filePath);
      user.profilePicture = filePath;

      // Convert image to base64
      const imageBuffer = fs.readFileSync(filePath);
      const base64Image = imageBuffer.toString('base64');
      user.profilePicture = `data:${profilePicture.mimetype};base64,${base64Image}`;
    }

    await user.save();
    res.json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || null,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// delete profilepicture
app.delete('/profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the profilePicture field directly
        await User.updateOne({ _id: id }, { $set: { profilePicture: null } });
        res.status(200).json({ message: 'Profile picture removed successfully' });
    } catch (error) {
        console.error('Error removing profile picture:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// change password
app.put('/profile/change-password/:id', async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare old password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Endpoint to subscribe
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
      // Check if email is already subscribed
      const existingSubscription = await Subscribe.findOne({ email });

      if (existingSubscription) {
          return res.status(400).json({ error: 'Email is already subscribed' });
      }

      // Create a new subscription
      const subscription = new Subscribe({ email });
      await subscription.save();

      // Generate unsubscribe link
      const unsubscribeLink = `http://localhost:5173/unsubscribe?email=${encodeURIComponent(email)}`;


      // Send confirmation email
      await transporter.sendMail({
          from: 'lcwufyp2024@gmail.com',
          to: email,
          subject: 'Subscription Confirmation',
          html: `<p>Thank you for subscribing!</p>
                 <p>If you wish to unsubscribe, click <a href="${unsubscribeLink}">here</a>.</p>`
      });

      res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: 'Failed to subscribe' });
  }
});


app.delete('/unsubscribe', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
      // Find the email in the database
      const foundEmail = await Subscribe.findOne({ email });

      if (!foundEmail) {
          return res.status(404).json({ error: 'Email not found' });
      }

      // Delete the email from the database
      await Subscribe.deleteOne({ email });
      return res.status(200).json({ message: 'Email unsubscribed successfully' });
  } catch (error) {
      console.error('Unsubscribe error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to check if email exists
app.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            return res.status(200).json({ success: true, message: 'Email exists' });
        } else {
            return res.status(404).json({ success: false, message: 'Email does not exist' });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Signup 
app.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with a salt rounds of 10
      let user = new User({ ...req.body, password: hashedPassword });
      let result = await user.save();
      result = result.toObject();
      delete result.password;

      Jwt.sign({ result }, jwtKey, { expiresIn: '1h' }, (err, token) => {  // Adjust token expiration to 1 hour
          if (err) {
              return res.status(500).send({ Result: "Something went wrong, please try again later" });
          }
          res.send({ result, auth: token });
      });
  } catch (error) {
      res.status(500).send({ Result: "Error registering user" });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
      if (req.body.email && req.body.password) {
          let user = await User.findOne({ email: req.body.email });
          if (user && await bcrypt.compare(req.body.password, user.password)) { // Compare hashed passwords
              const userWithoutPassword = user.toObject();
              delete userWithoutPassword.password;

              Jwt.sign({ user: userWithoutPassword }, jwtKey, { expiresIn: '1h' }, (err, token) => {  // Adjust token expiration to 1 hour
                  if (err) {
                      return res.status(500).send({ Result: "Something went wrong, please try again later" });
                  }
                  res.send({ user: userWithoutPassword, auth: token });
              });
          } else {
              res.status(401).send({ Result: "Incorrect Username or Password" });
          }
      } else {
          res.status(400).send({ Result: "Email and password required" });
      }
  } catch (error) {
      res.status(500).send({ Result: "Error logging in" });
  }
});


// Forgot password
app.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user with that email address' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 900000; // 15 minutes
        await user.save();

        console.log('Saved token and expiry:', token, user.resetPasswordExpires);

        const resetUrl = `http://localhost:5173/reset_password/${token}`;

        const mailOptions = {
            from: 'lcwufyp2024@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            html: `
                <h1>Password Reset</h1>
                <p>You are receiving this because you (or someone else) have requested to reset the password for your account.</p>
                <p>Please click on the following link, or paste it into your browser to complete the process:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ error: 'Error sending reset email' });
    }
});

// Reset password
app.post('/reset_password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        console.log('Received token:', token);

        // Find the user with the provided token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        // Log the user object for debugging
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password with the hashed password
        user.password = hashedPassword;

        // Clear the reset token and expiry
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password. Please try again later.' });
    }
});




// Function to verify token
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ result: "Please add token with header" });
    }
}

// MongoDB setup for job-related routes
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://lcwufyp2024:j3eGUlX58KhEeBg4@careerhub.im2qcoj.mongodb.net/?retryWrites=true&w=majority&appName=CareerHub";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
  console.log("Connected to MongoDB");
  
  const db = client.db("careerHub");
  const jobsCollection = db.collection("job");

 // post a job
app.post('/jobs/post-job', async (req, res) => {
  const body = req.body;
  body.createdAt = new Date();
  try {
      const result = await jobsCollection.insertOne(body);
      if (result.insertedId) {
          res.status(200).send(result);
      } else {
          res.status(404).send({
              message: "Cannot insert! Try again later!",
              status: false
          });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send({
          message: "An error occurred while inserting the job.",
          status: false
      });
  }
});


  // get all jobs
  app.get("/all-jobs", async (req, res) => {
    const jobs = await jobsCollection.find({}).toArray();
    res.send(jobs);
  });

  // get single job using id
  app.get("/all-jobs/:id", async (req, res) => {
    const id = req.params.id;
    const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
    // console.log("id",job)
    res.send(job);
  });

  // get job by email
  app.get("/myJobs/:email", async (req, res) => {
    const jobs = await jobsCollection.find({ postedBy: req.params.email }).toArray();
    res.send(jobs);
  });
  
  // Endpoint to fetch jobs posted by a user
/* app.get('/my-jobs', verifyToken, async (req, res) => {
  try {
      const userEmail = req.user.user.email; // Assuming user email is stored in req.user.user.email after JWT verification

      // Find jobs posted by the user's email
      const jobs = await jobsCollection.find({ postedBy: userEmail }).toArray();

      res.status(200).json(jobs);
  } catch (error) {
      console.error('Error fetching user jobs:', error);
      res.status(500).json({ error: 'Error fetching user jobs' });
  }
});
*/

  // delete job
  app.delete("/job/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {
      const result = await jobsCollection.deleteOne(filter);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "An error occurred while deleting the job.",
        status: false
      });
    }
  });

  // update a job
  app.patch("/update-job/:id", async (req, res) => {
    const id = req.params.id;
    const jobData = req.body;
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const updateDoc = {
      $set: {
        ...jobData
      },
      $setOnInsert: {
        createAt: new Date()
      }
    };
    try {
      const result = await jobsCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "An error occurred while updating the job.",
        status: false
      });
    }
  });

// Function to fetch company email by jobId
const getCompanyDetails = async (jobId) => {
  try {
      console.log('Received jobId:', jobId);

      if (!ObjectId.isValid(jobId)) {
          console.error('Invalid jobId format:', jobId);
          throw new Error('Invalid jobId format');
      }

      const jobObjectId = new ObjectId(jobId);
      console.log('Searching for job with ID:', jobObjectId);
      const job = await jobsCollection.findOne({ _id: jobObjectId });

      if (!job) {
          console.error('Job not found for ID:', jobObjectId);
          throw new Error('Job not found');
      }

      if (!job.postedBy) {
          console.error('Company email not found for job ID:', jobObjectId);
          throw new Error('Company email not found');
      }

      return { email: job.postedBy, name: job.companyName || 'the company' };
  } catch (error) {
      console.error('Error fetching company details:', error);
      throw new Error('Error fetching company details');
  }
};

// send emails to company and applicant
app.post('/apply', upload.single('cvFile'), async (req, res) => {
  try {
      const { jobId, name, email, phone, address, education, experience, availableNow } = req.body;
      const cvFile = req.file;  // Check if a file is uploaded

      console.log('Received jobId in apply route:', jobId);

      if (!education || !experience) {
          return res.status(400).json({ message: 'Education and Experience data is required.' });
      }

      const educationData = JSON.parse(education);
      const experienceData = JSON.parse(experience);

      const { email: companyEmail, name: companyName } = await getCompanyDetails(jobId);

      if (!companyEmail) {
          return res.status(500).json({ message: 'Company email is not available.' });
      }

      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'lcwufyp2024@gmail.com',
              pass: 'wimuwxtysvzsuciv'
          }
      });

      // Base mail options for company
      let mailOptionsForCompany = {
          from: 'lcwufyp2024@gmail.com',
          to: companyEmail,
          subject: `New Job Application Received at ${companyName}`,
          text: `A new application has been received for the job ID ${jobId} at ${companyName}. Here are the details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nEducation: ${JSON.stringify(educationData)}\nExperience: ${JSON.stringify(experienceData)}\nAvailable Now: ${availableNow}\n\nBest regards`
      };

      // Add CV attachment if available
      if (cvFile) {
          mailOptionsForCompany.attachments = [
              {
                  filename: cvFile.originalname,
                  path: cvFile.path
              }
          ];
      }

      await transporter.sendMail(mailOptionsForCompany);

      let mailOptionsForApplicant = {
          from: 'lcwufyp2024@gmail.com',
          to: email,
          subject: 'Application Received',
          text: `Dear ${name},\n\nThank you for applying for the position at ${companyName}. Your application has been received successfully. We will get back to you soon.\n\nBest regards,\n${companyName}`
      };

      await transporter.sendMail(mailOptionsForApplicant);

      // Remove the uploaded file after sending the email, if it exists
      if (cvFile) {
          fs.unlink(cvFile.path, (err) => {
              if (err) {
                  console.error('Error removing the CV file:', err);
              }
          });
      }

      res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
      console.error('Error processing application:', error);
      res.status(500).json({ message: 'Error processing application.' });
  }
});


}).catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});