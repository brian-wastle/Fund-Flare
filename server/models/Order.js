const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema({
  // this will come from Stripe
  orderId: {
      type: String,
      required: true,
    },
  userId: {
    type: String,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  }
});

const Order = model('Order', orderSchema);

module.exports = Order;
