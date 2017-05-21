const got = require('got')
const gzipSize = require('gzip-size')

module.exports = function(input) {
  return got(input, { timeout: 5000 })
    .then(response => ({
      size: Buffer.byteLength(response.body, 'utf8'),
      gzipSize: gzipSize.sync(response.body)
    }))
}
