# win-version-info

**Windows-only native addon to read version info from executables. A noop on other platforms.**

[![npm status](http://img.shields.io/npm/v/win-version-info.svg)](https://www.npmjs.org/package/win-version-info)
[![Node version](https://img.shields.io/node/v/win-version-info.svg)](https://www.npmjs.com/package/win-version-info)
[![Test](https://img.shields.io/github/workflow/status/vweevers/win-version-info/Test?label=test)](https://github.com/vweevers/win-version-info/actions/workflows/test.yml)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript\&logoColor=fff)](https://standardjs.com)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

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

## License

[MIT](./LICENSE). The main body of this project comes from [ShowVer](http://www.codeproject.com/Articles/2457/ShowVer-exe-command-line-VERSIONINFO-display-progr) © Ted Peck 2002. Converting between UTF-16 and UTF-8 made possible by [UTF8Conversion](https://code.msdn.microsoft.com/C-UTF-8-Conversion-Helpers-22c0a664) ([Apache License 2.0](http://spdx.org/licenses/Apache-2.0.html)) © 2011 Giovanni Dicanio.
