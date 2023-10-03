const { Schema, model } = require('mongoose');

const organizationSchema = new Schema({
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

const Organization = model('Organization', organizationSchema);

module.exports = Organization;
