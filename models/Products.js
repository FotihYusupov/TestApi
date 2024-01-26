const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  productTitleUz: {
    type: String,
  },
  productDescUz: {
    type: String,
  },
  productTitleRu: {
    type: String,
  },
  productDescRu: {
    type: String,
  },
  productTitleEn: {
    type: String,
  },
  productDescEn: {
    type: String,
  },
  productTitleKr: {
    type: String,
  },
  productDescKr: {
    type: String,
  },
  productImg: {
    type: Array,
    default: [],
  },
  productPrice: {
    type: Number,
  },
  views: {
    type: Number,
    default: 0,
  },
  newPrice: {
    type: Number,
    default: 0
  },
  offer: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'categories',
  },
});

const Users = mongoose.model('products', UserSchema);

module.exports = Users;
