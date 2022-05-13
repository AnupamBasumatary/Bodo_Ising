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
router.post('/', (req, res) => {
  res.send('add user details');
});

//Update User Details -- PUT(/api/userdet) --private
router.put('/:id', (req, res) => {
  res.send('update user details');
});

//Delete User -- DELETE(/api/userdet) --private
router.delete('/:id', (req, res) => {
  res.send('Delete user');
});

module.exports = router;
