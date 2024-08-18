// const mongoose  = require("mongoose")

// const subscriptionSchema = new mongoose.Schema ({
//     email: String,
//     // subscribed: { type: Boolean, default: true } // Defaulting to true when a new subscription is added
// });

// module.exports = mongoose.model("subscriptions", subscriptionSchema);


// models/Subscription.js

const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true

  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  subscribed: {
    type: Boolean,
    default: true
  }
});

const Subscribe = mongoose.model('subscriptions', subscribeSchema);

module.exports = Subscribe;
