const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const favoritesController = require('../controllers/favoritesController')

const router = Router()

router.get('/favorites/:lang', authMiddleware, favoritesController.getFavorites);
router.post('/add-favorites/:productId', authMiddleware, favoritesController.addFavorites);

module.exports = router;