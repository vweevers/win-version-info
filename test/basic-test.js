var test = require('tape')
  , xtend = require('xtend')
  , gen = require('./gen')
  , vi = require('../')

var dummyDefaults = {
  FileVersion: '0.0.0.0',
  InternalName: 'dummy.exe',
  OriginalFilename: 'dummy.exe'
}

test('company', function (t) {
  t.plan(2)

  gen({ company: 'beep' }, function (err, exe) {
    t.ifError(err, 'no gen error')

    t.same(vi(exe), xtend(dummyDefaults, {
      CompanyName: 'beep',
    }), 'info ok')
  })
})

test('versions', function (t) {
  t.plan(2)

  gen({ fileVersion: '2.0.0.2', productVersion: '2.0b' }, function (err, exe) {
    t.ifError(err, 'no gen error')

    t.same(vi(exe), xtend(dummyDefaults, {
      FileVersion: '2.0.0.2',
      ProductVersion: '2.0b'
    }), 'info ok')
  })
})

test('utf-8', function (t) {
  t.plan(2)

  gen({ copyright: '© Beep 嘟 Inc.' }, function (err, exe) {
    t.ifError(err, 'no gen error')

    t.same(vi(exe), xtend(dummyDefaults, {
      LegalCopyright: '© Beep 嘟 Inc.'
    }), 'info ok')
  })
})
