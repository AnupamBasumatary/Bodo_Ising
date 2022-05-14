const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const PreFoodSchema = require('../models/PreFood');

//Get Food --GET(/api/savefood/:day) --private
const getFood = async (req, res) => {
  const day = req.params.day;
  console.log(day);
  console.log(req.user);
  try {
    const user = await PreFoodSchema.find({ user: req.user.id }).sort({
      date: -1,
    });
    const food = user.day;

    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

router.get('/:day', auth, getFood);

//Save User Food --GET(/api/savefood/:day) --private

module.exports = router;
