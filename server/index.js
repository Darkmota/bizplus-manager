const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const rule = require('./utils/rule')
const search = require('./utils/search')
const buildObj = require('./utils/buildObj')
const asyncMiddleware = require('./utils/asyncMiddleware').asyncMiddleware
const port = 1889
const langDir = path.resolve('./lang')
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/'))
app.set('view engine', 'html')

app.post('/search', asyncMiddleware(async (req, res, next) => {
  let keyword = req.body.keyword
  let searchResult = []
  console.log(`keyword:`, req.body)
  let fileLoaded = 0
  fs.readdir(langDir, (err, files) => {
    if (err) {
      res.status(500).send()
      return
    }
    files.forEach(filename => {
      let fileFullPath = path.join(langDir, filename)
      fs.readFile(fileFullPath, 'utf8', async (err, result) => {
        if (err) {
          res.status(500).send()
          return
        }
        let locale = filename.split('.')[0]
        let obj = JSON.parse(result)
        searchResult.push(...search(obj, keyword, locale))
        fileLoaded++
        if (fileLoaded === files.length) {
          let filteredArray = buildObj(searchResult.filter(rule))
          res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" })
          res.end(JSON.stringify(filteredArray))
        }
      })
    })
  })
}))

app.listen(port)
console.log(`App is listening on ${port}`)
http.createServer(app)
