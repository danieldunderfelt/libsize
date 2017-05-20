const isUrl = require('../helpers/isUrl')
const got = require('got')

const NPM_URL = 'https://registry.npmjs.com/'

function isNpmPackage(name = '') {
  const npmName = name.replace('@', '/')

  return got(NPM_URL + npmName)
    .then(response => {
      return response.statusCode < 400
    })
}

module.exports = {
  isUrl,
  isNpmPackage
}
