const express = require('express');
const router = express.Router();

const Food = require('../models/Food');

//Get Food Details--GET(/api/food) --public
router.get('/', async (req, res) => {
  const code = req.body;
  try {
    const food = await Food.find({ code });
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Add Food Details --POST(/api/food) --public
//Update Food Details --PUT(/api/food) --public
//Delete Food Details--DELETE(/api/food) --public

module.exports = router;
