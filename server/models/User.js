const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Organization = require('./Organization');
const Order = require('./Order');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    savedOrganizations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
      },
    ],
    orderHistory: [{
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },],
    image: { type: String },
    myOrganizationId: { type: String }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('organizationCount').get(function () {
  return this.savedOrganizations.length;
});

const User = model('User', userSchema);

module.exports = User;
