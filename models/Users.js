const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  address3: {
    type: String,
  },
  phone: {
    type: String,
  },
  packageType: {
    type: String,
    default: 'standard',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
