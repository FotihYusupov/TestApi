const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String
  },
  token: {
    type: String
  }
});

const Dev = mongoose.model('developers', DevSchema);

module.exports = Dev;
