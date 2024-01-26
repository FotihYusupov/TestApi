const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Products = require('../models/Products');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${uuidv4()}:${file.originalname}`);
    },
});

exports.upload = multer({ storage });

exports.GetProducts = async (req, res) => {
    try {
        const { lang } = req.params;
        const products = await Products.find().populate('category');
        const newProducts = products.map(product => ({
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
        }));
        res.json(newProducts);
    } catch (err) {
        return res.json(err)
    }
};

exports.ById = async (req, res) => {
    try {
        const { lang, id } = req.params;
        const product = await Products.findById(id).populate('category');
        if(product) {
            product.views += 1
            product.save();
            const newProduct = {
                id: product._id,
                productTitle: product['productTitle' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                productDesc: product['productTitle' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                productImg: product.productImg,
                views: product.views,
                newPrice: product.newPrice,
                price: product.productPrice,
                offer: product.offer,
                category: {
                    id: product._id,
                    categoryTitle: product['categoryName' + lang.charAt(0).toUpperCase() + lang.slice(1)],
                },
            }
            return res.json(newProduct);
        }
        return res.json('Product not found');
    } catch (err) {
        return res.json(err)
    }
};

exports.ByCategory = async (req, res) => {
    try {
        const { lang, id } = req.params;
        const products = await Products.find({ category: id }).populate('category');
        const newProducts = products.map(product => ({
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
        }));
        return res.json(newProducts);
    } catch (err) {
        return res.json(err)
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const { lang, title } = req.params;
        const regex = new RegExp(title, 'i');
        const products = await Products.find({ productTitle: { $regex: regex } }).populate('category');
        const newProducts = products.map(product => ({
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
        }));
        return res.json(newProducts);
    } catch (err) {
        return res.json(err);
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findAdmin = await Users.findById(userId);
        if(findAdmin.role === 'admin') {
            const product = new Products({
                productTitleUz: req.body.productTitleUz,
                productDescUz: req.body.productDescUz,
                productTitleRu: req.body.productTitleRu,
                productDescRu: req.body.productDescRu,
                productTitleEn: req.body.productTitleEn,
                productDescEn: req.body.productDescEn,
                productTitleKr: req.body.productTitleKr,
                productDescKr: req.body.productDescKr,
                category: req.body.category,
            });
            if (!req.body.price !== undefined) {
                product.productPrice = req.body.productPrice;
            }
            for (let i = 0; i < req.files.length; i += 1) {
                product.productImg.push(process.env.URL + req.files[i].filename);
            }
            await product.save();
            return res.json(product);
        } else {
            res.json('Only admin can add product.')
        }
    } catch (err) {
        return res.send(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.headers;
        const findAdmin = await Users.findById(userId);
        if(findAdmin.role === 'admin') {
            const findProduct = await Products.findById(id);
            if (findProduct) {
                findProduct.productTitleUz = req.body.productTitleUz;
                findProduct.productDescUz = req.body.productDescUz;
                findProduct.productTitleEn = req.body.productTitleEn;
                findProduct.productDescEn = req.body.productDescEn;
                findProduct.productTitleRu = req.body.productTitleRu;
                findProduct.productDescRu = req.body.productDescRu;
                findProduct.productTitleKr = req.body.productTitleRu;
                findProduct.productDescKr = req.body.productDescKr;
                console.log(req.body.productImg);
                findProduct.productImg = req.body.productImg;
                findProduct.productPrice = req.body.productPrice;
                findProduct.category = req.body.category;
                for (let i = 0; i < req.files.length; i += 1) {
                    findProduct.productImg.push(process.env.URL + req.files[i].filename);
                }
                await findProduct.save()
                return res.json('Product updated.')
            } else {
                return res.json('Product not found.')
            }
        } else {
            return 
        }
    } catch (err) {
        return res.json(err)
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        const findAdmin = await Users.findById(userId);
        if(findAdmin.role === 'admin') {
            await Products.deleteOne({ _id: id });
            return res.json('Product deleted');
        } else {
            return res.json('Only admin can delete products.')
        }
    } catch (err) {
        return res.json(err);
    }
};
