const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const PreFoodSchema = require('../models/PreFood');

//Get Today's Food --GET(/api/savefood/today) --private
router.get('/today', auth, async (req, res) => {
  try {
    const food = await PreFoodSchema.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
