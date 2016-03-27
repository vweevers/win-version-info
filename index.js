'use strict';

var resolve = require('path').resolve
  , info = require('bindings')('VersionInfo')

module.exports = function (file) {
  return info(resolve(file))
}
