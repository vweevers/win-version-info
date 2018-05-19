#!/usr/bin/env node
'use strict'

const vi = require('.')
const files = process.argv.slice(2)

if (!files.length) {
  console.error('usage: version-info <file>, ..')
  process.exit(1)
}

console.log(JSON.stringify(files.map(f => vi(f)), null, 2))
