const prisma = require('../lib/prisma')

exports.giveUserAuthorship = async (req, res, next) => {
  const { user } = req

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: 'AUTHOR',
      },
    })

    res.json({ message: 'You are an author now!' })
  } catch (error) {
    next(error)
  }
}
