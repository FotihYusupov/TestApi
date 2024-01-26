const Basked = require('../models/Basked');
const Products = require('../models/Products');

exports.getBasked = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findBasked = await Basked.find({ user: userId });
        if(!findBasked) {
            return res.json("user not found")
        }
        return res.json(findBasked)
    } catch (err) {
        return res.json(err)
    }
};

exports.addBasked = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findBasked = await Basked.find({ user: userId });
        if(!findBasked) {
            return res.json("user not found");
        };
        findBasked.basked.push(Products.findById(req.params.productId));
        await findBasked.save();
        return res.json(findBasked);
    } catch (err) {
        return res.json(err);
    };
};
