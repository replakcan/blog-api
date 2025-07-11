const { Router } = require('express')
const indexRouter = Router()

indexRouter.get('/', (req, res) => res.json({ msg: 'index-router home-page' }))

module.exports = indexRouter
