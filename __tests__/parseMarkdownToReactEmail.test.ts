import { parseMarkdownToReactEmail } from "../src";

describe("Markdown to React Mail Parser", () => {
  it("converts headers correctly", () => {
    const markdown = "# Hello, World!";
    const expected = `<Section><Heading as=\"h1\" style={{\"fontWeight\":\"500\",\"paddingTop\":20,\"fontSize\":\"2.5rem\"}}>Hello, World!</Heading></Section>`;

    const rendered = parseMarkdownToReactEmail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts paragraphs, headers, lists, and tables correctly", () => {
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
`;

    const expected = `<Section><Heading as="h1" style={{"fontWeight":"500","paddingTop":20,"fontSize":"2.5rem"}}>Header 1</Heading>

<Text>This is a paragraph with some text. You can have multiple paragraphs separated by empty lines.</Text>

<Heading as="h2" style={{"fontWeight":"500","paddingTop":20,"fontSize":"2rem"}}>Header 2</Heading>

<Text>Here is an unordered list:</Text>
<ul><li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li></ul>

<Heading as="h3" style={{"fontWeight":"500","paddingTop":20,"fontSize":"1.75rem"}}>Header 3</Heading>

<Text>Here is an ordered list:</Text>
<ol><li>First</li>
<li>Second</li>
<li>Third</li>
</ol>
<Heading as="h4" style={{"fontWeight":"500","paddingTop":20,"fontSize":"1.5rem"}}>Header 4</Heading>

<Text>A table example:</Text>
<table><thead><tr><th align="center">Column 1</th><th align="center">Column 2</th></tr></thead><tbody><tr><td align="center">Cell 1</td><td align="center">Cell 2</td></tr><tr><td align="center">Cell 3</td><td align="center">Cell 4</td></tr></tbody></table></Section>`;

    const rendered = parseMarkdownToReactEmail(markdown);
    expect(rendered).toBe(expected);
  });

  it("converts images, codeblocks, blockquotes and nested blockquotes correctly", () => {
    const markdown = `##### Header 5

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
> It can span multiple lines.
> > This is a nested quote
> > With multiple
> > Lines of code

> Block quotes are often used to highlight important information or provide references.`;

    const expected = `<Section><Heading as=\"h5\" style={{\"fontWeight\":\"500\",\"paddingTop\":20,\"fontSize\":\"1.25rem\"}}>Header 5</Heading>

<Text>An image example:</Text>
<Img src=\"https://example.com/image.jpg\" alt=\"Alt Text\" />

<Heading as=\"h6\" style={{\"fontWeight\":\"500\",\"paddingTop\":20,\"fontSize\":\"1rem\"}}>Header 6</Heading>

<Text>Some <strong style={{\"fontWeight\":\"bold\"}}>bold text</strong> and <em style={{\"fontStyle\":\"italic\"}}>italic text</em> <em style={{\"fontStyle\":\"italic\"}}>italic text</em>.</Text>

<Text>Code block example:</Text>
<pre style={{\"color\":\"#212529\",\"fontSize\":\"87.5%\",\"display\":\"inline\",\"background\":\" #f8f8f8\",\"fontFamily\":\"SFMono-Regular,Menlo,Monaco,Consolas,monospace\",\"paddingTop\":10,\"paddingRight\":10,\"paddingLeft\":10,\"paddingBottom\":1,\"marginBottom\":20,\"wordWrap\":\"break-word\"}}>
  javascript
  function greet() {
    console.log('Hello!');
  }
</pre>

<Text>Here is a block quote example:</Text>

<Text style={{"background":"#f9f9f9","borderLeft":"10px solid #ccc","margin":"1.5em 10px","padding":"1em 10px"}}>
<Text>This is a block quote.</Text>
<Text>It can span multiple lines.</Text>
<Text style={{"background":"#f9f9f9","borderLeft":"10px solid #ccc","margin":"1.5em 10px","padding":"1em 10px"}}>
<Text>This is a nested quote</Text>
<Text>With multiple</Text>
<Text>Lines of code</Text>
</Text>
</Text>

<Text style={{"background":"#f9f9f9","borderLeft":"10px solid #ccc","margin":"1.5em 10px","padding":"1em 10px"}}>
<Text>Block quotes are often used to highlight important information or provide references.</Text>
</Text></Section>`;

    const rendered = parseMarkdownToReactEmail(markdown);
    expect(rendered).toBe(expected);
  });
});
