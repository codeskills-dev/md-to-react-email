import {
  parseCssInJsToInlineCss,
  styles,
  parseMarkdownToReactEmailJSX,
} from "../src";

describe("Markdown to React Mail JSX Parser", () => {
  it("converts header one correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<h1 style="${parseCssInJsToInlineCss(
      styles.h1
    )}">Hello, World!</h1>`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("converts header one with data attributes correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<h1 data-id="react-email-heading" style="${parseCssInJsToInlineCss(
      styles.h1
    )}">Hello, World!</h1>`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
      withDataAttr: true,
    });
    expect(rendered).toBe(expected);
  });

  it("converts images correctly", () => {
    const markdown = "![alt text](image.jpg)";
    const expected = `<img style="${parseCssInJsToInlineCss(
      styles.image
    )}" alt="alt text" src="image.jpg">`;

    const rendered = parseMarkdownToReactEmailJSX({ markdown });
    expect(rendered).toBe(expected);
  });

  it("converts links correctly", () => {
    const markdown = "[Codeskills](https://codeskills.dev)";
    const expected = `<a href="https://codeskills.dev" style="${parseCssInJsToInlineCss(
      styles.link
    )}" target="_blank">Codeskills</a>`;

    const rendered = parseMarkdownToReactEmailJSX({ markdown });
    expect(rendered).toBe(expected);
  });

  it("converts code blocks correctly", () => {
    const markdown = '```javascript\nconsole.log("Hello, World!");\n```';
    const expected = `<pre style="${parseCssInJsToInlineCss(
      styles.codeBlock
    )}"><p>{\`javascript
console.log("Hello, World!");
\`}</p></pre>`;

    const rendered = parseMarkdownToReactEmailJSX({ markdown });
    expect(rendered).toBe(expected);
  });

  it("converts tables correctly", () => {
    const markdown = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;
    const expected =
      '<table style=""><thead style=""><tr style="color:red"><th style="" align="center">Header 1</th><th style="" align="center">Header 2</th></tr></thead><tbody style=""><tr style="color:red"><td style="" align="center">Cell 1</td><td style="" align="center">Cell 2</td></tr><tr style="color:red"><td style="" align="center">Cell 3</td><td style="" align="center">Cell 4</td></tr></tbody></table>';

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
      customStyles: {
        tr: { color: "red" },
      },
    });
    expect(rendered).toBe(expected);
  });

  it("converts strikethrough blocks correctly", () => {
    const markdown = "~~This is a paragraph.~~";
    const expected = `<del style="${parseCssInJsToInlineCss(
      styles.strikethrough
    )}">This is a paragraph.</del>`;

    const rendered = parseMarkdownToReactEmailJSX({ markdown });
    expect(rendered).toBe(expected);
  });
});
