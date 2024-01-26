const { Router } = require('express')
const categoryController = require('../controllers/categoriesController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/categories/:lang', categoryController.GetAll)
router.post('/add-category', authMiddleware, categoryController.CreateCategory)
router.put('/update-category/:id', authMiddleware, categoryController.UpdateCategory)
router.delete('/delete-category/:id', authMiddleware, categoryController.DeleteCategory)

module.exports = router;
