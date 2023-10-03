const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  name: {
      type: String,
      required: true,
    },
  
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
