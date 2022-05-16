const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Order = require('../models/Order');

//Get Order Details
//('/api/order')
//public
router.get('/:id', (req, res) => {
  res.send('Get Order Details');
});

//Add Order Details
//('/api/order')
//public
router.post(
  '/',
  [
    check('customerName', 'Customer Name is Required').not().isEmpty(),
    check('address1', 'Address Line 1 is Required').not().isEmpty(),
    check('phone', 'Phone Number is Required').not().isEmpty(),
    check('foodCode', 'Please select Food').not().isEmpty(),
    check('price', 'Add Price of Food').not().isEmpty(),
    check('quantity', 'Please add Quantity of Food').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Order Added');
  }
);

module.exports = router;
