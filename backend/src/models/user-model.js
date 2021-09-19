const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  googleId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    default: 'http://www.gravatar.com/avatar/?d=mp',
  },
  apiKey: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('users', User);
