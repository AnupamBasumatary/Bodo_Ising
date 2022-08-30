const express = require('express');
const router = new express.Router();
const adminDb = require('../models/AdminSchema');
const bcrypt = require('bcryptjs');
const authenticateAdmin = require('../middleware/authenticateAdmin');

//admin register
router.post('/adminRegister', async (req, res) => {
  const { adminName, email, password, cpassword } = req.body;

  if (!adminName || !email || !password || !cpassword) {
    res.status(422).json({ error: 'Fill All The Details' });
  }

  try {
    const preAdmin = await adminDb.findOne({ email: email });

    if (preAdmin) {
      res.status(422).json({ error: 'Email already Registered' });
    } else if (password !== cpassword) {
      res.status(422).json({ error: 'Passwords do not match' });
    } else {
      const finalAdmin = new adminDb({
        adminName,
        email,
        password,
        cpassword,
      });

      const storedAdmin = await finalAdmin.save();

      res.status(201).json({ status: 201, storedAdmin });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log('Catch block error');
  }
});

//Admin Login
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: 'Fill All The Details' });
  }

  try {
    const adminValid = await adminDb.findOne({ email: email });

    if (adminValid) {
      const isValid = await bcrypt.compare(password, adminValid.password);

      if (!isValid) {
        res.status(422).json({ error: 'Invalid Credentials' });
      } else {
        //generate token
        const token = await adminValid.generateAuthToken();

        //Cookie Generate
        res.cookie('adminCookie', token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          adminValid,
          token,
        };

        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log('Catch Block Error');
  }
});

//Admin Valid
router.get('/validAdmin', authenticateAdmin, async (req, res) => {
  try {
    const validAdminOne = await adminDb.findOne({ _id: req.adminId });
    res.status(201).json({ status: 201, validAdminOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//admin logout
router.get('/logout', authenticateAdmin, async (req, res) => {
  try {
    req.validAdmin.tokens = req.validAdmin.tokens.filter((currelem) => {
      return currelem.token !== req.token;
    });

    res.clearCookie('adminCookie', { path: '/' });

    req.validAdmin.save();

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
