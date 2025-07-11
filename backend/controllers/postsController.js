const prisma = require('../lib/prisma')

exports.postsFindMany = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true },
    })

    res.json(posts)
  } catch (error) {
    return next(error)
  }
}

exports.postsFindById = async (req, res, next) => {
  const { postId } = req.params

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
    })

    res.json(post)
  } catch (error) {
    return next(error)
  }
}

exports.findManyCommentsByPostId = async (req, res, next) => {
  const { postId } = req.params

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
      include: { comments: true },
    })

    const comments = post.comments

    res.json(comments)
  } catch (error) {
    return next(error)
  }
}

exports.postsUpdateById = async (req, res, next) => {
  const { postId } = req.params
  const { user } = req
  const { title, text } = req.body

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
    })

    if (post.userId != user.id) return res.status(403).send({ message: 'You are not the author of this post' })

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, text, userId: user.id },
    })

    res.json(updatedPost)
  } catch (error) {
    return next(error)
  }
}

exports.postsDeleteById = async (req, res, next) => {
  const { postId } = req.params
  const { user } = req

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
    })

    if (post.userId != user.id) return res.status(403).send({ message: 'You are not the author of this post' })

    await prisma.post.delete({
      where: { id: postId },
    })

    res.json({ message: `post with id ${postId} is deleted.` })
  } catch (error) {
    return next(error)
  }
}

exports.createCommentByPostId = async (req, res, next) => {
  const { user } = req
  const { text } = req.body
  const { postId } = req.params

  try {
    const newComment = await prisma.comment.create({
      data: { text, postId, userId: user.id },
    })

    res.json(newComment)
  } catch (error) {
    return next(error)
  }
}

exports.postsPublishById = async (req, res, next) => {
  const { postId } = req.params
  const { user } = req

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
    })

    if (post.userId != user.id) return res.status(403).send({ message: 'forbidden' })

    const patchedPost = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    })

    res.json(patchedPost)
  } catch (error) {
    return next(error)
  }
}
