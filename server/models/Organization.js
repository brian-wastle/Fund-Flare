const { Schema, model } = require('mongoose');


const organizationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  tag: 
    {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    },
  fundraisingGoal: {
    type: Number,
  },
  fundraisingAmount: {
    type: Number,
  }

});


const Organization = model('Organization', organizationSchema);


module.exports = Organization;
