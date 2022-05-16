const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  foodCode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  totalBill: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);
