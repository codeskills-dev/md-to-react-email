import {
  parseCssInJsToInlineCss,
  styles,
  parseMarkdownToReactEmailJSX,
} from "../src";

describe("Markdown to React Mail JSX Parser", () => {
  it("converts header one correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<Section><Heading as="h1" style="${parseCssInJsToInlineCss(
      styles.h1
    )}">Hello, World!</Heading></Section>`;

    const rendered = parseMarkdownToReactEmailJSX(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts images correctly", () => {
    const markdown = "![alt text](image.jpg)";
    const expected = `<Section><Img style="${parseCssInJsToInlineCss(
      styles.image
    )}" alt="alt text" src="image.jpg" /></Section>`;

    const rendered = parseMarkdownToReactEmailJSX(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts links correctly", () => {
    const markdown = "[Codeskills](https://codeskills.dev)";
    const expected = `<Section><Link href="https://codeskills.dev" style="${parseCssInJsToInlineCss(
      styles.link
    )}">Codeskills</Link></Section>`;

    const rendered = parseMarkdownToReactEmailJSX(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts code blocks correctly", () => {
    const markdown = '```javascript\nconsole.log("Hello, World!");\n```';
    const expected = `<Section><pre style="${parseCssInJsToInlineCss(
      styles.codeBlock
    )}"><Text>{\`javascript
console.log("Hello, World!");
\`}</Text></pre></Section>`;

    const rendered = parseMarkdownToReactEmailJSX(markdown);
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
      '<Section><table style=""><thead style=""><tr style="color:red"><th style="" align="center">Header 1</th><th style="" align="center">Header 2</th></tr></thead><tbody style=""><tr style="color:red"><td style="" align="center">Cell 1</td><td style="" align="center">Cell 2</td></tr><tr style="color:red"><td style="" align="center">Cell 3</td><td style="" align="center">Cell 4</td></tr></tbody></table></Section>';

    const rendered = parseMarkdownToReactEmailJSX(markdown, {
      tr: { color: "red" },
    });
    expect(rendered).toBe(expected);
  });

  it("converts strikethrough blocks correctly", () => {
    const markdown = "~~This is a paragraph.~~";
    const expected = `<Section><del style="${parseCssInJsToInlineCss(
      styles.strikethrough
    )}">This is a paragraph.</del></Section>`;

    const rendered = parseMarkdownToReactEmailJSX(markdown);
    expect(rendered).toBe(expected);
  });
});
