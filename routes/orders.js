const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Order = require('../models/Order');

//Get Order Details
//('/api/order')
//public
router.get('/:id', async (req, res) => {
  try {
    const orderDetails = await Order.findById(req.params.id);
    res.json(orderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      customerName,
      address1,
      address2,
      phone,
      foodCode,
      price,
      quantity,
      totalBill,
    } = req.body;

    try {
      const newOrder = new Order({
        customerName,
        address1,
        address2,
        phone,
        foodCode,
        price,
        quantity,
        totalBill,
      });

      const order = await newOrder.save();
      res.json(order);
      console.log(order._id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
