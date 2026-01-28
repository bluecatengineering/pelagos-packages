# @bluecateng/pelagos-highcharts [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/pelagos-highcharts.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/pelagos-highcharts)

Pelagos themes for Highcharts.

## Installation

```bash
npm i -S @bluecateng/pelagos-highcharts
```

## Usage

### Theme styles

The `themes.less` file must be included after `highcharts.css`.

```css
@import '~highcharts/css/highcharts.css';
@import '~@bluecateng/pelagos-highcharts/less/themes';
```

To force a theme, add `highcharts-light` or `highcharts-dark` to the `html` element.
If no class is set (or you use `highcharts-auto` as an app-level convention), the theme follows the browser's `prefers-color-scheme` setting.

### Color subsets

To apply a color subset for a component the function `buildColorSetClass` can be used to create a class name
for the chart element.

```javascript
<div className={buildColorSetClass('Example', series?.length)} />
```

### Alert subset

The class `highcharts-set-alert` may be used when the chart represents status information
(error/caution/warning/success).
