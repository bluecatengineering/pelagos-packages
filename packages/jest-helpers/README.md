# @bluecateng/jest-helpers [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/jest-helpers.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/jest-helpers)

Helper scripts for Jest.

## Installation

```bash
npm i -D @bluecateng/jest-helpers
```

## Usage

In `package.json` add:

```json
{
	"jest": {
		"moduleNameMapper": {
			"^react$": "@bluecateng/jest-helpers/mock-react",
			"^react-dom$": "@bluecateng/jest-helpers/mock-react",
			"^react/jsx-runtime$": "@bluecateng/jest-helpers/mock-react",
			"\\.(png|jpg|gif|svg)$": "@bluecateng/jest-helpers/file-mapper",
			"\\.(css|less)$": "@bluecateng/jest-helpers/style-mapper"
		},
		"setupFilesAfterEnv": ["@bluecateng/jest-helpers/setup-enzyme"],
		"testEnvironment": "node"
	}
}
```
