const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const Food = require('../models/Food');

//Get Food Details--GET(/api/food) --public
router.get('/', async (req, res) => {
  const { code } = req.body;
  try {
    const food = await Food.find({ code });
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Add Food Details --POST(/api/food) --public
router.post(
  '/',
  [
    check('code', 'Code is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { code, name, description, price, category } = req.body;

    try {
      const newFood = new Food({ code, name, description, price, category });
      const food = await newFood.save();
      res.json(food);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Update Food Details --PUT(/api/food) --public
router.put('/:code', async (req, res) => {
  const code = req.params.code;
  const { name, description, price, category } = req.body;

  const foodFields = {};
  if (name) foodFields.name = name;
  if (description) foodFields.description = description;
  if (price) foodFields.price = price;
  if (category) foodFields.code = category;

  try {
    const savedFood = await Food.find({ code });
    if (!savedFood) {
      return res
        .status(404)
        .json({ msg: `Food not available with code ${code}` });
    }

    const updatedFood = await Food.findOneAndUpdate(
      { code },
      { $set: foodFields },
      { new: true }
    );

    res.json({ updatedFood });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Delete Food Details--DELETE(/api/food) --public
router.delete('/:code', async (req, res) => {
  try {
    await Food.findOneAndDelete({ code: req.params.code });
    res.json({ msg: 'Food Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
