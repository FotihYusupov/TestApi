const { Router } = require('express');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./ordersRoutes')
const baskedRoutes = require('./baskedRoutes')
const favoritesRoutes = require('./favoritesRoutes')

const router = Router();

router.use(userRoutes)
router.use(productRoutes)
router.use(categoryRoutes)
router.use(orderRoutes)
router.use(baskedRoutes)
router.use(favoritesRoutes)

module.exports = router;