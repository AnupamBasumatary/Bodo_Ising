const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');
const UserDet = require('../models/UserDet');

//Get User Details-- GET(/api/userdet) -- private
router.get('/', auth, async (req, res) => {
  try {
    const details = await UserDet.find({ user: req.user.id });
    res.json(details);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//Add User Details -- POST(/api/userdet) -- private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('address1', 'Address Line 1 is required').not().isEmpty(),
      check('phone', 'phone number is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      address1,
      address2,
      address3,
      phone,
      package,
    } = req.body;

    try {
      const newUserDet = new UserDet({
        firstName,
        lastName,
        address1,
        address2,
        address3,
        phone,
        package,
        user: req.user.id,
      });

      const userDetails = await newUserDet.save();
      res.json(userDetails);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Update User Details -- PUT(/api/userdet) --private
router.put('/:id', (req, res) => {
  res.send('update user details');
});

//Delete User -- DELETE(/api/userdet) --private
router.delete('/:id', (req, res) => {
  res.send('Delete user');
});

module.exports = router;
