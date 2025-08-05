const { Router } = require('express')
const authorRouter = Router()
const authorController = require('../controllers/authorController')
const isAuth = require('../auth/isAuth')

authorRouter.post('/posts', isAuth, authorController.authorPostsPost)

authorRouter.get('/:authorId', authorController.authorProfileGet)

authorRouter.get('/:authorId/posts', authorController.authorPostsGet)

authorRouter.get('/:authorId/comments', authorController.authorCommentsGet)

module.exports = authorRouter
