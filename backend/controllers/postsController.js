const { ForbiddenError } = require('../errors/customError')
const prisma = require('../lib/prisma')

exports.attachPostToRequestObj = async (req, res, next) => {
  const { postId } = req.params

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId }
    })

    req.post = post
    next()
  } catch (error) {
    next(error)
  }
}

exports.postsFindMany = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true }
    })

    res.json(posts)
  } catch (error) {
    next(error)
  }
}

exports.postsFindById = async (req, res, next) => {
  const { post } = req

  try {
    res.json(post)
  } catch (error) {
    next(error)
  }
}

exports.findManyCommentsByPostId = async (req, res, next) => {
  const { post } = req

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: post.id
      }
    })

    res.json(comments)
  } catch (error) {
    next(error)
  }
}

exports.postsUpdateById = async (req, res, next) => {
  const { post, user } = req
  const { title, text } = req.body

  try {
    if (post.userId != user.id) throw new ForbiddenError('You are not allowed to edit this post')

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: { title, text, userId: user.id }
    })

    res.json(updatedPost)
  } catch (error) {
    next(error)
  }
}

exports.postsDeleteById = async (req, res, next) => {
  const { user, post } = req

  try {
    if (post.userId != user.id) throw new ForbiddenError('You are not allowed to delete this post')

    await prisma.post.delete({
      where: { id: post.id }
    })

    res.json({ message: `post with id ${post.id} is deleted.` })
  } catch (error) {
    next(error)
  }
}

exports.createCommentByPostId = async (req, res, next) => {
  const { user, post } = req
  const { text } = req.body

  try {
    const newComment = await prisma.comment.create({
      data: { text, postId: post.id, userId: user.id }
    })

    res.json(newComment)
  } catch (error) {
    next(error)
  }
}

exports.postsPublishById = async (req, res, next) => {
  const { user, post } = req

  try {
    if (post.userId != user.id) throw new ForbiddenError('You are not allowed to publish this post')

    const patchedPost = await prisma.post.update({
      where: { id: post.id },
      data: { published: true }
    })

    res.json(patchedPost)
  } catch (error) {
    next(error)
  }
}
