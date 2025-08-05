require('dotenv').config()
require('./auth/jwtStrategy')
const express = require('express')
const app = express()
const indexRouter = require('./routes/indexRouter')
const postsRouter = require('./routes/postsRouter')
const passport = require('passport')
const isAuth = require('./auth/isAuth')
const authorRouter = require('./routes/authorRouter')
const usersRouter = require('./routes/usersRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use('/users', isAuth, usersRouter)
app.use('/author', authorRouter)
app.use('/posts', postsRouter)
app.use('/', indexRouter)

app.use((err, req, res, next) => {
  console.log(err)

  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`express is on at port ${PORT}`)
})
