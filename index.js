'use strict';

var resolve = require('path').resolve
  , info = require('bindings')('VersionInfo')

module.exports = function (file) {
  if (typeof file !== 'string') {
    var t = typeof file
    throw new Error('win-version-info requires a string filename, got: ' + t)
  }

  if (file === '') {
    throw new Error('win-version-info requires a non-empty string filename')
  }

  return info(resolve(file))
}
