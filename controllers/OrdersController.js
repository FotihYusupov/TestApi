const Users = require('../models/Users')
const Orders = require('../models/Orders')
const Basked = require('../models/Basked')

exports.getAllOrders = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { action } = req.params
        const findAdmin = await Users.findById(userId);
        if(findAdmin.role === 'superAdmin' || findAdmin.role === 'admin') {
            if(action === 'all') {
                const orders = await Orders.find();
                return res.json(orders);
            } else if (action === 'true' || action === 'false') {
                const orders = await Orders.find({ isChecked: action });
                return res.json(orders);
            };
        }
    } catch(err) {
        return res.json(err);
    }
};

exports.GetOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const findOrders = await Orders.find({ user: id }).populate('user')
        return res.json(findOrders)
    } catch (err) {
        return res.json(err)
    }
};

exports.AddOrder = async (req, res) => {
    try {
        const { userId } = req.headers;
        const findUser = await Users.findById(userId);
        const orders = await Basked.find({ user: userId });
        if(findUser) {
            const newOrder = new Orders({
                user: userId,
                orders: orders
            })
            await newOrder.save()
            return res.json('New order added');
        }
    } catch (err) {
        return res.json(err)
    }
};

exports.checkOrder = async (req, res) => {
    try {
        const { userId } = req.headers;
        const { orderId } = req.params;
        const findAdmin = await Users.findById(userId)
        if(findAdmin.role === 'admin') {
            const findOrder = await Orders.findById(orderId);
            findOrder.isChecked = true
            await findOrder.save();
            return res.json('Order successfully checked');
        }
        return res.json('only admins can check order');
    } catch (err) {
        return res.json(err);
    };
};
