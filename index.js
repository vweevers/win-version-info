'use strict'

const resolve = require('path').resolve
const isWindows = process.platform === 'win32'
const binding = isWindows ? require('node-gyp-build')(__dirname) : null

module.exports = function (file) {
  if (typeof file !== 'string') {
    const t = typeof file
    throw new Error('win-version-info requires a string filename, got: ' + t)
  }

  if (file === '') {
    throw new Error('win-version-info requires a non-empty string filename')
  }

  return isWindows ? binding.getInfo(resolve(file)) : {}
}
