const { NotFoundError } = require('../errors/customError')
const prisma = require('../lib/prisma')

exports.authorProfileGet = async (req, res, next) => {
  const { authorId } = req.params
  try {
    const author = await prisma.user.findUniqueOrThrow({
      where: {
        id: authorId
      },
      include: {
        posts: true,
        comments: true
      }
    })

    res.json(author)
  } catch (error) {
    next(error)
  }
}

exports.authorPostsPost = async (req, res, next) => {
  const { title, text } = req.body
  const { user } = req
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        text,
        userId: user.id
      }
    })

    if (!user) throw new NotFoundError('Author not found')

    res.json(newPost)
  } catch (error) {
    next(error)
  }
}

exports.authorPostsGet = async (req, res, next) => {
  const { authorId } = req.params

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: authorId
      }
    })

    res.json(posts)
  } catch (error) {
    next(error)
  }
}

exports.authorCommentsGet = async (req, res, next) => {
  const { authorId } = req.params

  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: authorId
      }
    })

    res.json(comments)
  } catch (error) {
    next(error)
  }
}
