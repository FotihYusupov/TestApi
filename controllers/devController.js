const Dev = require('../models/Developer')
const { sign } = require('../utils/jwt')

exports.getAll = async (req, res) => {
    try {
        const users = await Dev.find()
        return res.json(users);
    } catch (err) {
        return res.json(err)
    }
}

exports.Create = async (req, res) => {
    try {
        const { name, password, role } = req.body
        const token = sign('developer');
        const newDev = new Dev({
            token: token,
            name: name,
            password: password,
            role: role,
        })
        await newDev.save();
        return res.json(newDev);
    } catch (err) {
        console.log(err);
        return res.json(err)
    }
};

exports.Login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if(name == process.env.NAME && password == process.env.PASSWORD) {
            res.cookie('userRole', 'NovaAdmin');
            return res.redirect('nova');
        }
        const findUser = await Dev.findOne({ name: name, password: password });
        console.log(findUser);
        if(findUser) {
            res.cookie('userRole', findUser.role)
            return res.render('user');
        }
        console.log('hello');
        return res.json('user not found');
    } catch (err) {
        return res.json(err);
    }
};

exports.deleteDev = async (req, res) => {
    try {
        await Dev.deleteOne({ _id: req.params.id })
        return res.json('Deleted');
    } catch (err) {
        return res.json(err)
    }
};
