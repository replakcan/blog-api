const { Router } = require('express')
const postRouter = Router()
const postController = require('../controllers/postController')
const isAuth = require('../auth/isAuth')
const { isAuthor } = require('./isAuthorMiddleware')

postRouter.get('/', postController.postsFindMany)

postRouter.get('/:postId', postController.postsFindById)

postRouter.put('/:postId', isAuth, isAuthor, postController.updatePostById)

postRouter.delete('/:postId', isAuth, isAuthor, postController.deletePostById)

postRouter.get('/:postId/comments', postController.findManyCommentsByPostId)

module.exports = postRouter
