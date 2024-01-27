const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    const { userRole } = req.cookies;
    if(userRole) {
        res.redirect('user')
    }
    res.render('login')
})

router.get('/superAdmin', (req, res) => {
    const { userRole } = req.cookies;
    if(userRole == 'senior') {
        res.render('superAdmin')
    }
    res.redirect('/user')
})

router.get('/admin', (req, res) => {
    const { userRole } = req.cookies;
    if(userRole == 'middle' || userRole == 'senior') {
        res.render('admin')
    }
    res.redirect('/user')
})

router.get('/user', (req, res) => {
    const { userRole } = req.cookies;
    if(userRole) {
        res.render('user')
    }
    res.redirect('/')
})

module.exports = router;