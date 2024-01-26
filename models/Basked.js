const mongoose = require('mongoose');

const BaskedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    basked: {
        type: Array,
        default: [],
    }
});

const Basked = mongoose.model('basked', BaskedSchema);

module.exports = Basked;
