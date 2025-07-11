const express = require('express')
const app = express()
const indexRouter = require('./routes/indexRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)

app.use((err, req, res, next) => {
  console.log(err)

  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`express is on at port ${PORT}`)
})
