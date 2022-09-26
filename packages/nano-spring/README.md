# @bluecateng/nano-spring [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/nano-spring.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/nano-spring)

Tiny implementation of spring animation with mass set to 1.

Size: 290 bytes before compression.

# Installation

```bash
npm i -S @bluecateng/nano-spring
```

# Example

```js
import spring from '@bluecateng/nano-spring';

const element = document.querySelector('#test');
element.style.opacity = 0.5;
spring(
	250,
	30,
	(p) => (element.style.transform = `translateX(${p * 300}px)`),
	() => (element.style.opacity = '')
);
```

## Output

![Output](https://raw.githubusercontent.com/bluecatengineering/pelagos-packages/packages/nano-spring/master/example.gif)
