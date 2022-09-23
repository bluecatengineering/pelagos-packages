# @bluecateng/jest-helpers

Helper scripts for Jest

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
