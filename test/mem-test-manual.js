'use strict'

const test = require('tape')
const gen = require('win-dummy-exe')
const vi = require('..')
const gc = global.gc

test('memory usage', function (t) {
  t.plan(2)

  const company = 'beep'
  const TOTAL = 2e5
  const STEP = 1e4

  gen({ assemblyCompany: company }, function (err, exe) {
    t.ifError(err, 'no gen error')

    let n = 0
    const base = process.memoryUsage().rss

    ;(function next () {
      for (let i = 0; i < STEP; i++, n++) {
        if (vi(exe).CompanyName !== company) throw new Error('Info wrong')
      }

      if (typeof gc !== 'undefined') gc()

      console.log(
        'n: %d, rss: %s% %sM',
        n,
        Math.round(process.memoryUsage().rss / base * 100),
        Math.round(process.memoryUsage().rss / 1024 / 1024)
      )

      if (n > TOTAL) t.ok(true, 'finished')
      else process.nextTick(next)
    })()
  })
})

test('memory usage with unfound executable', function (t) {
  t.plan(1)

  const TOTAL = 2e5
  const STEP = 1e4

  let n = 0
  const base = process.memoryUsage().rss

  ;(function next () {
    for (let i = 0; i < STEP; i++, n++) {
      let err = null
      try { vi('nope.exe') } catch (e) { err = e }
      if (!err) throw new Error('Expected an error')
    }

    if (typeof gc !== 'undefined') gc()

    console.log(
      'n: %d, rss: %s% %sM',
      n,
      Math.round(process.memoryUsage().rss / base * 100),
      Math.round(process.memoryUsage().rss / 1024 / 1024)
    )

    if (n > TOTAL) t.ok(true, 'finished')
    else process.nextTick(next)
  })()
})
