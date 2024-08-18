const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const skillSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: Number,
//     required: true,
//   }
// });

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  oldPassword: {
    type: String,
  },
  newPassword: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  profilePicture: {
    type: String,
    required: false,
  }
  // skills: [skillSchema],
  // resetPasswordToken: String,
  // resetPasswordExpires: Date,
});

module.exports = mongoose.model('users', userSchema);
