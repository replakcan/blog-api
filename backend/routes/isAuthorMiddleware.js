const prisma = require('../lib/prisma')

const isAuthor = (req, res, next) => {
  const { user } = req

  if (user.role !== 'AUTHOR') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  next()
}

module.exports = {
  isAuthor,
}
