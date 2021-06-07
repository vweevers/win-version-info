'use strict'

const resolve = require('path').resolve
const isWindows = process.platform === 'win32'
const info = isWindows ? require('bindings')('VersionInfo').getInfo : null

module.exports = function (file) {
  if (typeof file !== 'string') {
    const t = typeof file
    throw new Error('win-version-info requires a string filename, got: ' + t)
  }

  if (file === '') {
    throw new Error('win-version-info requires a non-empty string filename')
  }

  return isWindows ? info(resolve(file)) : {}
}
