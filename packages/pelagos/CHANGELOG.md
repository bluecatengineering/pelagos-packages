# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [12.22.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.21.0...@bluecateng/pelagos@12.22.0) (2025-09-23)

### Features

- add support for additional locales ([b66d55c](https://github.com/bluecatengineering/pelagos-packages/commit/b66d55c0d0630c78127959ea2624533fd28c2941))

## [12.21.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.20.1...@bluecateng/pelagos@12.21.0) (2025-09-17)

### Features

- add disabled property to ListInput ([e278e14](https://github.com/bluecatengineering/pelagos-packages/commit/e278e14eec025f9aab6d2d44c1cf67c3b9f7e439))

### Bug Fixes

- make list selector dialog columns scrollable above the medium breakpoint ([546805b](https://github.com/bluecatengineering/pelagos-packages/commit/546805b12f512bbd1bbf82fa3d7e682e06f5111f))

## [12.20.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.20.0...@bluecateng/pelagos@12.20.1) (2025-09-10)

### Bug Fixes

- avoid error in Select when the focused option is not found ([293ab65](https://github.com/bluecatengineering/pelagos-packages/commit/293ab65f5b02d3c93e60d08fe651051958ea8dce))
- change propTypes and TypeScript property definitions to match ([596d49b](https://github.com/bluecatengineering/pelagos-packages/commit/596d49bbb8bf447f7b7dcfae81bec6f709a1f9f0))
- change setRefs to a hook ([c61579a](https://github.com/bluecatengineering/pelagos-packages/commit/c61579a3b10c86b09db1de443dfbacd034c364ca))
- reduce details panel padding below the medium breakpoint ([5ccf9f7](https://github.com/bluecatengineering/pelagos-packages/commit/5ccf9f729e981c9dd435ab1ceb5be691a05f917b))

## [12.20.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.19.1...@bluecateng/pelagos@12.20.0) (2025-08-21)

### Features

- add scrollable property to Dialog ([c1e5585](https://github.com/bluecatengineering/pelagos-packages/commit/c1e55856e9c0fbf67399fd688e1623b01505bdcc))
- add typescript definitions to pelagos components ([4367938](https://github.com/bluecatengineering/pelagos-packages/commit/4367938829c634378c10dedb4e824329b10830a4))

### Bug Fixes

- make the entire details panel scrollable below the medium breakpoint ([e0b9773](https://github.com/bluecatengineering/pelagos-packages/commit/e0b97733f2e22264af09c2d93d3e7623ea627177))
- make the entire dialog scrollable below the medium breakpoint ([4d44c98](https://github.com/bluecatengineering/pelagos-packages/commit/4d44c987457ee3c0a35b98f5b2d1e36251f8999c))
- use padding rather than margin for the dialog body ([b31de5c](https://github.com/bluecatengineering/pelagos-packages/commit/b31de5cbdf14f97e79e9ca8839e2a36bd9262fec))

## [12.19.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.19.0...@bluecateng/pelagos@12.19.1) (2025-07-18)

### Bug Fixes

- improve remove handling in ListInput ([6a9748e](https://github.com/bluecatengineering/pelagos-packages/commit/6a9748e93eaafd7ef4cb180f3bd82161ccbf0cea))

## [12.19.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.18.1...@bluecateng/pelagos@12.19.0) (2025-07-17)

### Features

- remove link underlines again ([a2568e8](https://github.com/bluecatengineering/pelagos-packages/commit/a2568e8ad59073a6fa3a1f109a52bd3de732f63e))

### Bug Fixes

- improve click behaviour in useMenuHandler ([3dd77ad](https://github.com/bluecatengineering/pelagos-packages/commit/3dd77ad6397948b32dc84fd8605bc8b0d32f2408))
- improve click behaviour of pop-up focus traps ([e6f74aa](https://github.com/bluecatengineering/pelagos-packages/commit/e6f74aa938a1160506b8990345ffa53f4f388b87))
- use rem to set breakpoint sizes ([3a1d327](https://github.com/bluecatengineering/pelagos-packages/commit/3a1d3277a8e30d5046f33f2fc6ddf1df5b142ca0))

## [12.18.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.18.0...@bluecateng/pelagos@12.18.1) (2025-06-19)

### Bug Fixes

- create separate callbacks for event handlers ([e812c6e](https://github.com/bluecatengineering/pelagos-packages/commit/e812c6e7ca771a8fa3c90cd400ae97390ac14667))

## [12.18.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.17.2...@bluecateng/pelagos@12.18.0) (2025-06-13)

### Features

- add property to display a help link in Dialog ([f3f8e9c](https://github.com/bluecatengineering/pelagos-packages/commit/f3f8e9cecad8ec8020e56001fd8601a3897211e1))
- add property to display an icon in the tags ([ccd37bd](https://github.com/bluecatengineering/pelagos-packages/commit/ccd37bd5057c98cf6450ee9288687af2fd68859b))
- add TagComboBox component ([3db7beb](https://github.com/bluecatengineering/pelagos-packages/commit/3db7beb3b5d221171dfed6d8b2d76226181e2ce2))

## [12.17.2](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.17.1...@bluecateng/pelagos@12.17.2) (2025-06-03)

### Bug Fixes

- add workaround for bug in VoiceOver announcing aria-selected ([22d1aba](https://github.com/bluecatengineering/pelagos-packages/commit/22d1aba8b47dc968d59c5037dfcb909822978fad))
- hide tooltip when escape is pressed even if not focused ([b304141](https://github.com/bluecatengineering/pelagos-packages/commit/b304141611238478d8472401fede36e56770286a))
- move disabled cursor in Toggle to the correct element ([851575e](https://github.com/bluecatengineering/pelagos-packages/commit/851575eb27d1f20ccdd5b6bdf79133410ef6131f))
- pass title to Label in LabelLine ([a1ea9cf](https://github.com/bluecatengineering/pelagos-packages/commit/a1ea9cf8f93610deac0679c499429d740ef600d4))
- pass title to Level in DetailRegion ([9383739](https://github.com/bluecatengineering/pelagos-packages/commit/93837398291a668288a54cfbeee8cd5e5e057312))
- set tooltip position again if the size changes when displayed ([0fbe446](https://github.com/bluecatengineering/pelagos-packages/commit/0fbe4464a0fab03f02249959f037817965531c77))

## [12.17.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.17.0...@bluecateng/pelagos@12.17.1) (2025-05-21)

### Bug Fixes

- don't hide tooltip when the mouse moves between the button and the tooltip ([952544b](https://github.com/bluecatengineering/pelagos-packages/commit/952544ba6db205b35f3b1c8db096719d2b5bd98e))
- fix type for reorderable in ListInput ([dbdf405](https://github.com/bluecatengineering/pelagos-packages/commit/dbdf4055fe2bd0ec4585cd2cb27eae84db173704))
- hide tooltip when escape is pressed ([e4f8988](https://github.com/bluecatengineering/pelagos-packages/commit/e4f89884c82718f65a55cf3e70f6c1b85dd7227e))
- mark the toast container as live area ([6212d8f](https://github.com/bluecatengineering/pelagos-packages/commit/6212d8fa15145c77bb402f8b4cc7051b79228887))
- move box shadow on expand from IconButton to IconMenu ([dfdb0a5](https://github.com/bluecatengineering/pelagos-packages/commit/dfdb0a57eb4e080ff55884bcc0a17618d6979e93))

## [12.17.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.9...@bluecateng/pelagos@12.17.0) (2025-05-16)

### Features

- add option to show numbers in reorderable list entries ([05e56ce](https://github.com/bluecatengineering/pelagos-packages/commit/05e56ce6ee91ea7ae5dfea7cbd3f941b1f616635))

### Bug Fixes

- handle mouse events on calendar table cell spans ([ae311d4](https://github.com/bluecatengineering/pelagos-packages/commit/ae311d42fe2d0589374d4dda81e4262b56a06726))
- reposition calendar popup on resize and scroll ([96ac63e](https://github.com/bluecatengineering/pelagos-packages/commit/96ac63efd39b91db3342f5e3f75dddaf8ed083cf))
- set overflow: hidden on ListEntries\_\_entry ([c9a3189](https://github.com/bluecatengineering/pelagos-packages/commit/c9a3189b12ef7ba1adf348e98d46a659857b3f15))

## [12.16.9](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.8...@bluecateng/pelagos@12.16.9) (2025-05-14)

### Bug Fixes

- leave table sort icons fully visible at all times ([86ed942](https://github.com/bluecatengineering/pelagos-packages/commit/86ed942410aca144a9a5138292397cbe8593df5d))
- update initial focus selector in DateInput ([ede1512](https://github.com/bluecatengineering/pelagos-packages/commit/ede1512ffcfdd17d0ea83b922656f053887eda59))

## [12.16.8](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.7...@bluecateng/pelagos@12.16.8) (2025-05-13)

### Bug Fixes

- fix a11y issues in Calendar ([eb71a42](https://github.com/bluecatengineering/pelagos-packages/commit/eb71a42ac66c6f01439f89b4cf8fe80e424edfc7))
- fix incorrect use of p element ([4e782d3](https://github.com/bluecatengineering/pelagos-packages/commit/4e782d379677285ee5acdf9a4da4a1ff3a909a6a))
- separate field errors from save errors ([5b1980c](https://github.com/bluecatengineering/pelagos-packages/commit/5b1980c7c883e6283987c0aed02939d45107b10f))
- swap columns in ListSelector per new designs ([2d2fc13](https://github.com/bluecatengineering/pelagos-packages/commit/2d2fc132fca47387b9d04b408af55142b46bf083))
- use key instead of keyCode ([69aa05c](https://github.com/bluecatengineering/pelagos-packages/commit/69aa05cafa7a442a18f46913a6e8c914fe2dfe04))

## [12.16.7](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.6...@bluecateng/pelagos@12.16.7) (2025-04-22)

### Bug Fixes

- show the close button on all toasts with actions ([df2880b](https://github.com/bluecatengineering/pelagos-packages/commit/df2880bef456f9040f203b19679124329aeb8a49))
- truncate long strings in ListSelector ([f542ff9](https://github.com/bluecatengineering/pelagos-packages/commit/f542ff941df6cf8f6e1e9bcfd9d35bc71cd2ed38))

## [12.16.6](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.5...@bluecateng/pelagos@12.16.6) (2025-04-10)

### Bug Fixes

- increase tree view toggle size to 24x24 ([66256ee](https://github.com/bluecatengineering/pelagos-packages/commit/66256eeca6e4b27295c73bdcb4de90b0b0d46711))
- use 2px for all focus rings ([6378c4c](https://github.com/bluecatengineering/pelagos-packages/commit/6378c4cc9de5d230e6286d74495a2ff27fec1f79))
- use updatePlaybackRate to avoid leaving tooltips in the screen ([5c319db](https://github.com/bluecatengineering/pelagos-packages/commit/5c319db3b81ffbd911371daad7713f194a7f300a))

## [12.16.5](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.4...@bluecateng/pelagos@12.16.5) (2025-04-09)

### Bug Fixes

- use forwardRef in Tag ([ffbd262](https://github.com/bluecatengineering/pelagos-packages/commit/ffbd262d4fce140423e2a00e6bba7cf489dc25de))

## [12.16.4](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.3...@bluecateng/pelagos@12.16.4) (2025-04-09)

### Bug Fixes

- export useSelectPositioner ([2effe60](https://github.com/bluecatengineering/pelagos-packages/commit/2effe608d127580d436a14d9f34ee3b66e7f6dea))

## [12.16.3](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.2...@bluecateng/pelagos@12.16.3) (2025-04-04)

### Bug Fixes

- allow a different focus selector in useReorder ([5c863d3](https://github.com/bluecatengineering/pelagos-packages/commit/5c863d363251fbf50ca92a494e0b200cf79747f1))

## [12.16.2](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.1...@bluecateng/pelagos@12.16.2) (2025-04-03)

### Bug Fixes

- add className property to TagInput and pass event back to handlers ([13d34bb](https://github.com/bluecatengineering/pelagos-packages/commit/13d34bbf8f8ec641ef19dc84070b0daecd301ebd))

## [12.16.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.16.0...@bluecateng/pelagos@12.16.1) (2025-02-25)

### Bug Fixes

- allow closing toast messages when Dialog is displayed ([1711aec](https://github.com/bluecatengineering/pelagos-packages/commit/1711aec4aa101c1ab5ec7d0420d6bd81e1a0e3ed))
- prevent id conflicts when rendering multiple ListEntries components ([ae73ce2](https://github.com/bluecatengineering/pelagos-packages/commit/ae73ce2def0e658bdfc5beafe308d15deaa8f179))

## [12.16.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.15.1...@bluecateng/pelagos@12.16.0) (2024-08-28)

### Features

- implement drag-and-drop reordering in ListEntries ([05a3adf](https://github.com/bluecatengineering/pelagos-packages/commit/05a3adffdfe2d4ead2a3a8288005f4a075341b42))

### Bug Fixes

- prevent focus of disabled select components ([21f6527](https://github.com/bluecatengineering/pelagos-packages/commit/21f652717c56eab6ebfaec875ca179579da7a40d))

## [12.15.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.15.0...@bluecateng/pelagos@12.15.1) (2024-08-07)

### Bug Fixes

- add className property to ListInput ([806d9c9](https://github.com/bluecatengineering/pelagos-packages/commit/806d9c940dab8af487dc131a9dbe88e55000448b))
- use a div for LabelLine counter ([dc3953d](https://github.com/bluecatengineering/pelagos-packages/commit/dc3953dd9352a6e6f357be4e3b59f9cd73c25feb))

## [12.15.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.14.1...@bluecateng/pelagos@12.15.0) (2024-07-17)

### Features

- add option to display a character counter in TextAreaField ([ce4b554](https://github.com/bluecatengineering/pelagos-packages/commit/ce4b554a53445bda7fb584ffc0496d868dd92ff4))
- export useRandomId ([5673f9d](https://github.com/bluecatengineering/pelagos-packages/commit/5673f9d86f37014132367b120131b170251f7c56))
- extract ListSelector component ([869f8aa](https://github.com/bluecatengineering/pelagos-packages/commit/869f8aa3913d503bdf74d7d70711865ab2a3eb90))
- update ListEntries component per UX designs ([cfde3d9](https://github.com/bluecatengineering/pelagos-packages/commit/cfde3d9a2818137fbb0ee6f46266d7bc861d2105))

### Bug Fixes

- allow focusing disabled menu entries ([7ac559d](https://github.com/bluecatengineering/pelagos-packages/commit/7ac559d46ad5d5959ffdf09fad6072e1f6901d13))
- use useRandomId instead of making id required ([d4faa9b](https://github.com/bluecatengineering/pelagos-packages/commit/d4faa9b73c39f28a72b5448b99f2f60854073b9d))

## [12.14.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.14.0...@bluecateng/pelagos@12.14.1) (2024-07-04)

### Bug Fixes

- add missing exports for VerticalTab and VerticalTabList ([a372e3a](https://github.com/bluecatengineering/pelagos-packages/commit/a372e3abbd41ff0b638909bf9f4289028e8f31b4))

## [12.14.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.13.1...@bluecateng/pelagos@12.14.0) (2024-07-03)

### Features

- add option to resize table columns ([19d4fdb](https://github.com/bluecatengineering/pelagos-packages/commit/19d4fdba23ce64cd223f6faee560043b518ae2a6))
- add option to set fixed column widths on the table ([99d92b1](https://github.com/bluecatengineering/pelagos-packages/commit/99d92b1f0b71d11599e1f31f4552ccd709218180))

### Reverts

- revert workaround for Table focus ring ([3f7ca5e](https://github.com/bluecatengineering/pelagos-packages/commit/3f7ca5e8aa4ced8ded1210fc2ac517809e71244b))

## [12.13.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.13.0...@bluecateng/pelagos@12.13.1) (2024-06-26)

### Bug Fixes

- add missing export for TimeFilterEditor ([31d17f9](https://github.com/bluecatengineering/pelagos-packages/commit/31d17f964dc8c26a120218dac7118647fadfeb61))
- set aria-labelledby on the TimeFilterEditor ([1945b3e](https://github.com/bluecatengineering/pelagos-packages/commit/1945b3ec4b4d2c08c622d33b0384aa76b0b6c0ac))

## [12.13.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.12.1...@bluecateng/pelagos@12.13.0) (2024-06-25)

### Features

- add confirm button type to confirm dialog ([5023052](https://github.com/bluecatengineering/pelagos-packages/commit/50230527c666649564ae66a1a30457cde4cc1eb4))
- add time filter editor ([1b12196](https://github.com/bluecatengineering/pelagos-packages/commit/1b12196bef8c59a3de69efee5061902f6ebea4b8))
- add vertical tabs component ([5d073bd](https://github.com/bluecatengineering/pelagos-packages/commit/5d073bd3adaf94e75647632cce8aecb1b4c43819))

### Bug Fixes

- align filter button to the box end ([606f820](https://github.com/bluecatengineering/pelagos-packages/commit/606f8201e256e890bae42d5135fb2f057ef1c75c))
- update text field read-only styles per new specs ([39397e9](https://github.com/bluecatengineering/pelagos-packages/commit/39397e9235e6ec2ce2d837041c1e41c9ecd58192))
- use a thinner mark in checkboxes ([ef31090](https://github.com/bluecatengineering/pelagos-packages/commit/ef31090a92993de52e0b2b2de31d1f6d803733d3))

## [12.12.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.12.0...@bluecateng/pelagos@12.12.1) (2024-06-06)

### Bug Fixes

- fix incorrect search box background in default table toolbar ([f816a10](https://github.com/bluecatengineering/pelagos-packages/commit/f816a108b613667497bec471e63072f2b844128f))

## [12.12.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.11.2...@bluecateng/pelagos@12.12.0) (2024-06-05)

### Features

- add expanded property to FilterArea ([f3b7644](https://github.com/bluecatengineering/pelagos-packages/commit/f3b76449b54029e57dc8584a43c8e82b3da13cd3))
- add list selector dialog ([43e7333](https://github.com/bluecatengineering/pelagos-packages/commit/43e7333335db1ee6e1b26453ca2941873b9da643))
- add Search component ([b7c97b7](https://github.com/bluecatengineering/pelagos-packages/commit/b7c97b7b0bcab0d0936d87ae0a69043b84ce08c5))
- add sectioned table toolbar ([16c845f](https://github.com/bluecatengineering/pelagos-packages/commit/16c845f4e1fee6a2fdd4d92b60f927b9a018a7e9))

### Bug Fixes

- remove obsolete defaultProps ([0b65593](https://github.com/bluecatengineering/pelagos-packages/commit/0b655931265c973169ea4c2a3bc7c42083223f3e))

## [12.11.2](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.11.2...@bluecateng/pelagos@12.11.2) (2024-05-28)

### Bug Fixes

- add option to align the table toolbar to the start ([d70ad22](https://github.com/bluecatengineering/pelagos-packages/commit/d70ad226209db1209f8f8f2d3753efc5f0ddfe98))

## [12.11.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.11.0...@bluecateng/pelagos@12.11.1) (2024-05-23)

### Bug Fixes

- add resize listeners in pop-up positioner hooks ([eb4abdf](https://github.com/bluecatengineering/pelagos-packages/commit/eb4abdf6892637e77282307655329c2e54ad5452))
- display Select correctly in mixed theme setups ([af7863f](https://github.com/bluecatengineering/pelagos-packages/commit/af7863f3a82d31fadeff8e22ee5f1111baa09c48))
- fix warning in TreeNode when state is changed on render ([7e1fa9f](https://github.com/bluecatengineering/pelagos-packages/commit/7e1fa9fe967feaa536d7114415e3522cb36af9b0))
- remove size restriction on breadcrumb links ([481a8f6](https://github.com/bluecatengineering/pelagos-packages/commit/481a8f68ffb7fda6f2d799d4ce573841635afbd9))
- remove usages of field-disabled ([0d17879](https://github.com/bluecatengineering/pelagos-packages/commit/0d17879d404d88e6d5389c48e075f904872144a7))
- truncate ContentSwitcher buttons with an ellipsis ([dc1134e](https://github.com/bluecatengineering/pelagos-packages/commit/dc1134e66d12ed7b96a665589f199f5bb7608f4d))
- truncate detail region labels if too long ([e3f10c4](https://github.com/bluecatengineering/pelagos-packages/commit/e3f10c484313e6bb790ef901993e8f1fb493a920))

## [12.11.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.10.1...@bluecateng/pelagos@12.11.0) (2024-05-03)

### Features

- add condensed fonts ([682cd0e](https://github.com/bluecatengineering/pelagos-packages/commit/682cd0e7d6b1c4aae85d459a33ed33256c58afc9))
- change default font to Roboto ([ad54e8d](https://github.com/bluecatengineering/pelagos-packages/commit/ad54e8d448714d4bc50959925224a2ad470d039d))

### Bug Fixes

- allow using fragments as children of TableBody ([a32676e](https://github.com/bluecatengineering/pelagos-packages/commit/a32676e36f1620ed1bfb674617d9876fd6a91713))

## [12.10.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.10.0...@bluecateng/pelagos@12.10.1) (2024-05-01)

### Bug Fixes

- export components for expandable table rows ([b7b2781](https://github.com/bluecatengineering/pelagos-packages/commit/b7b2781cc80e1c2c82ad19b2c843f1521c1be415))

## [12.10.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.9.1...@bluecateng/pelagos@12.10.0) (2024-04-30)

### Features

- add transform function to tag input ([#179](https://github.com/bluecatengineering/pelagos-packages/issues/179)) ([8fd9f58](https://github.com/bluecatengineering/pelagos-packages/commit/8fd9f58b32f5706a564f4a4832c4ded25ec9d235))
- implement expandable table rows ([6073442](https://github.com/bluecatengineering/pelagos-packages/commit/6073442312a1dcba1ad156fa3b0a27c2f9cb972f))

### Bug Fixes

- ensure the table search shrinks to 0 width ([a190d6f](https://github.com/bluecatengineering/pelagos-packages/commit/a190d6ff2bffd6ba74d5bb7cb0381b6df4dadcef))
- set background colour for TagInput when disabled ([a17b970](https://github.com/bluecatengineering/pelagos-packages/commit/a17b97068c8bce5b6d2efc503bc0b066a988b7e1))
- stretch the Dialog form ([0e843b9](https://github.com/bluecatengineering/pelagos-packages/commit/0e843b98b982f1cd6e2b7c8d43ec7cbcc068b1e5))
- use 100% height rather than flex in the Dialog form ([3622b2c](https://github.com/bluecatengineering/pelagos-packages/commit/3622b2c1f01d19fc3e00f416b92e6b786f690078))

## [12.9.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.9.0...@bluecateng/pelagos@12.9.1) (2024-04-12)

### Bug Fixes

- update focused node when node visibility changes ([e7a0452](https://github.com/bluecatengineering/pelagos-packages/commit/e7a0452072f3577f6a7a1231a3880c419c1c6535))

## [12.9.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.8.1...@bluecateng/pelagos@12.9.0) (2024-04-10)

### Features

- add action text to Toggle ([c6dafbc](https://github.com/bluecatengineering/pelagos-packages/commit/c6dafbc101e547300676cf0afe80a83d6db1b08f))
- add disabled state to tag input ([93245d2](https://github.com/bluecatengineering/pelagos-packages/commit/93245d2be0db05a33cff8879ece30d528da1e4c3))
- use a path to identify the selected node in TreeView ([4c00aab](https://github.com/bluecatengineering/pelagos-packages/commit/4c00aab08c282a87a43d7141f8274a7a9a98f96e))

### Bug Fixes

- add small breakpoint (320px) ([a88f7b5](https://github.com/bluecatengineering/pelagos-packages/commit/a88f7b5801fa2c441bac87f79f70c7053c4b180f))
- allow removing tabs using either delete or backspace ([0ab03e9](https://github.com/bluecatengineering/pelagos-packages/commit/0ab03e93c67b37a1647a62f10d55eee5f9aeb33d))
- change default light and dark themes to white and g100 ([962c6c9](https://github.com/bluecatengineering/pelagos-packages/commit/962c6c98593ea56d6fe008ff1bda013db1d30b2e))
- fix a11y issues ([7c794b5](https://github.com/bluecatengineering/pelagos-packages/commit/7c794b579fa897376b2cab2241fd5e8bb4e4f689))
- fix FilterChip behaviour ([d40577a](https://github.com/bluecatengineering/pelagos-packages/commit/d40577a57a91244977549328fd9799fd1253d493))
- handle correctly arrow up/down at deeper levels ([5622440](https://github.com/bluecatengineering/pelagos-packages/commit/56224403dd3c7ed58023e8f17e3287b45b6d5afe))
- increase contrast in dark skeleton colours ([4ade6eb](https://github.com/bluecatengineering/pelagos-packages/commit/4ade6eb443e2102abc686cb49b83cbd634fa846b))
- remove both parameters from onToggle ([44597ba](https://github.com/bluecatengineering/pelagos-packages/commit/44597ba0e4a6ad478807795d7d905d4f2b36171d))
- remove support for legacy icons in TreeNode ([933f651](https://github.com/bluecatengineering/pelagos-packages/commit/933f65114cec041fad94bd8fe9850823aeab3326))
- set role and label on the tree spinner ([1a90a98](https://github.com/bluecatengineering/pelagos-packages/commit/1a90a98bec7660b696c3264fabacda56297fa9a7))
- use a nested form inside dialogs ([48df6f0](https://github.com/bluecatengineering/pelagos-packages/commit/48df6f039b27f8cbda72835541f304bbc6ea289f))
- use a pointer cursor in ContentSwitcher buttons ([7abed67](https://github.com/bluecatengineering/pelagos-packages/commit/7abed676e6948b3a386268b1734030be392a213a))
- use a workaround for focus ring on Table ([de7b587](https://github.com/bluecatengineering/pelagos-packages/commit/de7b587187a3fa490d5546b11fc9f14252b24026))
- use combobox role for Select ([fb4e6fa](https://github.com/bluecatengineering/pelagos-packages/commit/fb4e6faf62046e6209bad9549b7480a4b5fd1953))

## [12.8.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.8.0...@bluecateng/pelagos@12.8.1) (2024-02-02)

### Bug Fixes

- add a less mixin for the warning icon fill ([9955d15](https://github.com/bluecatengineering/pelagos-packages/commit/9955d1515817549df29845d20245a0d3cd635838))

## [12.8.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.7.1...@bluecateng/pelagos@12.8.0) (2024-02-01)

### Features

- add danger buttons ([ff3e76c](https://github.com/bluecatengineering/pelagos-packages/commit/ff3e76c9b1f44dec5d495c35301da5662723e51d))
- add ProgressIndicator component ([3f3bd15](https://github.com/bluecatengineering/pelagos-packages/commit/3f3bd15ea8aab3f3ff17d57bccfcbf937bade0a6))
- use Carbon icons ([15db067](https://github.com/bluecatengineering/pelagos-packages/commit/15db067789e3066086c6086f7fe3b45c401a88b5))

### Bug Fixes

- add aria label and tooltip to Pagination buttons ([3b06f57](https://github.com/bluecatengineering/pelagos-packages/commit/3b06f576aab845629324f215cf96c7b4f48ca935))
- fix accessibility issues ([cfb9e50](https://github.com/bluecatengineering/pelagos-packages/commit/cfb9e50e19abc6dbc0a725fe8a9042355425050c))
- set value in select elements rather than selected in the options ([858c6b1](https://github.com/bluecatengineering/pelagos-packages/commit/858c6b15be56aa1319326f1a713ca7019a27f18a))

## [12.7.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.7.0...@bluecateng/pelagos@12.7.1) (2024-01-19)

### Bug Fixes

- handle alphabetic keys in Select when closed ([4e20c5c](https://github.com/bluecatengineering/pelagos-packages/commit/4e20c5cc704b24e63a2bd7c31c5f4ad9e27e16b0))

## [12.7.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.6.0...@bluecateng/pelagos@12.7.0) (2024-01-16)

### Features

- add optional icon property to CopyButton ([ffb7000](https://github.com/bluecatengineering/pelagos-packages/commit/ffb70009b0f60b98de531d77f593f5d1a0549b9e))

### Bug Fixes

- fix error when TabList is unmounted by Suspense ([96e0beb](https://github.com/bluecatengineering/pelagos-packages/commit/96e0beb89198003a41d559f848467fdcc7ed9001))
- improve Breadcrumb ([3740107](https://github.com/bluecatengineering/pelagos-packages/commit/37401072cb76313999afc8b5f1e34839b131c029))
- improve Table styles ([2545bb4](https://github.com/bluecatengineering/pelagos-packages/commit/2545bb4e1ad347ecf44e4ca5de6470d22b63722b))
- remove Dialog shadow per Carbon v11 ([aa936a2](https://github.com/bluecatengineering/pelagos-packages/commit/aa936a2f51691be8701e7f6eb3938eeb287d44b6))
- set aria-describedby only if it was saved ([97b8938](https://github.com/bluecatengineering/pelagos-packages/commit/97b8938ca65647b273a3f8134516628a4a9a5ab8))
- use correct icon in ButtonMenu ([c081f60](https://github.com/bluecatengineering/pelagos-packages/commit/c081f60b3edbd8a8ae43d8f5da577a5352cafdcb))

## [12.6.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.5.2...@bluecateng/pelagos@12.6.0) (2023-12-04)

### Features

- add ProgressBar component ([1fc66f6](https://github.com/bluecatengineering/pelagos-packages/commit/1fc66f6b7744ea96f8e7cfaa5f7143a653a585ed))
- define font tokens per Carbon v11 ([c6269a4](https://github.com/bluecatengineering/pelagos-packages/commit/c6269a459694e5c65a04abcdc8015250ba20f0ce))
- mark legacy font tokens as deprecated ([fb9294e](https://github.com/bluecatengineering/pelagos-packages/commit/fb9294e372058ef61ca1d662701039fe56042c91))
- use Carbon font tokens ([df6a03b](https://github.com/bluecatengineering/pelagos-packages/commit/df6a03b630b672d9a079006c940daeaef1eb36d9))

### Bug Fixes

- avoid order dependent position between IconButton and EditorDetailsPanel ([ab2dde8](https://github.com/bluecatengineering/pelagos-packages/commit/ab2dde85f43e50914dd9211315195451f71552ff))
- handle drops that are not files ([bf41448](https://github.com/bluecatengineering/pelagos-packages/commit/bf41448268939bd7fe10fcf4fc296ab44fdca36a))
- remove custom border radius ([fcb0b1a](https://github.com/bluecatengineering/pelagos-packages/commit/fcb0b1a4ac9d3dbc3bf9cf5f5b130dd84216e1d8))
- update colours and palettes from Carbon v11 ([ba327cb](https://github.com/bluecatengineering/pelagos-packages/commit/ba327cb9b645cdf01688269949a00fd9bed67bca))
- update Menu and ButtonMenu per Carbon v11 ([3fc05e0](https://github.com/bluecatengineering/pelagos-packages/commit/3fc05e05ee429d24b324a20b57df254cdc6b7129))

## [12.5.2](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.5.1...@bluecateng/pelagos@12.5.2) (2023-11-03)

### Bug Fixes

- avoid unnecessary scrolling with fractional sizes ([f075a1f](https://github.com/bluecatengineering/pelagos-packages/commit/f075a1fcb7616124b78131c5919f4c5054e2a91a))
- fix error in ContentSwitcher when the element is unmounted ([3f4f117](https://github.com/bluecatengineering/pelagos-packages/commit/3f4f1177796c129d9e4c7134ebd2fcf58878128c))

## [12.5.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.5.0...@bluecateng/pelagos@12.5.1) (2023-10-03)

### Bug Fixes

- use a focus trap in useMenuHandler ([a55edc1](https://github.com/bluecatengineering/pelagos-packages/commit/a55edc13396ff7db270bd7ed0c689f44a38b98be))

## [12.5.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.4.0...@bluecateng/pelagos@12.5.0) (2023-09-29)

### Features

- export SelectArrow component ([60c1e20](https://github.com/bluecatengineering/pelagos-packages/commit/60c1e202577205deec39823aaaf8a0249fc8f4e0))

## [12.4.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.3.1...@bluecateng/pelagos@12.4.0) (2023-08-10)

### Features

- add TreeView component ([5c29538](https://github.com/bluecatengineering/pelagos-packages/commit/5c2953874deed787263c020bee8297a0b3ceb3ea))

## [12.3.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.3.0...@bluecateng/pelagos@12.3.1) (2023-07-27)

### Bug Fixes

- disable remove file icon when FileUploader is disabled ([11131a3](https://github.com/bluecatengineering/pelagos-packages/commit/11131a3eec63c1746106c78530c06ea399c7d72c))
- move styles to the pelagos layer ([434c627](https://github.com/bluecatengineering/pelagos-packages/commit/434c627fe7c00ba0c2b011074ea3182ffafe5579))

## [12.3.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.2.0...@bluecateng/pelagos@12.3.0) (2023-06-27)

### Features

- deprecate status-\* tokens in favour of Tags ([8bf9fa4](https://github.com/bluecatengineering/pelagos-packages/commit/8bf9fa4672cdef2b0f0572a0737c1df4d2469d89))

### Bug Fixes

- in ComboBox get suggestions only when the input changes ([5a00a8e](https://github.com/bluecatengineering/pelagos-packages/commit/5a00a8e36e4be6d4bcc8502f7fe2aabc823f38b3))
- remove unnecessary debounce of text changes ([a032d3d](https://github.com/bluecatengineering/pelagos-packages/commit/a032d3db608c1a71ff5457fca7e7bc6034d5c75e))
- truncate long strings in the side nav components ([731be63](https://github.com/bluecatengineering/pelagos-packages/commit/731be63ff4708e8992a28e8a3797240f3c0cbcdc))
- truncate the current value in Select ([c4a5deb](https://github.com/bluecatengineering/pelagos-packages/commit/c4a5debafa0493fc75965d8e806b5e1e045fc6ff))
- update the ComboBox/Select pop-up position on scroll ([f7bb1f3](https://github.com/bluecatengineering/pelagos-packages/commit/f7bb1f3c3cebd4391911d6f8745e830ab1fbb68f))

## [12.2.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.1.0...@bluecateng/pelagos@12.2.0) (2023-06-09)

### Features

- add onRemove property to Tag ([286f3a1](https://github.com/bluecatengineering/pelagos-packages/commit/286f3a17fb82e4d91ef48fe607400adb36f91468))
- add TabList component ([c600d49](https://github.com/bluecatengineering/pelagos-packages/commit/c600d4913679a5435758cee7516c6639642b7420))
- deprecate Tabs in favour of TabList ([faceb3f](https://github.com/bluecatengineering/pelagos-packages/commit/faceb3ffb44756b182873fa545fdc75ab28a6203))

### Bug Fixes

- change editor details panel top to match header height ([72234a2](https://github.com/bluecatengineering/pelagos-packages/commit/72234a2e038d80638b60ecb3c6d81ce2e6703839))

## [12.1.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.0.3...@bluecateng/pelagos@12.1.0) (2023-06-01)

### Features

- add DateInput component ([a9a2a50](https://github.com/bluecatengineering/pelagos-packages/commit/a9a2a5077b6e5205124b5afabf4a821167ef711f))
- add FilterArea component ([0f77e34](https://github.com/bluecatengineering/pelagos-packages/commit/0f77e34e6ceaab976f8e6564fd9c1119d7ef0519))
- add option to display an icon in Button ([4a92a91](https://github.com/bluecatengineering/pelagos-packages/commit/4a92a91e9f53253921b1fa1580d120ea4912c4c6))
- add Tag component ([f0bfbe4](https://github.com/bluecatengineering/pelagos-packages/commit/f0bfbe4d0f222f8dda35786371f774005de11cdc))
- allow TableToolbarSearch to have a controlled value ([dbf2a84](https://github.com/bluecatengineering/pelagos-packages/commit/dbf2a8448a53ae4fafa77d9b24e3e375d5885aff))
- deprecate IconMenuItem in favour of MenuItem ([2562f7c](https://github.com/bluecatengineering/pelagos-packages/commit/2562f7c55a8a8886b41a5de25510f3472c951586))
- deprecate SearchField in favour of TableToolbarSearch ([43b79ce](https://github.com/bluecatengineering/pelagos-packages/commit/43b79ced1a60e289f0ddd72de579f63920354251))
- extract subcomponents from FileUploader ([277f0f0](https://github.com/bluecatengineering/pelagos-packages/commit/277f0f097b2cd7c1eb8ae07c730ad58bab3b6c38))

### Bug Fixes

- allow selection from popup list while focus trap is active ([6e91325](https://github.com/bluecatengineering/pelagos-packages/commit/6e913254e43443e1970392bf024cb9bbeef9c164))
- fix class name for DateInput component ([adbf546](https://github.com/bluecatengineering/pelagos-packages/commit/adbf546090f3c6a30f78d78c0da910d8da8f8b40))
- fix location of close button in details panel ([9ec6f13](https://github.com/bluecatengineering/pelagos-packages/commit/9ec6f13ff56d10f54a0d95ce15533ce591a2fb6c))
- fix use of layers ([bae96d0](https://github.com/bluecatengineering/pelagos-packages/commit/bae96d0cad42ec85c83a47bca64715dd3a3ad6d4))
- implement Toggle using a button element ([dc10f7d](https://github.com/bluecatengineering/pelagos-packages/commit/dc10f7d840356327dd1b80d38df7c8ccfc0ac965))
- remove hover effects for CheckBox and RadioButton ([7a3f45a](https://github.com/bluecatengineering/pelagos-packages/commit/7a3f45a4d1fdc8c34f9db5ec451e709af98590a3))
- set Hamburger size to 48x48 ([eb69a31](https://github.com/bluecatengineering/pelagos-packages/commit/eb69a31081b98cd7eaf40ccc8c5fcd5c2e09a5be))
- use a button element for interactive tags ([2309b6e](https://github.com/bluecatengineering/pelagos-packages/commit/2309b6edef03348a38ebf9a164af0c36927d6bfd))
- use specified colours in SideNav ([acb0ccb](https://github.com/bluecatengineering/pelagos-packages/commit/acb0ccb8a5998ac570edf8ca3948532af28d52e6))

## [12.0.3](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.0.2...@bluecateng/pelagos@12.0.3) (2023-04-13)

### Bug Fixes

- set flex none on all headers ([1b147b1](https://github.com/bluecatengineering/pelagos-packages/commit/1b147b1a5ba80028c592a9866b959b0838db3036))

## [12.0.2](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.0.1...@bluecateng/pelagos@12.0.2) (2023-04-05)

### Bug Fixes

- fix error in ContentSwitcher when current is not set on blur ([b158d5c](https://github.com/bluecatengineering/pelagos-packages/commit/b158d5c9261afa1f620779d55a4f3c5c5608fc8e))
- remove obsolete defaultProps in Collapsible ([cda3c30](https://github.com/bluecatengineering/pelagos-packages/commit/cda3c3029b733bb430bb3b7e419b463e04122d76))

## [12.0.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@12.0.0...@bluecateng/pelagos@12.0.1) (2023-03-22)

### Bug Fixes

- pass additional properties in SvgIcon to the svg element ([9ec24e3](https://github.com/bluecatengineering/pelagos-packages/commit/9ec24e30cd6d7087b20480e374a30d92370fb47a))

## [12.0.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@11.1.0...@bluecateng/pelagos@12.0.0) (2023-03-13)

### ⚠ BREAKING CHANGES

- All fields should be reviewed and mark as required where appropriate.
- All references to deprecated items must be replaced with
  suggested alternatives before using this version.

### Features

- remove all deprecated items ([238546c](https://github.com/bluecatengineering/pelagos-packages/commit/238546c1a75c37809990b0c2135809dbb43c4dbb))
- replace optional property with required ([59b76d5](https://github.com/bluecatengineering/pelagos-packages/commit/59b76d58c847a4de7548bb5983bc0ad1c2581693))

### Bug Fixes

- wrap all styles in a layer ([ae09355](https://github.com/bluecatengineering/pelagos-packages/commit/ae09355d87f4b2f1aa2cdb1ef3081e9f298ecf4b))

## [11.1.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@11.0.1...@bluecateng/pelagos@11.1.0) (2023-03-13)

### Features

- add stretch property to Dialog ([43641f5](https://github.com/bluecatengineering/pelagos-packages/commit/43641f55b4579ed5114c083ff3f1e14a429fae67))

### Bug Fixes

- change "item(s)" to "items" ([9eb470f](https://github.com/bluecatengineering/pelagos-packages/commit/9eb470fd2166458b9e2a14ad3bf31d0e86c6a901))
- deprecate notice property in LabelLine ([c2c7ef2](https://github.com/bluecatengineering/pelagos-packages/commit/c2c7ef27970caac31a109197e1739b7e9b7fe4ec))
- remove forced line height from notification components ([fb84c08](https://github.com/bluecatengineering/pelagos-packages/commit/fb84c0897091d37b2cdab870def03e03b8b08d16))

## [11.0.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@11.0.0...@bluecateng/pelagos@11.0.1) (2023-03-01)

### Bug Fixes

- fix look of disabled fields ([45906ff](https://github.com/bluecatengineering/pelagos-packages/commit/45906ff16ba6b056f2a156648e4e385fa486c80d))
- rename assistive-text to sr-only ([b32b336](https://github.com/bluecatengineering/pelagos-packages/commit/b32b3362a4f48bbadd85c0bbce89a75c0f29d248))
- use aria-invalid to mark fields with errors ([de48a69](https://github.com/bluecatengineering/pelagos-packages/commit/de48a691fff68d70352f99d07fbce9a4625926a9))

## [11.0.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.3.1...@bluecateng/pelagos@11.0.0) (2023-02-16)

### ⚠ BREAKING CHANGES

- All references to deprecated items must be replaced with
  suggested alternatives before using this version.
- All existing links must be checked to ensure appearance is still correct.
- Users must accept second ref and add a live element close to the list.
- Users will need to modify existing code to the new interface.
- Users should replace dark/light shadow names with simplified names.
- Users should use `font-16-400` instead.

### Features

- improve behaviour of useMenuHandler ([636c61a](https://github.com/bluecatengineering/pelagos-packages/commit/636c61a1572b54edbda4adea722c746d162a5c23))
- leave links underlined ([a689953](https://github.com/bluecatengineering/pelagos-packages/commit/a689953685cf05dcbf7f5b5e95078645dd6eb9b6))
- remove all deprecated items ([d2a7ce5](https://github.com/bluecatengineering/pelagos-packages/commit/d2a7ce54b1bdafe20038adf70c20e0ab035cd970))
- remove font-16-400-sp2 ([bd14daa](https://github.com/bluecatengineering/pelagos-packages/commit/bd14daa38dd4903a91b3ff330b398a6c85042ed2))
- simplify shadow names ([41f1d63](https://github.com/bluecatengineering/pelagos-packages/commit/41f1d63b805405d10ec1839e10bffff5a0e6f838))

### Bug Fixes

- use a local live element in useReorder ([3eb68d1](https://github.com/bluecatengineering/pelagos-packages/commit/3eb68d1789960d0200cb39b070917724a61d0443))

## [10.3.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.3.0...@bluecateng/pelagos@10.3.1) (2023-02-15)

### Bug Fixes

- deprecate FileUploader.description ([6c1d585](https://github.com/bluecatengineering/pelagos-packages/commit/6c1d585ae38a7de5006f8e810aadefab708d9e7a))
- improve accessibility ([2eb0978](https://github.com/bluecatengineering/pelagos-packages/commit/2eb0978209316898d7cb5aa67e3b73b3171776ff))

# [10.3.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.2.1...@bluecateng/pelagos@10.3.0) (2023-02-08)

### Bug Fixes

- deprecate DetailsTable ([254120f](https://github.com/bluecatengineering/pelagos-packages/commit/254120f7e6ed25cbb4559730234755aa66b79d9c))
- fix alignment in CheckBox and RadioButton ([2620f3a](https://github.com/bluecatengineering/pelagos-packages/commit/2620f3a0589d7115e984b0af9926d7a164806504))
- improve accessibility ([acead6e](https://github.com/bluecatengineering/pelagos-packages/commit/acead6ebb2dc97dbfd6fd6f5581d8d387583c350))
- reduce gap in RadioGroup to 4px ([67ff1a4](https://github.com/bluecatengineering/pelagos-packages/commit/67ff1a45bf614f7a5f69c4702515c955ea8af503))

### Features

- add DetailRegion component ([bc3fde6](https://github.com/bluecatengineering/pelagos-packages/commit/bc3fde6032203f9f8b572634645d2ca08bc7794e))
- add DetailsListItem component ([e1f5893](https://github.com/bluecatengineering/pelagos-packages/commit/e1f5893ec67959c228780abb323fd49b215a000f))
- add function to set the library locale ([23b3719](https://github.com/bluecatengineering/pelagos-packages/commit/23b37195e1f717b980c0485b2db23e43602a09f9))
- add info text properties to DetailsList ([54eb7de](https://github.com/bluecatengineering/pelagos-packages/commit/54eb7dede41780fc5bff9cea086be73b1992d770))
- allow specifying level in detail components ([cc996df](https://github.com/bluecatengineering/pelagos-packages/commit/cc996dfd6f9da6e15df857e9f09dfa1671910cba))

## [10.2.1](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.2.0...@bluecateng/pelagos@10.2.1) (2023-01-30)

### Bug Fixes

- set nowrap on the filter list items ([6566206](https://github.com/bluecatengineering/pelagos-packages/commit/6566206492760cfddf6a31f894d8a7efebefe4b5))
- show the menu when down is pressed on the button ([a5ddce5](https://github.com/bluecatengineering/pelagos-packages/commit/a5ddce5d2e0255b149b0c448c8ac26fdcf871824))

# [10.2.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.1.0...@bluecateng/pelagos@10.2.0) (2023-01-25)

### Bug Fixes

- add an arrow to the filter list items ([4d5ddf4](https://github.com/bluecatengineering/pelagos-packages/commit/4d5ddf4f897d438d241e3e9c422028ce5246847e))
- allow TagInput height to increase when tags wrap ([74fae6d](https://github.com/bluecatengineering/pelagos-packages/commit/74fae6df94df53db23c0b126aea0562d8b594600))
- allow unset types property in FileUploader ([ecaf9cd](https://github.com/bluecatengineering/pelagos-packages/commit/ecaf9cd54d9b39e000a37beb4ce8b0aa628407b5))
- display FilterEditor as a new layer ([a1fa36c](https://github.com/bluecatengineering/pelagos-packages/commit/a1fa36c6670e191eaa8ae246692d72209d528941))
- handle cases where the menu is not visible ([d7929f5](https://github.com/bluecatengineering/pelagos-packages/commit/d7929f5c509bd9eacf2bdda701434388264a586d))
- hide breadcrumb separators from screen readers ([8819f03](https://github.com/bluecatengineering/pelagos-packages/commit/8819f03899ca0587914e6fe4200b1d0da77daa2d))
- improve accessibility ([9643fb9](https://github.com/bluecatengineering/pelagos-packages/commit/9643fb902759b568c22538da553274e70d2cbd0f))
- improve search a11y ([fca56c4](https://github.com/bluecatengineering/pelagos-packages/commit/fca56c40b4ea140be718f58dd96203a55e41580e))
- set focus on menu items ([5546bf1](https://github.com/bluecatengineering/pelagos-packages/commit/5546bf1d84b9d5279981a1bc4dacba4215bc6207))

### Features

- add ContentSwitcher component ([279c672](https://github.com/bluecatengineering/pelagos-packages/commit/279c6720028b90f1e91061fe244dc4f9df9fe9da))
- add LinkButton component ([ad9e8b6](https://github.com/bluecatengineering/pelagos-packages/commit/ad9e8b677a54757d434eea56ee26d69a90a96bac))
- add overlay property to IconButton ([90837f0](https://github.com/bluecatengineering/pelagos-packages/commit/90837f088e0983e50b6900492116d03190fdf469))

# [10.1.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@10.0.0...@bluecateng/pelagos@10.1.0) (2022-10-31)

### Features

- add useReorder hook ([2e212b2](https://github.com/bluecatengineering/pelagos-packages/commit/2e212b25e5d7f9ae534f718811e7b27fc16ff08e))

# [10.0.0](https://github.com/bluecatengineering/pelagos-packages/compare/@bluecateng/pelagos@9.0.0...@bluecateng/pelagos@10.0.0) (2022-10-25)

### Bug Fixes

- fix vertical alignment in LabelLine ([6672d51](https://github.com/bluecatengineering/pelagos-packages/commit/6672d514abcf270d0e96d43f51b1539cc8a3822f))
- make the root font 16px ([ea9b301](https://github.com/bluecatengineering/pelagos-packages/commit/ea9b301f55c0cd1e69796f52e4aa4141ead7d5a2))
- set left margin for CheckBox and RadioButton to 3px ([1b54e60](https://github.com/bluecatengineering/pelagos-packages/commit/1b54e60bdcebc0836413e3d624194b2ae36b73f4))

### Features

- add FileUploader component ([c1848ee](https://github.com/bluecatengineering/pelagos-packages/commit/c1848eede048d6eef6fea944213020824a8d67a6))
- deprecate DropZone component ([c0d94aa](https://github.com/bluecatengineering/pelagos-packages/commit/c0d94aad7c356fb6e1c5b342e47800301920934d))

### BREAKING CHANGES

- Users should set the body font to `font-14-400`
  to compensate for the root font change.

## 9.0.0 (2022-10-13)

### BREAKING CHANGES

- All package references must be changed from `@bluecat/*` to `@bluecateng/*`.

### [8.0.5](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v8.0.4...v8.0.5) (2022-10-06)

### Bug Fixes

- fix styles when using TableTitle and TableToolbar without Table ([ad76e6f](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/ad76e6f92d0ec9295f9db7e3a64d92ac9940fa8d))
- fix table search alignment ([234a1a4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/234a1a41835e2dee17366460c3c09988b34b7360))

### [8.0.4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v8.0.3...v8.0.4) (2022-09-30)

### Bug Fixes

- fix incorrect return value in useEffect ([ff9c9a9](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/ff9c9a9f95618aea9a41d84d3b5931d9ff70f044))

### [8.0.3](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v8.0.2...v8.0.3) (2022-09-29)

### Bug Fixes

- fix issues with variable height content in Collapsible ([c933ffa](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/c933ffab51bd4c5ea718dfeeb0bf9cd6ad19f8ed))

### [8.0.2](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v8.0.1...v8.0.2) (2022-09-16)

### Bug Fixes

- add line under Dialog title and adjust spacing ([151bdd0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/151bdd01aaf7538f0a24169003a884b164b35d0e))
- fix textarea padding ([3fb614e](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/3fb614ef227cb3a453e577a32fd1da1d4ef30783))
- set button type in CopyButton ([93d35b4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/93d35b4ab19b1a239dc94aebdb7cb3d1d604db35))

### [8.0.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v8.0.0...v8.0.1) (2022-09-13)

### Bug Fixes

- call onDelete when the delete button is clicked ([b8b491c](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/b8b491c4f1a90b3cdd200c6c3c256f871ec07a71))

## [8.0.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.3.0...v8.0.0) (2022-09-12)

### ⚠ BREAKING CHANGES

- Secondary buttons look now as specified in Carbon
  and different from tertiary buttons.
- Users relying on FontAwesome to v5 may need to update their local version.
- Internet Explorer is no longer supported.
- All references to deprecated items must be replaced with
  suggested alternatives before using this version.

### Features

- follow specification for secondary buttons ([444970f](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/444970f735a12c65e21f7653a1d51a875a9dee61))
- remove all deprecated items ([3f601d5](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/3f601d584c4086529dac73185e831d42f3ea8f7b))
- remove support for Internet Explorer ([72f89bf](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/72f89bf0c6ab516e7c8655ea7a1d4a5dbabf308f))
- rename icons ([8ab1f96](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/8ab1f9687a823a59d66c7363ecb218c76c4a9ed1))

### Bug Fixes

- deprecate DetailsSectionTitle in favour of h5 ([fd5a793](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/fd5a79366f2d00af622f81daffc2ee361db96f96))

- update FontAwesome to v6 ([d5da901](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/d5da901f9088c7c81fda2dff590db74d60f74327))

## [7.3.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.2.1...v7.3.0) (2022-09-07)

### Features

- add disabled property to CopyButton ([c4cf316](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/c4cf316740129dd3e2a56f7cffc0c2bf68f14734))
- add onDelete property to DropZone ([818d764](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/818d7643f4a1801f1d0b1d52d8a8545bf511e7ed))

### Bug Fixes

- fix label style when CheckBox is disabled ([b7573b4](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/b7573b4c93a3afbe2276d189c8bf2095037cf35c))

### [7.2.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.2.0...v7.2.1) (2022-08-26)

### Bug Fixes

- fix error when toolbar child is null or undefined ([9df09ec](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/9df09ec0b6039cdaaf9053a55ecd9653a3b497f6))

## [7.2.0](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.1.1...v7.2.0) (2022-08-22)

### Features

- add InfoTooltip component ([e1d3aa3](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/e1d3aa3d84d92c2414dc8c658c2253e3735916a4))
- add option to display an InfoTooltip in DetailEntry ([4977552](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/49775521f39cb65aecc37047394000f55f5d5c5d))
- add size property to Dialog ([950f4e1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/950f4e1529bf422f0b47b373f88f26931e5a3bc7))
- add sp-96 ([aacfb14](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/aacfb14030f5a5cccfd220f4255ece6eac8b8a67))
- define standard aspect ratios ([1402f38](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/1402f382a4efd6d57ff5c15b702e6343255316f8))
- define standard breakpoints ([4c77963](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/4c77963ca7ed177a7f1ec5030f23ff6c8e5d3d28))

### Bug Fixes

- fix spacing in check boxes and radio buttons ([2c48f34](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/2c48f346d6f404c2eec769886b9df1e298cfd928))
- improve ConfirmDialog layout ([a47eb0d](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/a47eb0dad2bae98a3196d62eda192a7202b2ce0e))
- simplify Tooltip implementation ([22baed7](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/22baed749829de11c2c5a42f29d98cfa02b05465))

### [7.1.1](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/compare/v7.1.0...v7.1.1) (2022-07-19)

### Bug Fixes

- allow setting an initial text in TableToolbarSearch ([864ebd8](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/864ebd8281339cb4611b9ea4a06395442d960019))
- handle prefers-reduced-motion in Spinner ([07bf016](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/07bf01637d58945c278c43be434fbf46a86b5b03))
- improve filters ([8f45d3c](https://gitlab.bluecatlabs.net/bluecat-uiux/pelagos/commit/8f45d3c088bec57ca9835c165bfe63889af28bcd))

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
