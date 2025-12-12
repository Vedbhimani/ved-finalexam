const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  // property names required by the exam
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
