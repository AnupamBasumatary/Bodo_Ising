const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');

//Register User -- POST(/api/users) -- public
router.post(
  '/',
  [
    check('name', 'Please add your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with more than 6 characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

module.exports = router;
