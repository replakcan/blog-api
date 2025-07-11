const { Router } = require('express')
const postsRouter = Router()
const postsController = require('../controllers/postsController')
const isAuth = require('../auth/isAuth')
const { isAuthor } = require('./isAuthorMiddleware')

postsRouter.get('/', postsController.postsFindMany)

postsRouter
  .route('/:postId')
  .get(postsController.postsFindById)
  .put(isAuth, isAuthor, postsController.postsUpdateById)
  .delete(isAuth, isAuthor, postsController.postsDeleteById)

postsRouter
  .route('/:postId/comments')
  .get(postsController.findManyCommentsByPostId)
  .post(isAuth, postsController.createCommentByPostId)

postsRouter.patch('/:postId/publish', postsController.postsPublishById)

module.exports = postsRouter
