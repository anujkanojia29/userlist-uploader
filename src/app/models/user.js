const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please add user name']
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: 6,
    select: false
  },
  firstName: {
    type: String,
    required: [true, 'Please add first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name']
  },
  mobile: {
    type: Number,
    required: [true, 'Please add mobile']
  },
  isActive: {
    type: Boolean,
    required: [true, 'Please add isActive state']
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('UserSchema', UserSchema);
