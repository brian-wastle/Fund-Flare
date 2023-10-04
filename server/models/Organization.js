const { Schema, model } = require('mongoose');

const organizationSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
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
  tags: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }
]
});

const Organization = model('Organization', organizationSchema);

module.exports = Organization;
