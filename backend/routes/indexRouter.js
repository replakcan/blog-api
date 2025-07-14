const { Router } = require('express')
const isAuth = require('../auth/isAuth')
const indexRouter = Router()
const indexController = require('../controllers/indexController')

indexRouter.post('/login', indexController.usersLoginPost)

indexRouter.post('/register', indexController.usersRegisterPost)

indexRouter.get('/verify', isAuth, indexController.verifyCurrentUser)

indexRouter.get('/secret', isAuth, indexController.usersSecretGet)

indexRouter.get('/users', indexController.usersFindMany)

indexRouter.get('/', (req, res) => res.json({ msg: 'index-router home-page' }))

module.exports = indexRouter
