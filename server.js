const express = require('express')
const next = require('next')
const stringTest = require('./server/stringTest')
const getUrlSize = require('./server/getUrlSize')
const getUrlForLibrary = require('./server/getUrlForLibrary')

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
        res.status(status).send(message)
      }

      if(stringTest.isUrl(input)) {
        getUrlSize(input)
          .then(size => sizeResponse(size, input, 'url'))
          .catch(err => handleError(500, 'Failed retrieving the size.'))
      } else {
        stringTest.isNpmPackage(input)
          .then(isNpm => isNpm ? getUrlForLibrary(input) : false)
          .then(url => !url ? handleError(400, 'Could not find the package on npm') : getUrlSize(url))
          .then(size => sizeResponse(size, input, 'npm'))
          .catch(() => handleError(500, 'Failed retrieving the size.'))
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
