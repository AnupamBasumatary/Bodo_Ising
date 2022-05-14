const mongoose = require('mongoose');

const PreFoodSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  day: {
    lunch: {
      addon: { type: String },
      thali: { type: String },
      drinks: { type: String },
    },
    dinner: {
      addon: { type: String },
      thali: { type: String },
      drinks: { type: String },
    },
  },

  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('preSelectedFood', PreFoodSchema);
