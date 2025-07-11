const prisma = require('../lib/prisma')

exports.commentsFindById = async (req, res, next) => {
  const { commentId } = req.params
  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    })

    res.json(comment)
  } catch (error) {
    return next(error)
  }
}

exports.commentsUpdateById = async (req, res, next) => {
  const { commentId } = req.params
  const { text } = req.body
  const { user } = req
  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    })

    if (comment.userId != user.id) return res.status(403).send({ message: 'You are not the author of this comment' })

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
    })

    res.json(updatedComment)
  } catch (error) {
    return next(error)
  }
}

exports.commentsDeleteById = async (req, res, next) => {
  const { user } = req
  const { commentId } = req.params
  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    })

    if (comment.userId != user.id) return res.status(403).send({ message: 'You are not the author of this comment' })

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    })
  } catch (error) {
    return next(error)
  }
}
