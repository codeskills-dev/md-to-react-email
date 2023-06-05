import { parseMarkdownToReactMail } from ".";
import {
  headerOne,
  headerTwo,
  headerThree,
  headerFour,
  headerFive,
  headerSix,
  bold,
  italic,
  blockQuote,
  code,
  codeBlock,
  link,
} from "./styles";

describe("Markdown to React Mail Parser", () => {
  it("converts header one correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<Section><Heading as="h1" style={${JSON.stringify(
      headerOne
    )}}>Hello, World!</Heading></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts header two correctly", () => {
    const markdown = "## Heading Two";
    const expected = `<Section><Heading as="h2" style={${JSON.stringify(
      headerTwo
    )}}>Heading Two</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header three correctly", () => {
    const markdown = "### Heading Three";
    const expected = `<Section><Heading as="h3" style={${JSON.stringify(
      headerThree
    )}}>Heading Three</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header four correctly", () => {
    const markdown = "#### Heading Four";
    const expected = `<Section><Heading as="h4" style={${JSON.stringify(
      headerFour
    )}}>Heading Four</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header five correctly", () => {
    const markdown = "##### Heading Five";
    const expected = `<Section><Heading as="h5" style={${JSON.stringify(
      headerFive
    )}}>Heading Five</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("converts header six correctly", () => {
    const markdown = "###### Heading Six";
    const expected = `<Section><Heading as="h6" style={${JSON.stringify(
      headerSix
    )}}>Heading Six</Heading></Section>`;

    const result = parseMarkdownToReactMail(markdown);
    expect(result).toEqual(expected);
  });

  it("should handle block quote", () => {
    const markdown = "> This is a block quote.";
    const expected = `<Section><Text style={${JSON.stringify(
      blockQuote
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
      bold
    )}}>bold text</Text></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts italic text correctly", () => {
    const markdown = "*italic text*";
    const expected = `<Section><Text style={${JSON.stringify(
      italic
    )}}>italic text</Text></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts lists correctly", () => {
    const markdown = "- Item 1\n- Item 2\n- Item 3";
    const expected = `<Section><ul><li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li></ul></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts images correctly", () => {
    const markdown = "![alt text](image.jpg)";
    const expected = `<Section><Img alt="alt text" src="image.jpg" /></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts links correctly", () => {
    const markdown = "[OpenAI](https://openai.com)";
    const expected = `<Section><Link href="https://openai.com" style={${JSON.stringify(
      link
    )}}>OpenAI</Link></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts code blocks correctly", () => {
    const markdown = '```javascript\nconsole.log("Hello, World!");\n```';
    const expected = `<Section><pre style={${JSON.stringify(
      codeBlock
    )}}><Text style={${JSON.stringify(code)}}>{\`javascript
console.log("Hello, World!");
\`}</Text></pre></Section>`;

    const rendered = parseMarkdownToReactMail(markdown);
    expect(rendered).toBe(expected);
  });
});
