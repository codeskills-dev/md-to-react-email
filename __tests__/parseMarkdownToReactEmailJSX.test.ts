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
});
