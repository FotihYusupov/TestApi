const { Router } = require('express');
const devController = require('../controllers/devController');

const router = Router()

router.get('/developers', devController.getAll)
router.post('/create-dev', devController.Create);
router.post('/login-dev', devController.Login);
router.delete('/delete-dev/:id', devController.deleteDev);

module.exports = router;