---
"md-to-react-email": patch
---

### Bug fixes

- Fixed issue with parsing paragraphs
- Converted bold and italics tag to <strong> and <em>
- Fixed issue with parsing nested blockquotes
- Fixed issue with parsing code blocks

### Optimisations

This PR added optimisations for the following:

- Cleaning up unused style tags for the generated markup
- Moved the changesets
- Added CI workflows
