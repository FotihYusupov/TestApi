const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  spam: {
    type: Boolean,
    default: false,
  }
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
