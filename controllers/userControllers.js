const Users = require('../models/Users')
const Basked = require('../models/Basked')
const { sign } = require('../utils/jwt')

exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.params;
        if(role !== 'all') {
            const users = await Users.find({ role: role });
            return res.json(users);
        } else {
            const users = await Users.find();
            return res.json(users);
        }
    } catch (err) {
        return res.json(err)
    } 
};

exports.SignUp = async (req, res) => {
    try {
        const { name, lastName, password } = req.body;
        if(name || lastName || password) {
            const user = new Users({
                name: name,
                lastName: lastName,
                password: password
            });
            await user.save()
            const basked = new Basked({
                user: user._id
            })
            await basked.save()
            return res.json(sign(user._id.toString()))
        };
        return res.json('name, lastName and password required');
    } catch (err) {
        return res.json(err);
    }
};

exports.LogIn = async (req, res) => {
    try {
        const {name, password} = req.body;
        if(name || password) {
            const findUser = await Users.findOne({
                name: name, 
                password: password
            });
            if(!findUser) {
                return res.json('User not found')
            };
            return res.json(sign(findUser._id.toString()));
        };
        return res.json('name and password required');
    } catch (err) {
        return res.json(err)
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const { userId } = req.headers;
        if(userId) {
            const findAdmin = await Users.findById(userId);
            if(findAdmin.role === 'superAdmin') {
                const newAdmin = new Users({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    role: req.body.role
                })
                await newAdmin.save();
                return res.json('new admin added')
            }
        }
    } catch (err) {
        return res.json(err)
    }
};

exports.DeleteAdmin = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        if(userId) {
            const findUser = await Users.findById(userId);
            if(findUser.role === 'superAdmin') {
                await Users.deleteOne({ _id: id });
                return res.json('Admin deleted');
            } else {
                return res.json('Only superAdmins can deleted users.')
            };
        };
    } catch (err) {
        return res.json(err)
    };
};

exports.ChangeInformation = async (req, res) => {
    try {
        const findUser = await Users.findById(req.headers.userId);
        findUser.name = req.body.name;
        findUser.lastName = req.body.lastName;
        findUser.password = req.body.password;
        await findUser.save();
        return res.json(findUser);
    } catch (err) {
        return res.json(err)
    }
};

exports.SpamUser = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        if(id) {
            const findAdmin = await Users.findById(userId);
            if(findAdmin.role === 'superAdmin') {
                const findUser = await Users.findById(id);
                if(findUser) {
                    findUser.spam = true;
                    await findUser.save();
                    return res.json('User spam')
                } else {
                    return res.json('User not found.')
                }
            } else {
                return res.json('Only superAdmin can spam users!')
            }
        } else {
            return res.json('Token is no defined!')
        }
    } catch (err) {
        return res.json(err)
    }
};

exports.removeSpam = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { id } = req.params;
        if(id) {
            const findAdmin = await Users.findById(userId);
            if(findAdmin.role === 'superAdmin') {
                const findUser = await Users.findById(id);
                if(findUser) {
                    findUser.spam = false;
                    await findUser.save();
                    return res.json('The user has been removed from spam')
                } else {
                    return res.json('User not found.')
                }
            } else {
                return res.json('Only superAdmin can spam users!')
            }
        } else {
            return res.json('Token is no defined!')
        }
    } catch (err) {
        return res.json(err)
    }
};
