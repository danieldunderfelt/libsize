const express = require('express')
const next = require('next')
const got = require('got')
const gzipSize = require('gzip-size')
const prettyBytes = require('pretty-bytes')
const validator = require('validator')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/json', (req, res) => {
      const url = decodeURIComponent(req.query.url)

      if(validator.isURL(url)) {
        got(url)
          .then(response => {
            res.json({
              size: Buffer.byteLength(response.body, 'utf8'),
              gzipSize: gzipSize.sync(response.body),
              url
            })
          })
          .catch(error => {
            res.status(500).send('Something went wrong.')
          })
      } else {
        res.status(400).send('Give me an url to a text file!')
      }
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
