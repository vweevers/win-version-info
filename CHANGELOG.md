# Changelog

## [6.0.1] - 2022-06-12

### Fixed

- Restore 32-bit prebuild ([`acb9b62`](https://github.com/vweevers/win-version-info/commit/acb9b62)) (Vincent Weevers)

## [6.0.0] - 2022-06-05

_The 32-bit prebuild was restored in 6.0.1._

### Changed

- **Breaking:** drop Node.js 10 and 12 ([`9c7e4fa`](https://github.com/vweevers/win-version-info/commit/9c7e4fa)) (Vincent Weevers)
- **Breaking:** drop 32-bit prebuild ([`cb1fdec`](https://github.com/vweevers/win-version-info/commit/cb1fdec)) (Vincent Weevers)
- Replace use of `std::ptr_fun` ([`8f5ac34`](https://github.com/vweevers/win-version-info/commit/8f5ac34)) (Vincent Weevers)

## [5.0.1] - 2021-11-11

### Fixed

- Include prebuilds in npm package ([`54fadf8`](https://github.com/vweevers/win-version-info/commit/54fadf8)) (Vincent Weevers)

## [5.0.0] - 2021-11-11

_This version was not published to npm for lack of prebuilds; fixed in 5.0.1._

### Changed

- **Breaking:** drop Node.js 8 ([`b0add44`](https://github.com/vweevers/win-version-info/commit/b0add44)) (Vincent Weevers)
- Move to Node-API with prebuildify ([`cf5c6c7`](https://github.com/vweevers/win-version-info/commit/cf5c6c7)) (Vincent Weevers).

## [4.0.0] - 2021-06-07

### Changed

- **Breaking:** bump `prebuild-install` from 5.x to 6.x ([`37bd9c9`](https://github.com/vweevers/win-version-info/commit/37bd9c9)) (Vincent Weevers)
- Bump `standard` devDependency ([`d74d7a8`](https://github.com/vweevers/win-version-info/commit/d74d7a8)) (Vincent Weevers)

### Added

- Run tests & prebuild for node 16 ([#21](https://github.com/vweevers/win-version-info/issues/21)) ([`764c868`](https://github.com/vweevers/win-version-info/commit/764c868)) (Tim Perry)

## [3.1.1] - 2020-08-16

### Fixed

- Move `PREBUILD_TOKEN` to AppVeyor ([`a53a1ef`](https://github.com/vweevers/win-version-info/commit/a53a1ef)) ([**@vweevers**](https://github.com/vweevers))

## [3.1.0] - 2020-08-16

### Changed

- Unlock dependencies ([`0424fbc`](https://github.com/vweevers/win-version-info/commit/0424fbc)) ([**@vweevers**](https://github.com/vweevers))
- Upgrade `prebuild` devDependency from `^9.0.0` to `^10.0.0` ([`e0f7d5f`](https://github.com/vweevers/win-version-info/commit/e0f7d5f)) ([**@vweevers**](https://github.com/vweevers))
- Upgrade `tape` devDependency from `^4.10.1` to `^5.0.0` ([#15](https://github.com/vweevers/win-version-info/issues/15)) ([**@vweevers**](https://github.com/vweevers))
- Upgrade `hallmark` devDependency from `^0.1.0` to `^2.0.0` ([#9](https://github.com/vweevers/win-version-info/issues/9), [#12](https://github.com/vweevers/win-version-info/issues/12)) ([**@vweevers**](https://github.com/vweevers))
- Upgrade `standard` devDependency from `^12.0.1` to `^14.0.0` ([#8](https://github.com/vweevers/win-version-info/issues/8), [#11](https://github.com/vweevers/win-version-info/issues/11)) ([**@vweevers**](https://github.com/vweevers))

### Added

- Build for Node 14 ([#16](https://github.com/vweevers/win-version-info/issues/16)) ([`4219f68`](https://github.com/vweevers/win-version-info/commit/4219f68)) ([**@pimterry**](https://github.com/pimterry))

## [3.0.1] - 2019-06-11

### Changed

- Upgrade `prebuild` from `^8.2.1` to `^9.0.0` ([#6](https://github.com/vweevers/win-version-info/issues/6))

### Fixed

- Don't skip building if cross-compiling ([#7](https://github.com/vweevers/win-version-info/issues/7)) ([**@pimterry**](https://github.com/pimterry))

## [3.0.0] - 2019-06-01

### Changed

- Update dependencies to enable Greenkeeper ([#3](https://github.com/vweevers/win-version-info/issues/3))
- Move changelog to `CHANGELOG.md` ([`7e3bb93`](https://github.com/vweevers/win-version-info/commit/7e3bb93))
- Tweak `README.md` ([`8b37083`](https://github.com/vweevers/win-version-info/commit/8b37083))

### Added

- Enable prebuilding for Node 12 ([`8307488`](https://github.com/vweevers/win-version-info/commit/8307488), [`e4f620e`](https://github.com/vweevers/win-version-info/commit/e4f620e)) ([#5](https://github.com/vweevers/win-version-info/issues/5)) ([**@pimterry**](https://github.com/pimterry))

### Removed

- **Breaking:** Drop node 6 and 9 ([`560c955`](https://github.com/vweevers/win-version-info/commit/560c955)) ([#5](https://github.com/vweevers/win-version-info/issues/5))

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

- **Breaking:** Drop Node 4, 5 and 7

## [2.0.0-beta1] - 2016-12-03

### Added

- Add prebuilds for Node 4 - 7
- Add CLI

### Fixed

- Trim values
- Ignore empty values and `0.0.0.0` versions

### Removed

- Drop Node < 4 support

## [1.0.1] - 2016-03-27

### Fixed

- Fix installation of prebuilds

## [1.0.0] - 2016-03-27

:seedling: Initial release.

[6.0.1]: https://github.com/vweevers/win-version-info/releases/tag/v6.0.1

[6.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v6.0.0

[5.0.1]: https://github.com/vweevers/win-version-info/releases/tag/v5.0.1

[5.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v5.0.0

[4.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v4.0.0

[3.1.1]: https://github.com/vweevers/win-version-info/releases/tag/v3.1.1

[3.1.0]: https://github.com/vweevers/win-version-info/releases/tag/v3.1.0

[3.0.1]: https://github.com/vweevers/win-version-info/releases/tag/v3.0.1

[3.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v3.0.0

[2.1.0]: https://github.com/vweevers/win-version-info/releases/tag/v2.1.0

[2.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v2.0.0

[2.0.0-beta1]: https://github.com/vweevers/win-version-info/releases/tag/v2.0.0-beta1

[1.0.1]: https://github.com/vweevers/win-version-info/releases/tag/v1.0.1

[1.0.0]: https://github.com/vweevers/win-version-info/releases/tag/v1.0.0
