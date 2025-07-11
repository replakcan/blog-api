const { Router } = require('express')
const isAuth = require('../auth/isAuth')
const indexRouter = Router()
const indexController = require('../controllers/indexController')

indexRouter.get('/', (req, res) => res.json({ msg: 'index-router home-page' }))

indexRouter.post('/login', indexController.usersLoginPost)

indexRouter.post('/register', indexController.usersRegisterPost)

indexRouter.get('/secret', isAuth, indexController.usersSecretGet)

module.exports = indexRouter
