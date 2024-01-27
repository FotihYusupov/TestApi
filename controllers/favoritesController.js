const Favorites = require('../models/Favorites');
const Products = require('../models/Products');

exports.getFavorites = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { lang } = req.params;
        const findFavorites = await Favorites.find({ user: userId });
        if(!findFavorites) {
            return res.json("user not found")
        }
        return res.json(findFavorites.map(product => ({
                id: product._id,
                productTitle: product['productTitle' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                productDesc: product['productDesc' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                productImg: product.productImg,
                views: product.views,
                newPrice: product.newPrice,
                price: product.productPrice,
                offer: product.offer,
                category: {
                    id: product._id,
                    categoryTitle: product['categoryName' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                },
            }))
        );
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
        const findProduct = await Products.findById(req.params.productId);
        findFavorites.basked.push(findProduct);
        await findFavorites.save();
        return res.json(findFavorites);
    } catch (err) {
        return res.json(err);
    };
};
