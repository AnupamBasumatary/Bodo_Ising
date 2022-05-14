const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const PreFood = require('../models/PreFood');

//Get Food --GET(/api/savefood/:day) --private

router.get('/:day', auth, async (req, res) => {
  const day = req.params.day;
  try {
    const food = await PreFood.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Save User Food --POST(/api/savefood/:day) --private

router.post('/:day', auth, async (req, res) => {
  const { lunch, dinner } = req.body;
  const day = req.params.day.toString();

  try {
    const newPreFood = new PreFood({
      day,
      lunch,
      dinner,
      user: req.user.id,
    });

    const preFood = await newPreFood.save();
    res.json(preFood);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
