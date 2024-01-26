const { Router } = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/users/:role', userController.getAllUsers);
router.post('/sign-up', userController.SignUp);
router.post('/log-in', userController.LogIn);
router.post('/add-admin', authMiddleware, userController.addAdmin);
router.delete('/delete-admin/:id', authMiddleware, userController.DeleteAdmin);
router.put('/change', authMiddleware, userController.ChangeInformation);
router.put('/spam/:id', authMiddleware, userController.SpamUser);
router.put('/remove-spam/:id', authMiddleware, userController.removeSpam);

module.exports = router;
