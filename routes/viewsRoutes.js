const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.get('/user', (req, res) => {
    res.render('user')
})

module.exports = router;