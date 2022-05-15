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

//Update Food for each day --PUT(/api/savefood/:day) --private
router.put('/:day', auth, async (req, res) => {
  const { lunch, dinner } = req.body;
  const day = req.params.day.toString();

  const UpdateDayFoodFields = {};
  if (lunch) UpdateDayFoodFields.lunch = lunch;
  if (dinner) UpdateDayFoodFields.dinner = dinner;

  try {
    let dayFoodDet = await PreFood.findOne({ user: req.user.id });
    if (!dayFoodDet) {
      return res.status(404).json({ msg: `Item not selected for ${day}` });
    }

    if (dayFoodDet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    dayFoodDet = await PreFood.findOneAndUpdate(
      { user: req.user.id },
      { $set: UpdateDayFoodFields },
      { new: true }
    );

    res.json(dayFoodDet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Delete Food --DELETE(/api/savefood/:day) --private
router.delete('/:day', auth, async (req, res) => {
  try {
    let dayFoodDet = await PreFood.findOne({ user: req.user.id });
    if (!dayFoodDet) {
      return res.status(404).json({ msg: `Item not selected for ${day}` });
    }

    if (dayFoodDet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    dayFoodDet = await PreFood.findOneAndDelete({ user: req.user.id });

    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
