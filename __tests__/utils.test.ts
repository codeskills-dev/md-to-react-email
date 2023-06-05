import { parseMarkdownToReactMail, styles } from "../src";

describe("Markdown to React Mail Parser", () => {
  it("converts header one correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<Section><Heading as="h1" style={${JSON.stringify(
      styles.h1
    )}}>Hello, World!</Heading></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts header two correctly", () => {
    const markdown = "## Heading Two";
    const expected = `<Section><Heading as="h2" style={${JSON.stringify(
      styles.h2
    )}}>Heading Two</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header three correctly", () => {
    const markdown = "### Heading Three";
    const expected = `<Section><Heading as="h3" style={${JSON.stringify(
      styles.h3
    )}}>Heading Three</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header four correctly", () => {
    const markdown = "#### Heading Four";
    const expected = `<Section><Heading as="h4" style={${JSON.stringify(
      styles.h4
    )}}>Heading Four</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header five correctly", () => {
    const markdown = "##### Heading Five";
    const expected = `<Section><Heading as="h5" style={${JSON.stringify(
      styles.h5
    )}}>Heading Five</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header six correctly", () => {
    const markdown = "###### Heading Six";
    const expected = `<Section><Heading as="h6" style={${JSON.stringify(
      styles.h6
    )}}>Heading Six</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("should handle block quote", () => {
    const markdown = "> This is a block quote.";
    const expected = `<Section><Text style={${JSON.stringify(
      styles.blockQuote
    )}}>This is a block quote.</Text></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts paragraphs correctly", () => {
    const markdown = "This is a paragraph.";
    const expected = `<Section>This is a paragraph.</Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts bold text correctly", () => {
    const markdown = "**bold text**";
    const expected = `<Section><Text style={${JSON.stringify(
      styles.bold
    )}}>bold text</Text></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts italic text correctly", () => {
    const markdown = "*italic text*";
    const expected = `<Section><Text style={${JSON.stringify(
      styles.italic
    )}}>italic text</Text></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts lists correctly", () => {
    const markdown = "- Item 1\n- Item 2\n- Item 3";
    const expected = `<Section><ul style={${JSON.stringify(
      styles.ul
    )}}><li style={${JSON.stringify(styles.li)}}>Item 1</li>
<li style={${JSON.stringify(styles.li)}}>Item 2</li>
<li style={${JSON.stringify(styles.li)}}>Item 3</li></ul></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts images correctly", () => {
    const markdown = "![alt text](image.jpg)";
    const expected = `<Section><Img style={${JSON.stringify(
      styles.image
    )}} alt="alt text" src="image.jpg" /></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts links correctly", () => {
    const markdown = "[Codeskills](https://codeskills.dev)";
    const expected = `<Section><Link href="https://codeskills.dev" style={${JSON.stringify(
      styles.link
    )}}>Codeskills</Link></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts code blocks correctly", () => {
    const markdown = '```javascript\nconsole.log("Hello, World!");\n```';
    const expected = `<Section><pre style={${JSON.stringify(
      styles.codeBlock
    )}}><Text>{\`javascript
console.log("Hello, World!");
\`}</Text></pre></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });
});
