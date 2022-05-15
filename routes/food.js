const express = require('express');
const router = express.Router();

const Food = require('../models/Food');

//Get Food Details--GET(/api/food) --public
router.get('/', (req, res) => {
  res.json({ msg: 'Hi' });
});

//Add Food Details --POST(/api/food) --public
//Update Food Details --PUT(/api/food) --public
//Delete Food Details--DELETE(/api/food) --public

module.exports = router;
