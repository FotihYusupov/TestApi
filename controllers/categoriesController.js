const Categories = require('../models/Categories')
const Users = require('../models/Users')

exports.GetAll = async (req, res) => {
    try {
        const { lang } = req.params;
        const categories = await Categories.find();
        const newCategories = categories.map(category => ({
            id: category._id,
            categoryTitle: category['categoryName' + lang.charAt(0).toUpperCase() + lang.slice(1)],
        }));
        res.json(newCategories);
    } catch (err) {
        return res.json(err)
    }
};

exports.CreateCategory = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findAdmin = await Users.findById(userId)
        if(findAdmin.role === 'admin') {
            const NewCategory = new Categories({
                categoryNameUz: req.body.categoryNameUz,
                categoryNameEn: req.body.categoryNameEn,
                categoryNameKr: req.body.categoryNameKr,
                categoryNameRu: req.body.categoryNameRu
            })
            await NewCategory.save()
            return res.json('Category added')
        }
        return res.json('only admins can add category');
    } catch (err) {
        return res.json(err)
    }
};

exports.UpdateCategory = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        const findAdmin = await Users.findById(userId)
        if(findAdmin.role === 'admin') {
            const findCategory = await Categories.findById(id)
            findCategory.categoryNameUz = req.body.categoryNameUz;
            findCategory.categoryNameEn = req.body.categoryNameEn;
            findCategory.categoryNameKr = req.body.categoryNameKr;
            findCategory.categoryNameRu = req.body.categoryNameRu;
            await findCategory.save()
            return res.json('Category updated')
        }
        return res.json('only admins can update category');
    } catch (err) {
        return res.json(err)
    }
};

exports.DeleteCategory = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        const findAdmin = await Users.findById(userId)
        if(findAdmin.role === 'admin') {
            await Categories.deleteOne({ _id: id })
            return res.json('Category deleted')
        }
        return res.json('only admins can update category');
    } catch (err) {
        return res.json(err)
    }
};
