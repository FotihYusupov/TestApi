const { Router } = require('express');
const productControllers = require('../controllers/productControllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/products/:lang', productControllers.GetProducts);
router.get('/product/:lang/:id', productControllers.ById);
router.get('/category/:lang/:id', productControllers.ByCategory);
router.get('/search/:lang/:title', productControllers.searchProduct);
router.post('/add-product', productControllers.upload.array('images', 4), authMiddleware, productControllers.addProduct);
router.put('/update-product/:id', productControllers.upload.array('images', 4), authMiddleware, productControllers.updateProduct);
router.delete('/delete-product/:id', authMiddleware, productControllers.deleteProduct);

module.exports = router;
