'use strict';

var execFile = require('child_process').execFile
  , glob = require('glob')
  , fs = require('fs')
  , tmp = require('tmpgen')('win-version-info/dummy/*', { clean: true })
  , access = typeof fs.access === 'function' ? fs.access : fs.stat

module.exports = function(values, opts, done) {
  if (typeof opts === 'function') done = opts, opts = {}
  else if (!opts) opts = {}

  findBin(function (err, bin) {
    if (err) return done(err)

    generateAssembly(values, function (err, code) {
      if (err) return done(err)

      var dir = tmp()
      var exe = dir + '\\dummy.exe'
      var args = ['/nologo', '/print-', '/utf8output', 'dummy.js']

      // The jsc compiler needs a BOM to read the source as UTF-8
      fs.writeFile(dir + '\\dummy.js', '\ufeff' + code, function (err) {
        if (err) return done(err)

        var child = execFile(bin, args, { cwd: dir }, function(err) {
          if (err) return done(err)

          // Make sure the executable exists
          access(exe, function (err) {
            if (err) done(err)
            else done(null, exe)
          })
        })

        if (opts.debug) child.stderr.pipe(process.stderr)
      })
    })
  })
}

function findBin(cb) {
  if (findBin.cached) return cb(null, findBin.cached)

  var windir = process.env.SYSTEMROOT
  var pattern = '/Microsoft.NET/Framework/v*/jsc.exe'

  glob(pattern, { root: windir }, function (err, bins) {
    if (err) return cb(err)
    if (!bins.length) return cb(new Error('Could not find jsc.exe'))

    findBin.cached = bins.pop()
    cb(null, findBin.cached)
  })
}

function generateAssembly(values, done) {
  // See https://msdn.microsoft.com/en-us/library/system.reflection(v=vs.110).aspx
  var code = []

  var attributes = {
    companyname:     'AssemblyCompanyAttribute',
    productname:     'AssemblyProductAttribute',
    filedescription: 'AssemblyTitleAttribute',
    legaltrademarks: 'AssemblyTrademarkAttribute',
    legalcopyright:  'AssemblyCopyrightAttribute',
    comments:        'AssemblyDescriptionAttribute',
    productversion:  'AssemblyInformationalVersionAttribute',
    fileversion:     'AssemblyFileVersionAttribute'
  }

  var aliases = {
    company:     'companyname',
    publisher:   'companyname',
    product:     'productname',
    description: 'filedescription',
    trademarks:  'legaltrademarks',
    trademark:   'legaltrademarks',
    copyright:   'legalcopyright'
  }

  Object.keys(values).forEach(function (attr) {
    var key = attr.toLowerCase()
    var fn = attributes[key] || attributes[aliases[key]]
    var value = values[attr]

    if (!fn) throw new Error('Unknown attribute: ' + attr)
    if (!value) return

    var json = JSON.stringify(value)
    code.push('[assembly: ' + fn + '(' + json + ')]')
  })

  if (!code.length) return done(new Error('No attributes given'))

  code.unshift('import System.Reflection;')
  return done(null, code.join('\n'))
}
