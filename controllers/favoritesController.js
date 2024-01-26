const Favorites = require('../models/Favorites');
const Products = require('../models/Products');

exports.getFavorites = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findFavorites = await Favorites.find({ user: userId });
        if(!findFavorites) {
            return res.json("user not found")
        }
        return res.json(findFavorites)
    } catch (err) {
        return res.json(err)
    }
};

exports.addFavorites = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findFavorites = await Favorites.find({ user: userId });
        if(!findFavorites) {
            return res.json("user not found");
        };
        findFavorites.basked.push(Products.findById(req.params.productId));
        await findFavorites.save();
        return res.json(findFavorites);
    } catch (err) {
        return res.json(err);
    };
};
