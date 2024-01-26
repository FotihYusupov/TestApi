const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const baskedController = require('../controllers/baskedController')

const router = Router()

router.get('/basked', authMiddleware, baskedController.getBasked);
router.post('/add-basked/:productId', authMiddleware, baskedController.addBasked);

module.exports = router;