const Basked = require('../models/Basked');
const Products = require('../models/Products');

exports.getBasked = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { lang } = req.params;
        const findBasked = await Basked.find({ user: userId });
        if(!findBasked) {
            return res.json("user not found")
        }
        return res.json(findBasked.map(product => ({
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

exports.addBasked = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findBasked = await Basked.find({ user: userId });
        if(!findBasked) {
            return res.json("user not found");
        };
        const findProduct = await Products.findById(req.params.productId);
        findBasked.basked.push(findProduct);
        await findBasked.save();
        return res.json(findBasked);
    } catch (err) {
        return res.json(err);
    };
};
