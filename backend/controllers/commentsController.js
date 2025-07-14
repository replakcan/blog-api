const { ForbiddenError } = require('../errors/customError')
const prisma = require('../lib/prisma')

exports.attachCommentToRequestObj = async (req, res, next) => {
  const { commentId } = req.params

  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId
      }
    })

    req.comment = comment

    next()
  } catch (error) {
    next(error)
  }
}

exports.commentsFindById = async (req, res, next) => {
  const { comment } = req
  try {
    res.json(comment)
  } catch (error) {
    next(error)
  }
}

exports.commentsUpdateById = async (req, res, next) => {
  const { text } = req.body
  const { user, comment } = req
  try {
    if (comment.userId != user.id) throw new ForbiddenError('You are not allowed to edit this comment')

    const updatedComment = await prisma.comment.update({
      where: {
        id: comment.id
      },
      data: {
        text
      }
    })

    res.json(updatedComment)
  } catch (error) {
    next(error)
  }
}

exports.commentsDeleteById = async (req, res, next) => {
  const { user, comment } = req
  try {
    if (comment.userId != user.id) throw new ForbiddenError('You are not allowed to delete this comment')

    await prisma.comment.delete({
      where: {
        id: comment.id
      }
    })
  } catch (error) {
    next(error)
  }
}
