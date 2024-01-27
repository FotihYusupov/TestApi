const Dev = require('../models/Developer')

exports.Create = async (req, res) => {
    try {
        const { name, password, role } = req.body
        const newDev = new Dev({
            name: name,
            password: password,
            role: role
        })
        await newDev.save();
        return res.json(newDev);
    } catch (err) {
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
        const findUser = await Dev.find({ name: name, password: password });
        if(findUser) {
            res.cookie('userRole', findUser.role);
            return res.redirect('user');
        }
        return res.json('user not found');
    } catch (err) {
        return res.json(err);
    }
};
