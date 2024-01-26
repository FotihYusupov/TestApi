const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    favorites: {
        type: Array,
        default: [],
    }
});

const Favorites = mongoose.model('favorites', FavoritesSchema);

module.exports = Favorites;
