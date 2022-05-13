const mongoose = require('mongoose');

const UserDetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  address3: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    default: 'standard',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('userDet', UserDetSchema);
