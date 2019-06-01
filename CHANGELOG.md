# Changelog

_**If you are upgrading:** please see [`UPGRADING.md`](UPGRADING.md)._

## [Unreleased][unreleased]

## [3.0.0] - 2019-06-01

### Changed

- Update dependencies to enable Greenkeeper ([#3](https://github.com/vweevers/win-version-info/issues/3))
- Move changelog to `CHANGELOG.md` ([`7e3bb93`](https://github.com/vweevers/win-version-info/commit/7e3bb93))
- Tweak `README.md` ([`8b37083`](https://github.com/vweevers/win-version-info/commit/8b37083))

### Added

- Enable prebuilding for Node 12 ([`8307488`](https://github.com/vweevers/win-version-info/commit/8307488), [`e4f620e`](https://github.com/vweevers/win-version-info/commit/e4f620e)) ([#5](https://github.com/vweevers/win-version-info/issues/5)) ([**@pimterry**](https://github.com/pimterry))

### Removed

- Drop node 6 and 9 ([`560c955`](https://github.com/vweevers/win-version-info/commit/560c955)) ([#5](https://github.com/vweevers/win-version-info/issues/5))

### Fixed

- Fix node 12 ([`16c0004`](https://github.com/vweevers/win-version-info/commit/16c0004)) ([#5](https://github.com/vweevers/win-version-info/issues/5))

## [2.1.0] - 2018-11-18

### Changed

- Remove (need for) `os` filter in `package.json`
- Update `nan` from `~2.10.0` to `~2.11.1`
- Update `prebuild-install` from `~4.0.0` to `~5.2.1`
- Update `prebuild` devDependency from `~7.6.0` to `~8.1.2`

### Added

- Add `standard`

## [2.0.0] - 2018-05-19

### Added

- Add prebuilds for Node 8, 9 and 10

### Removed

- Drop Node 4, 5 and 7

## [2.0.0-beta1] - 2016-12-03

### Added

- Add prebuilds for Node 4 - 7
- Add CLI

### Fixed

- Trim values
- Ignore empty values and `0.0.0.0` versions

### Removed

- Drop Node &lt; 4 support

## [1.0.1] - 2016-03-27

### Fixed

- Fix installation of prebuilds

## 1.0.0 - 2016-03-27

:seedling: Initial release.

[unreleased]: https://github.com/vweevers/win-version-info/compare/v3.0.0...HEAD

[3.0.0]: https://github.com/vweevers/win-version-info/compare/v2.1.0...v3.0.0

[2.1.0]: https://github.com/vweevers/win-version-info/compare/v2.0.0...v2.1.0

[2.0.0]: https://github.com/vweevers/win-version-info/compare/v2.0.0-beta1...v2.0.0

[2.0.0-beta1]: https://github.com/vweevers/win-version-info/compare/v1.0.1...v2.0.0-beta1

[1.0.1]: https://github.com/vweevers/win-version-info/compare/v1.0.0...v1.0.1
