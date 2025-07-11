const generateToken = require('../auth/generateToken')
const prisma = require('../lib/prisma')
const bcrypt = require('bcryptjs')

exports.usersLoginPost = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })

    if (!user) return res.status(401).json({ message: 'Invalid username' })

    const match = await bcrypt.compare(password, user.password)

    if (!match) return res.status(401).json({ message: 'Invalid password' })

    const token = generateToken(user)

    res.json({ token })
  } catch (error) {
    return next(error)
  }
}

exports.usersRegisterPost = async (req, res, next) => {
  const { first_name, last_name, username, email, age, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        age,
        password: hashedPassword,
      },
    })

    res.status(201).json(newUser)
  } catch (error) {
    return next(error)
  }
}

exports.usersSecretGet = (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you made it to the secret dungeon!` })
}

exports.usersFindMany = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()

    res.json(users)
  } catch (error) {
    return next(error)
  }
}
