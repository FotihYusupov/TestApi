const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const OrderController = require('../controllers/OrdersController')

const router = Router()

router.get('/orders/:action', authMiddleware, OrderController.getAllOrders);
router.get('/order', authMiddleware, OrderController.byToken);
router.get('/order/:id', authMiddleware, OrderController.GetOrder);
router.post('/new-order', authMiddleware, OrderController.AddOrder);
router.put('/check/:orderId', authMiddleware, OrderController.checkOrder);

module.exports = router;