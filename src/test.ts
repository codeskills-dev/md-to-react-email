// const mdToReactEmailRegex =
//   /\n((?:(?!\n\s*(?:h[1-6]|ul|ol|table|hr|br)).)+\n)/g;

import { parseMarkdownToReactEmailJSX } from "./utils";
import * as fs from "fs";
// function mdToReactEmail(markdown) {
//   const parsedMarkdown = markdown.replace(
//     /^(?!#|\*|\d+\.)((.|\n)+?)(\n{2,}|$)/g,
//     "<p>$1</p>\n"
//   );

//   return parsedMarkdown;
// }

// const markdown =
//   "This is a paragraph.\n\n## This is a header.\n\n* This is a list item.\n* This is another list item.\n\n[This is a link](https://www.google.com/).";
// const result = mdToReactEmail(markdown);

// console.log(result);

const markdown = `# Header 1

This is a paragraph with some text. You can have multiple paragraphs separated by empty lines.

## Header 2

Here is an unordered list:
- Item 1
- Item 2
- Item 3

### Header 3

Here is an ordered list:
1. First
2. Second
3. Third

#### Header 4

A table example:

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

##### Header 5

An image example:
![Alt Text](https://example.com/image.jpg)

###### Header 6

Some **bold text** and *italic text* _italic text_.

Code block example:
\`\`\`
javascript
function greet() {
  console.log('Hello!');
}
\`\`\`

Here is a block quote example:

> This is a block quote.
> > This is a nested quote
> It can span multiple lines.
> > With multiple
> > Lines of code
> Block quotes are often used to highlight important information or provide references.


`;
const result = parseMarkdownToReactEmailJSX({ markdown });
fs.writeFile("src/res.html", result, () => console.log("done"));
// console.log(result);
