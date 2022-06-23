# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.1.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.0.1...v7.1.0) (2022-06-23)

### Features

- add IconMenu component ([4559d9d](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/4559d9d5daf78dd2ac2f2221fdf8348546cf12f1))
- add SideNav and related components ([2fd60e3](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/2fd60e3768b6d5479858b456eb9e2869ec0f4011))
- add Table and related components ([6ba7721](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/6ba772130d7a58a885188e38e8385cc0644541d3))
- deprecate DataTable ([4dcc4b4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/4dcc4b4c384539b0b54e3d3066e13d42c0c706b3))
- use native inputs in CheckBox and RadioButton components ([15c4813](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/15c4813e14205788dab1c209d34c82d24d0c63a1))

### Bug Fixes

- ensure all grid columns are the same width ([9fe0499](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/9fe0499f843e9b718c56051723ef6fce08219659))
- fix React warnings ([7a48a2c](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/7a48a2ca0ac27301cfa6fdd58fd274d405a80ab4))
- fix validation error when prop value is null of undefined ([d6921fa](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/d6921faafb944cf21f3a01d27f641c526733c356))
- remove extraneous semicolon ([150a7fe](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/150a7fe21573c4f9f1b1f11abe5a416c2fded4b6))

### [7.0.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.0.0...v7.0.1) (2022-04-27)

### Bug Fixes

- fix exports specification ([45e671f](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/45e671f897956771a5cdb6c748fbcd14e3879fcf))

## [7.0.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.10.1...v7.0.0) (2022-04-26)

### ⚠ BREAKING CHANGES

- ListEntries now uses intrinsic height; components using it
  can provide a className if they need to set a fixed height.
- The exports option is more strict regarding imports,
  only official exports can be imported in other packages.
- All references to deprecated items must be replaced with
  suggested alternatives before using this version.

### Features

- remove all deprecated items ([809180a](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/809180a3f8c46626558c4b358ce5f763f51cfca5))
- remove hardcoded height from ListEntries ([5d3b095](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/5d3b095ee763706ad3089d9cbc4ba006406e03b0))
- use exports in package.json ([e0c8308](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/e0c8308d03869b638a26a8113c3dd0d4361574d6))

### Bug Fixes

- allow values of any type in Tabs.currentTab ([cfcc23f](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/cfcc23feedb1970f01741201e85850801e0cb0e7))

### [6.10.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.10.0...v6.10.1) (2022-04-05)

### Bug Fixes

- add className property to InlineNotification ([adefae6](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/adefae69323d88a34584f4a27febd5cbb1b31497))

## [6.10.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.9.1...v6.10.0) (2022-04-04)

### Features

- add InlineNotification component ([2ec2809](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/2ec28097d6c694bee0d112695e2a3f23a5135d74))
- allow using Breadcrumb without @bluecat/redux-navigation ([fe5bdd4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/fe5bdd45ce7f54c2474691cb7aa68fdbd5b7e098))
- define styles for h[1-6] elements ([3ee41da](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/3ee41daf6275257b45db75b0f10b2dcbe8c1ad5b))
- deprecate EditorTable ([fcd19e5](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/fcd19e51ec99390df031187514b3c967f1c3e43a))
- deprecate functions that were moved to @bluecat/redux-toasts ([334e70a](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/334e70a34176321b9340f6a0e1841a9e48430869))

### Bug Fixes

- fix React validation warnings ([c031c49](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/c031c49cc12627de4c48bc2e8e781c2272b228dc))
- set styles for other input types ([0f4cf45](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/0f4cf45e5385164fd3c6b17e408c899589c04460))
- use "interactive" for active/hover in the DropZone icon ([ced1345](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/ced1345f4e3419f43b1cb5a84ce3eb44be3a59a4))

### [6.9.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.9.0...v6.9.1) (2022-03-03)

### Bug Fixes

- restore default buttons in EditorTable when detailButtons is not set ([6a01dfa](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/6a01dfaaad466684f280aa8ced7969f27029f214))

## [6.9.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.8.0...v6.9.0) (2022-03-02)

### Features

- add asFile property to DropZone ([10e63e1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/10e63e1046c72ce26db7f86527edb07462e84b9f))

## [6.8.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.7.1...v6.8.0) (2022-03-02)

### Features

- add disabled property to DropZone ([3fbd876](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/3fbd876f01d720c82aac8d81ed5866980362741e))
- add helperText property to DropZone ([b7d82cc](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/b7d82cc0c0892cad494832a5e0728605cb5e9321))
- add option to specify custom detail buttons in EditorTable ([94f48ff](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/94f48ffdd0db3ce35d9a8e308bd80292538e8848))

### Bug Fixes

- fix contrast for support-success-inverse ([da6f8bc](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/da6f8bca5a1e38ff6f1a965b99f68e979dfe2686))
- use a button element in DropZone ([f2ce36e](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/f2ce36e7216da72706f97cb7e242f4bf7f376b5e))
- use correct fonts in DataTable ([b364a3a](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/b364a3aa819a919d152f3246f1532669d885b337))

### [6.7.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.7.0...v6.7.1) (2022-02-11)

### Bug Fixes

- fix a11y violation in disabled icon buttons ([ae1dc7e](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/ae1dc7e29bbece436493427402a37be5188d4275))

## [6.7.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.6.3...v6.7.0) (2022-02-10)

### Features

- add CopyButton component ([489c8f0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/489c8f03021d224a7708f71d3b87dcbd47266434))
- add DropZone component ([a3642a3](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/a3642a3923816d03b447315a8b9718ef4f71f64b))

### Bug Fixes

- avoid error running Jest in users of this library ([658c327](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/658c327666eebacdd6d00a99d290c50927142328))
- use a span for disabled icon buttons ([48d1486](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/48d148638bd95a479d3af3c20bfee387409c3d86))

### [6.6.3](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.6.2...v6.6.3) (2022-02-07)

### Bug Fixes

- improve table header separators ([0d31b45](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/0d31b450fec233a18375e327db93c077339c5662))
- replace redux-actions with @bluecat/redux-utils ([3a2defa](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/3a2defaa8f087d8453cd7d5cf11c2e4ef355d6ef))
- use a span for disabled buttons again ([37a6f24](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/37a6f24f7898187f6e3abfc9e11fc60c05a31521))
- workaround for bug in throttleAF in IE ([4956c0f](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/4956c0fd37784c877420f38ba300bfd37a8baff5))

### [6.6.2](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v6.6.1...v6.6.2) (2022-01-26)

### Bug Fixes

- add borders to the table headers ([6a6de59](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/6a6de591c5463de8089a702cf15a83a6ea7db100))
- fix incorrect use of boolean PropTypes ([0a3910e](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/0a3910e69967bb6e4019ac04f7bc842e7e4750a9))
- make icon buttons cyan ([99f9f87](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/99f9f87d7062fad7f222d85eb50bd25559d94b8e))
