const express = require('express')
const app = express()
const indexRouter = require('./routes/indexRouter')
const postRouter = require('./routes/postRouter')
const passport = require('passport')
const isAuth = require('./auth/isAuth')
const authorRouter = require('./routes/authorRouter')
const usersRouter = require('./routes/usersRouter')
require('./auth/jwtStrategy')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use('/users', isAuth, usersRouter)
app.use('/author', isAuth, authorRouter)
app.use('/posts', postRouter)
app.use('/', indexRouter)

app.use((err, req, res, next) => {
  console.log(err)

  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`express is on at port ${PORT}`)
})
