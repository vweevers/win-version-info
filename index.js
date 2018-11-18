'use strict'

var resolve = require('path').resolve
var isWindows = process.platform === 'win32'
var info = isWindows ? require('bindings')('VersionInfo') : null

module.exports = function (file) {
  if (typeof file !== 'string') {
    var t = typeof file
    throw new Error('win-version-info requires a string filename, got: ' + t)
  }

  if (file === '') {
    throw new Error('win-version-info requires a non-empty string filename')
  }

  return isWindows ? info(resolve(file)) : {}
}
