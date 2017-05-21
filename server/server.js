const express = require('express')
const next = require('next')
const stringTest = require('./stringTest')
const getUrlSize = require('./getUrlSize')
const getUrlForLibrary = require('./getUrlForLibrary')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(function() {
    const server = express()

    server.get('/json', function(req, res) {
      const input = decodeURIComponent(req.query.input)

      function sizeResponse(size, inputArg, type) {
        res.json(Object.assign(size, {
          input: inputArg,
          type
        }))
      }

      function handleError(status = 500, message = 'Something went wrong.') {
        res.statusMessage = message
        res.status(status).end()
      }

      let urlToWeigh = input
      let type = 'url'

      if(!stringTest.isUrl(input)) {
        urlToWeigh = getUrlForLibrary(input)
        type = 'npm'
      }

      if(!urlToWeigh) {
        handleError(400, 'Input empty or invalid.')
      } else {
        getUrlSize(urlToWeigh)
          .then(size => sizeResponse(size, input, type))
          .catch(err => {
            console.log(err)
            handleError(500, 'Failed retrieving the size.')
          })
      }
    })

    server.get('*', function(req, res) {
      return handle(req, res)
    })

    server.listen(3000, function(err) {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
