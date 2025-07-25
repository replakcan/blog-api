const { Router } = require('express')
const commentsRouter = Router()
const commentsController = require('../controllers/commentsController')

commentsRouter.param('commentId', commentsController.attachCommentToRequestObj)

commentsRouter
  .route('/:commentId')
  .get(commentsController.commentsFindById)
  .put(isAuth, isAuthor, commentsController.commentsUpdateById)
  .delete(isAuth, isAuthor, commentsController.commentsDeleteById)

module.exports = commentsRouter
