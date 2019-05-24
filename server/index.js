const ContactUs = require('./schema/ContactUs')
const Test = require('./schema/Test')
const express = require('express')
const http = require('http')
const asyncMiddleware = require('./utils/asyncMiddleware').asyncMiddleware

var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/'))
app.all('/admin', (req, res, next) => {
  next()
})

app.post('/updateJson', asyncMiddleware(async (req, res, next) => {
  console.log(req.body)
  res.status(200).send()
}))

app.listen(3000)
http.createServer(app)
