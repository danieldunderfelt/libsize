const got = require('got')
const gzipSize = require('gzip-size')

module.exports = function(input) {
  return got(input)
    .then(response => {
      return {
        size: Buffer.byteLength(response.body, 'utf8'),
        gzipSize: gzipSize.sync(response.body)
      }
    })
}
