const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');

//Add User Details -- POST(/api/userdet) -- private
router.post('/', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    address3,
    phone,
    packageType,
  } = req.body;

  const UserFields = {};
  if (firstName) UserFields.firstName = firstName;
  if (lastName) UserFields.lastName = lastName;
  if (address1) UserFields.address1 = address1;
  if (address2) UserFields.address2 = address2;
  if (address3) UserFields.address3 = address3;
  if (phone) UserFields.phone = phone;
  if (packageType) UserFields.packageType = packageType;

  try {
    let userDet = await User.findById(req.user.id).select('-password');
    if (!userDet) {
      return res.status(404).json({ msg: 'User Details Not Found, Error!' });
    }

    userDet = await User.findByIdAndUpdate(
      req.user.id,
      { $set: UserFields },
      { new: true }
    );

    res.status(201).json({ status: 201, userDet });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//Update User Details -- PUT(/api/userdet) --private
router.put('/', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    address3,
    phone,
    packageType,
  } = req.body;

  const UserFields = {};
  if (firstName) UserFields.firstName = firstName;
  if (lastName) UserFields.lastName = lastName;
  if (address1) UserFields.address1 = address1;
  if (address2) UserFields.address2 = address2;
  if (address3) UserFields.address3 = address3;
  if (phone) UserFields.phone = phone;
  if (packageType) UserFields.packageType = packageType;

  try {
    let userDet = await User.findById(req.user.id).select('-password');
    if (!userDet) {
      return res.status(404).json({ msg: 'User Details Not Found, Error!' });
    }

    userDet = await User.findByIdAndUpdate(
      req.user.id,
      { $set: UserFields },
      { new: true }
    );

    res.status(201).json({ status: 201, userDet });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
