const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'NewTechniques';

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('not valid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Hashing Password
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//Generating Tokens
adminSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, secretKey, {
      expiresIn: '1d',
    });

    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    res.status(422).json(error);
  }
};

//Creating model
const adminDb = new mongoose.model('admina', adminSchema);

module.exports = adminDb;
