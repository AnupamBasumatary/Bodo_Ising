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
//Delete Food Details--DELETE(/api/food) --public

module.exports = router;
