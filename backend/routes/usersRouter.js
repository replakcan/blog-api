const { Router } = require('express')
const usersRouter = Router()
const usersController = require('../controllers/usersController')

usersRouter.put('/:userId/authorship', usersController.giveUserAuthorship)

module.exports = usersRouter
