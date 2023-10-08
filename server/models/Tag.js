const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
