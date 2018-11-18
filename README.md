# win-version-info

**Windows-only native addon to read version info from executables. A noop on other platforms.**

[![npm status](http://img.shields.io/npm/v/win-version-info.svg?style=flat-square)](https://www.npmjs.org/package/win-version-info)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/win-version-info.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/win-version-info)
[![Dependency status](https://img.shields.io/david/vweevers/win-version-info.svg?style=flat-square)](https://david-dm.org/vweevers/win-version-info)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Example

```js
const vi = require('win-version-info')
console.log(vi(process.argv[2]))
```

```
> node example "C:\Program Files (x86)\Firefox Developer Edition\firefox.exe"
{ FileVersion: '46.0.0.5903',
  LegalCopyright: '©Firefox and Mozilla Developers; available under the MPL 2 license.',
  CompanyName: 'Mozilla Corporation',
  FileDescription: 'FirefoxDeveloperEdition',
  ProductVersion: '46.0a2',
  InternalName: 'FirefoxDeveloperEdition',
  LegalTrademarks: 'Firefox is a Trademark of The Mozilla Foundation.',
  OriginalFilename: 'firefox.exe',
  ProductName: 'FirefoxDeveloperEdition',
  BuildID: '20160229004006' }
```

## Install

With [npm](https://npmjs.org) do:

```
npm install win-version-info
```

## Changelog

### 2.1.0

- Remove (need for) `os` filter in `package.json`
- Add `standard`

### 2.0.0

- Drop Node 4, 5 and 7
- Add prebuilds for Node 8, 9 and 10

### 2.0.0-beta1

- Drop Node < 4 support
- Trim values
- Ignore empty values and `0.0.0.0` versions
- Prebuilds for Node 4 - 7
- Add CLI

## License

[MIT](./LICENSE) © 2016-present Vincent Weevers.

## Acknowledgements

- The main body of this project comes from [ShowVer](http://www.codeproject.com/Articles/2457/ShowVer-exe-command-line-VERSIONINFO-display-progr) © Ted Peck 2002
- Converting between UTF-16 and UTF-8 made possible by  [UTF8Conversion](https://code.msdn.microsoft.com/C-UTF-8-Conversion-Helpers-22c0a664) ([Apache License 2.0](http://spdx.org/licenses/Apache-2.0.html)) © 2011 Giovanni Dicanio
- For getting me started with addon development: [node-native-boilerplate](https://github.com/fcanas/node-native-boilerplate) © 2015 Fabian Canas
