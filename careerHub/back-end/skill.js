const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

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
  
 app.post('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    if (!name || !level) {
      return res.status(400).json({ error: 'Name and level are required' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.skills.push({ name, level });
    await user.save();

    res.status(201).json({ message: 'Skill added' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract skills array
    const skills = user.skills;

    // Optionally process or format each skill
    const processedSkills = skills.map(skill => {
      // Include the skill _id along with name and level
      return {
        _id: skill._id,
        name: skill.name,
        level: skill.level,
      };
    });

    // Send response with processed skills
    res.status(200).json(processedSkills);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE endpoint to remove a specific skill by skill ID for a specific user
app.delete('/skills/:id', async (req, res) => {
  try {
    const skillId = req.params.id;

    // Find the user who has the skill
    const user = await User.findOne({ 'skills._id': skillId });

    if (!user) {
      return res.status(404).json({ error: 'User with the skill not found' });
    }

    // Remove the skill from the user's skills array
    user.skills = user.skills.filter(skill => skill._id.toString() !== skillId);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lcwufyp2024@gmail.com',
    pass: 'wimuwxtysvzsuciv'
  }
});

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

  // console.log(`Received request for user ID: ${id}`); // Logging user ID

  try {
      const user = await User.findById(id);
      // console.log("user",user)
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      // Log user password and old password for debugging
      // console.log('Provided old password:', oldPassword);

      // Check if old password is correct
      if (user.password !== oldPassword) {
          return res.status(400).json({ error: 'Old password is incorrect' });
      }

      // Update the password
      user.password = newPassword;

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
    try {
        // Check if email is already subscribed
        const existingSubscription = await Subscribe.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Email is already subscribed' });
        }

        // Create a new subscription
        const subscription = new Subscribe({ email });
        await subscription.save();

        res.status(200).json({ message: 'Subscription successful!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to subscribe' });
    }
});

// Route to unsubscribe and delete email
app.delete('/unsubscribe', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the email in the database
        const foundEmail = await Subscribe.findOne({ email });

        if (!foundEmail) {
            return res.status(404).json({ error: 'Email not found' });
        }
        // Delete the email from the database
        await Subscribe.deleteOne({ email });
        return res.json({ message: 'Email unsubscribed successfully' });
    } catch (error) {
        console.error(error);
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
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '1h' }, (err, token) => {  // Adjust token expiration to 1 hour
        if (err) {
            res.send({ Result: "Something went wrong, please try again later" });
        }
        res.send({ result, auth: token });
    });
});

// Login
app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '1h' }, (err, token) => {  // Adjust token expiration to 1 hour
                if (err) {
                    res.send({ Result: "Something went wrong, please try again later" });
                }
                res.send({ user, auth: token });
            });
        } else {
            res.send({ Result: "Incorrect Username or Password" });
        }
    } else {
        res.send({ Result: "Incorrect Username or Password" });
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
        // Update user's password directly without hashing (Consider hashing for security)
        user.password = newPassword;
        // log the password for debugging
        console.log("new password", user.password)

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


// Endpoint to add skills to a user
app.post('/add-skill', async (req, res) => {
  const { skill } = req.body;
  try {
      // Find the logged-in user
      const userId = req.user.user._id; // Assuming user ID is stored in req.user.user._id after JWT verification

      // Find the user by ID and update skills array
      const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { skills: skill } }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'Skill added successfully', user: updatedUser });
  } catch (error) {
      console.error('Error adding skill:', error);
      res.status(500).json({ error: 'Error adding skill' });
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