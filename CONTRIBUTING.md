# Contributing to Pelagos Packages

Thank you for your interest in contributing to this component library for our design system! We welcome contributions that help make this project better, more robust, and accessible for everyone.

## How to Contribute

### 1. Code Style, Formatting & Linting

- All style, formatting, and linting rules are applied on commit through git hooks.
- **You must run `npm install` prior to committing to setup git hooks.**
- All code should follow the formatting rules defined in our Prettier configuration.
- Do not manually reformat code; let Prettier handle it for consistency.
- **JavaScript code must pass all ESLint checks.**
- **Less (CSS) files must pass all Stylelint checks.**

### 2. Commit Messages

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages.
- Example: `feat: add primary color variant`
- This helps with automated changelog generation and versioning.

### 3. Branching & Pull Requests

- Create a new branch for each feature, bugfix, or change.
- Before submitting a PR, squash and rebase your branch onto the latest `master`.
- Pull requests must pass all required CI checks and **must be reviewed by a code owner** before merging.
- Do not merge your own PRs unless you are a designated maintainer.

### 4. Testing

- **100% unit test coverage is required** for all code contributions.
- Add appropriate tests for any new components, features, or bug fixes.
- PRs lacking coverage will not be accepted.

### 5. Storybook

- All new components and significant features must be added to [Storybook](https://storybook.js.org/).
- Ensure your Storybook stories cover all major use cases and edge cases.

### 6. Documentation & Type Declarations

- Document all component props using both `propTypes` (for runtime validation) and TypeScript declarations (`.d.ts` files).
- Update any relevant documentation files if you add or change public APIs.

### 7. Filing Issues

- For bug reports, feature requests, or questions, [open an issue](../../issues).
- Please provide as much detail as possible to help us understand and address your issue quickly.

## Code of Conduct

This project adopts the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

---

Thank you for helping us build a better design system component library!
