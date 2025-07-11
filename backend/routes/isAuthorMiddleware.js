const { ForbiddenError } = require('../errors/customError')
const prisma = require('../lib/prisma')

const isAuthor = (req, res, next) => {
  const { user } = req

  if (user.role !== 'AUTHOR') throw new ForbiddenError('You are not an author')

  next()
}

module.exports = {
  isAuthor,
}
