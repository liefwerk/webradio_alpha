const express = require('express')
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// routes
app.use(require('./routes/index'))

app.listen(process.env.PORT || 3000,
  () => console.log('Server is running...'))
