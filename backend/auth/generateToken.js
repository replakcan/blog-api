require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const jwt = require('jsonwebtoken')

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')

const generateToken = user => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d'
  })
}

module.exports = generateToken
