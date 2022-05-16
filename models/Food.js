const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    default: 'veg',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('food', FoodSchema);
