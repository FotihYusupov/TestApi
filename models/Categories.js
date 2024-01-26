const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  categoryNameUz: {
    type: String,
  },
  categoryNameEn: {
    type: String,
  },
  categoryNameRu: {
    type: String,
  },
  categoryNameKr: {
    type: String,
  },
});

const Users = mongoose.model('categories', UserSchema);

module.exports = Users;
