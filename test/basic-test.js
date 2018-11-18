'use strict'

const test = require('tape')
const vi = require('..')

if (process.platform !== 'win32') {
  test('is a noop on ' + process.platform, function (t) {
    t.same(vi('foo'), {})
    t.end()
  })
} else {
  const gen = require('win-dummy-exe')
  const xtend = require('xtend')

  var dummyDefaults = {
    InternalName: 'dummy.exe',
    OriginalFilename: 'dummy.exe'
  }

  test('company', function (t) {
    t.plan(2)

    gen({ assemblyCompany: 'beep' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        CompanyName: 'beep'
      }), 'info ok')
    })
  })

  test('trims values', function (t) {
    t.plan(2)

    gen({ assemblyCompany: '  beep   ' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        CompanyName: 'beep'
      }), 'info ok')
    })
  })

  test('ignores version 0', function (t) {
    t.plan(4)

    gen({ assemblyFileVersion: '0.0.0.0', assemblyInformationalVersion: '2.0' }, function (err, exe) {
      t.ifError(err, 'no gen error (1)')

      t.same(vi(exe), xtend(dummyDefaults, {
        ProductVersion: '2.0'
      }), 'info ok (1)')
    })

    gen({ assemblyFileVersion: '1.0.0.1', assemblyInformationalVersion: '0.0' }, function (err, exe) {
      t.ifError(err, 'no gen error (1)')

      t.same(vi(exe), xtend(dummyDefaults, {
        FileVersion: '1.0.0.1'
      }), 'info ok (1)')
    })
  })

  test('versions', function (t) {
    t.plan(2)

    gen({ assemblyFileVersion: '2.0.0.2', assemblyInformationalVersion: '2.0b' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        FileVersion: '2.0.0.2',
        ProductVersion: '2.0b'
      }), 'info ok')
    })
  })

  test('utf-8', function (t) {
    t.plan(6)

    gen({ assemblyCopyright: '© Beep 嘟 Inc.' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        LegalCopyright: '© Beep 嘟 Inc.'
      }), 'info ok')
    })

    gen({ assemblyCompany: '   © Beep 嘟 Inc.  ' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        CompanyName: '© Beep 嘟 Inc.'
      }), 'info ok')
    })

    gen({ assemblyTitle: '  嘟© Beep 嘟 Inc.嘟' }, function (err, exe) {
      t.ifError(err, 'no gen error')

      t.same(vi(exe), xtend(dummyDefaults, {
        FileDescription: '嘟© Beep 嘟 Inc.嘟'
      }), 'info ok')
    })
  })

  test('throws on invalid input', function (t) {
    t.plan(4)

    throws('win-version-info requires a non-empty string filename', '')
    throws('win-version-info is unable to access file: ' + process.cwd() + '\\nope.exe', 'nope.exe')

    throws('win-version-info requires a string filename, got: undefined')
    throws('win-version-info requires a string filename, got: boolean', true)

    function throws (message, input) {
      try {
        vi(input)
      } catch (err) {
        t.is(err.message, message, 'throws')
      }
    }
  })

  test('binding throws on non-string', function (t) {
    var info = require('bindings')('VersionInfo')

    t.plan(1)

    try {
      info()
    } catch (err) {
      t.is(err.message, 'win-version-info requires a string filename', 'throws')
    }
  })
}
