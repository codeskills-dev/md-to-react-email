"use strict";
// const mdToReactEmailRegex =
//   /\n((?:(?!\n\s*(?:h[1-6]|ul|ol|table|hr|br)).)+\n)/g;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var fs = require("fs");
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
var markdown = "# Header 1\n\nThis is a paragraph with some text. You can have multiple paragraphs separated by empty lines.\n\n## Header 2\n\nHere is an unordered list:\n- Item 1\n- Item 2\n- Item 3\n\n### Header 3\n\nHere is an ordered list:\n1. First\n2. Second\n3. Third\n\n#### Header 4\n\nA table example:\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |\n\n##### Header 5\n\nAn image example:\n![Alt Text](https://example.com/image.jpg)\n\n###### Header 6\n\nSome **bold text** and *italic text* _italic text_.\n\nCode block example:\n```\njavascript\nfunction greet() {\n  console.log('Hello!');\n}\n```\n\nHere is a block quote example:\n\n> This is a block quote.\n> > This is a nested quote\n> It can span multiple lines.\n> > With multiple\n> > Lines of code\n> Block quotes are often used to highlight important information or provide references.\n\n\n";
var result = (0, utils_1.parseMarkdownToReactEmailJSX)({ markdown: markdown });
fs.writeFile("src/res.html", result, function () { return console.log("done"); });
// console.log(result);
