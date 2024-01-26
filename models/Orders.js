const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    orders: {
        type: Array,
        default: [],
    },
    isChecked: {
        type: Boolean,
        default: false
    }
});

const Orders = mongoose.model('orders', OrderSchema);

module.exports = Orders;
