# Change Log

## 5.0.5

### Patch Changes

- 7e344b3: Add support for React 19

## 5.0.4

### Patch Changes

- 612003c: Fix memory leak caused by how Marked custom renderer was used

## 5.0.3

### Patch Changes

- 5f1e815: Fixes inner error for styles like `fontWeight: 500`

## 5.0.2

### Patch Changes

- a916ef1: Fix: replace quotes in custom styles with html hex code

## 5.0.1

### Patch Changes

- 092dd65: ## Fixes

  - Markdown custom styles can't handle quotes properly

## 5.0.0

### Major Changes

- b6f11cc: Rename exports to be generic

  ### Removed

  - remove `data-id` attributes from components, utils and types
  - `react-email` peer and dev dependency

## 4.1.0

### Minor Changes

- c78e7e4: ### Changes

  - Remove `DOMPurify` from lib

  ### Fixes

  - Fixed unordered list `ul` styles

## 4.0.0

### Major Changes

- 3ae845c: ### Changes

  - Added [`Marked`](https://marked.js.org/) for markdown transformations
  - Removed `ParseMarkdownToReactEmail` function

  ### Fixes

  - Fixed issue with [list parsing](https://github.com/codeskills-dev/md-to-react-email/issues/11)
  - Fixed `parseCssInJsToInlineCss` issue with numerical values

## 3.0.4

### Patch Changes

- b5f7677: ### Bug fixes

  - Fixed issue with parsing paragraphs
  - Converted bold and italics tag to <strong> and <em>
  - Fixed issue with parsing nested blockquotes
  - Fixed issue with parsing code blocks

  ### Optimisations

  This PR added optimisations for the following:

  - Cleaning up unused style tags for the generated markup
  - Moved the changesets
  - Added CI workflows

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [3.0.3](https://github.com/codeskills-dev/md-to-react-email/compare/v3.0.1...v3.0.3) (2023-07-04)

### Features

- Added checks to handle `undefined | null | ''`
- Added checks to handle input that is not of type `string`

### [3.0.1](https://github.com/codeskills-dev/md-to-react-email/compare/v3.0.0...v3.0.1) (2023-07-04)

### Features

- Added `target="_blank"` attribute to link tags

### [3.0.0](https://github.com/codeskills-dev/md-to-react-email/compare/v2.0.2...v3.0.0) (2023-07-04)

### Features

- Made `data-id` attributes optional in rendered markup
- Added sanitization for markdown output in react-email component
- Updated `parseMarkdownToReactEmailJSX` function usage synthax

### [2.0.2](https://github.com/codeskills-dev/md-to-react-email/compare/v2.0.1...v2.0.2) (2023-06-20)

### Features

- Removed `data-id` attributes from markup

### [2.0.1](https://github.com/codeskills-dev/md-to-react-email/compare/v1.2.0...v2.0.1) (2023-06-20)

### Features

- Major Bug fix for `parseMarkdownToReactEmailJSX`
- Major Bug fix for `reactEmailMarkdown` Component

### [1.2.0](https://github.com/codeskills-dev/md-to-react-email/compare/v1.0.2...v1.2.0) (2023-06-15)

### Features

- Added support for tables from GFM
- Added support for strikethrough from GFM

### [1.0.2](https://github.com/codeskills-dev/md-to-react-email/compare/v1.0.1...v1.0.2) (2023-06-11)

### Bug Fixes for commonJS

- Updated Package.json

## [1.0.1](https://github.com/codeskills-dev/md-to-react-email/compare/v1.0.0...v1.0.1) (2023-06-7)

https://github.com/codeskills-dev/md-to-react-email/releases/tag/v1.0.0

- Updated README.md

## [1.0.0]() (2023-06-7)

**Note:** Initial package release
