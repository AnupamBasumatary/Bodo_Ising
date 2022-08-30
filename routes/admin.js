const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Admin = require('../models/Admin');

//Register Admin --POST(/api/admin) --public
router.post(
  '/',
  [
    check('name', 'Please Add Admin Name').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password with atleast 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    console.log(name);

    try {
      console.log('Try block entrance');
      let admin = await Admin.findOne({ email: email });

      console.log(admin);
      if (admin) {
        return res.status(400).json({ msg: 'Admin Email already in use' });
      }

      admin = new Admin({
        name,
        email,
        password,
      });

      console.log(admin);

      const salt = await bcrypt.genSalt(10);

      console.log('salt :' + salt);

      // admin.password = await bcrypt.hash(req.body.password, salt);
      const password1 = await bcrypt.hash(req.body.password, salt);

      console.log('Admin password: ' + password1);

      await admin.save();

      const payload = {
        admin: {
          _id: admin._id,
        },
      };

      jwt.sign(
        payload,
        config.get('adminSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// router.post(
//   '/',
//   [
//     check('name', 'Please Add Admin Name').not().isEmpty(),
//     check('email', 'Please enter a valid Email').isEmail(),
//     check(
//       'password',
//       'Please enter a password with atleast 6 characters'
//     ).isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     try {
//       let admin = await Admin.findOne({ email });
//       if (admin) {
//         return res.status(400).json({ msg: 'Admin Email already in use' });
//       }

//       admin = new Admin({
//         name,
//         email,
//         password,
//       });

//       const salt = await bcrypt.genSalt(10);

//       admin.password = await bcrypt.hash(password, salt);

//       await admin.save();

//       const payload = {
//         admin: {
//           id: admin.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get('adminSecret'),
//         {
//           expiresIn: 3600,
//         },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

module.exports = router;

// const data = await fetch('http://localhost:5000/api/admin', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name,
//         email,
//         password,
//   })
// });

// const res = await data.json();
// console.log(res);
