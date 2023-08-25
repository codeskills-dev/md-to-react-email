import { parseMarkdownToReactEmailJSX } from "../src";

describe("Markdown to React Mail JSX Parser", () => {
  it("handles markdown correctly", () => {
    const markdown = `# Markdown Test Document

This is a **test document** to check the capabilities of a Markdown parser.

## Headings

### Third-Level Heading

#### Fourth-Level Heading

##### Fifth-Level Heading

###### Sixth-Level Heading

## Text Formatting

This is some **bold text** and this is some *italic text*. You can also use ~~strikethrough~~ and \`inline code\`.

## Lists

1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3

- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3

## Links

[Markdown Guide](https://www.markdownguide.org)

## Images

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Blockquotes

> This is a blockquote.
> - Author

## Code Blocks

\`\`\`javascript
function greet(name) {
console.log(\`Hello, \$\{name\}!\`);
}
\`\`\``;

    const expected = `<h1 style=\"font-weight:500;padding-top:20px;font-size:2.5rem\">Markdown Test Document</h1><p>This is a <strong style=\"font-weight:bold\">test document</strong> to check the capabilities of a Markdown parser.</p>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Headings</h2><h3 style=\"font-weight:500;padding-top:20px;font-size:1.75rem\">Third-Level Heading</h3><h4 style=\"font-weight:500;padding-top:20px;font-size:1.5rem\">Fourth-Level Heading</h4><h5 style=\"font-weight:500;padding-top:20px;font-size:1.25rem\">Fifth-Level Heading</h5><h6 style=\"font-weight:500;padding-top:20px;font-size:1rem\">Sixth-Level Heading</h6><h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Text Formatting</h2><p>This is some <strong style=\"font-weight:bold\">bold text</strong> and this is some <em style=\"font-style:italic\">italic text</em>. You can also use <del>strikethrough</del> and <code style=\"color:#212529;font-size:87.5%;display:inline;background: #f8f8f8;font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;word-wrap:break-word\">inline code</code>.</p>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Lists</h2><ol>
<li>Ordered List Item 1</li>
<li>Ordered List Item 2</li>
<li>Ordered List Item 3</li>
</ol>
<ul>
<li>Unordered List Item 1</li>
<li>Unordered List Item 2</li>
<li>Unordered List Item 3</li>
</ul>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Links</h2><p><a style=\"color:#007bff;text-decoration:underline;background-color:transparent\" href=\"https://www.markdownguide.org\" target=\"_blank\">Markdown Guide</a></p>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Images</h2><p><img alt=\"Markdown Logo\" src=\"https://markdown-here.com/img/icon256.png\"></p>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Blockquotes</h2><blockquote style=\"background:#f9f9f9;border-left:10px solid #ccc;margin:1.5em 10px;padding:1em 10px\">
<p>This is a blockquote.</p>
<ul>
<li>Author</li>
</ul>
</blockquote>
<h2 style=\"font-weight:500;padding-top:20px;font-size:2rem\">Code Blocks</h2><pre style=\"color:#212529;font-size:87.5%;display:inline;background: #f8f8f8;font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;padding-top:10px;padding-right:10px;padding-left:10px;padding-bottom:1px;margin-bottom:20px;word-wrap:break-word\"><code>function greet(name) {
console.log(\`Hello, $\{name\}!\`);
}
</code></pre>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles empty string correctly", () => {
    const markdown = "";
    const expected = ``;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles headers correctly", () => {
    const markdown = `# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
`;
    const expected = `<h1 style="font-weight:500;padding-top:20px;font-size:2.5rem">Header 1</h1><h2 style="font-weight:500;padding-top:20px;font-size:2rem">Header 2</h2><h3 style="font-weight:500;padding-top:20px;font-size:1.75rem">Header 3</h3><h4 style="font-weight:500;padding-top:20px;font-size:1.5rem">Header 4</h4><h5 style="font-weight:500;padding-top:20px;font-size:1.25rem">Header 5</h5><h6 style="font-weight:500;padding-top:20px;font-size:1rem">Header 6</h6>`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles paragraphs correctly", () => {
    const markdown = `# The paragraphs
This is one 

This is two
`;
    const expected = `<h1 style="font-weight:500;padding-top:20px;font-size:2.5rem">The paragraphs</h1><p>This is one </p>
<p>This is two</p>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles bold, italic and strikethrough texts correctly", () => {
    const markdown = `# The text formats
This is **one** bold and *italic* text 

This is ~~striked~~ text and \`inline code\``;
    const expected = `<h1 style="font-weight:500;padding-top:20px;font-size:2.5rem">The text formats</h1><p>This is <strong style="font-weight:bold">one</strong> bold and <em style="font-style:italic">italic</em> text </p>
<p>This is <del>striked</del> text and <code style="color:#212529;font-size:87.5%;display:inline;background: #f8f8f8;font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;word-wrap:break-word">inline code</code></p>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles lists correctly", () => {
    const markdown = `# The lists
Here is an unordered list:
- Item 1
- Item 2
- Item 3

Here is an ordered list:
1. First
2. Second
3. Third
`;
    const expected = `<h1 style="font-weight:500;padding-top:20px;font-size:2.5rem">The lists</h1><p>Here is an unordered list:</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>
<p>Here is an ordered list:</p>
<ol>
<li>First</li>
<li>Second</li>
<li>Third</li>
</ol>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles tables correctly", () => {
    const markdown = `A table example:

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;
    const expected = `<p>A table example:</p>
<table>
<thead>
<tr>
<th>Column 1</th>
<th>Column 2</th>
</tr>
</thead>
<tbody><tr>
<td>Cell 1</td>
<td>Cell 2</td>
</tr>
<tr>
<td>Cell 3</td>
<td>Cell 4</td>
</tr>
</tbody></table>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles code blocks and line breaks correctly", () => {
    const markdown = `A  example:
\`\`\`
python
def greet(name):
print(f"Hello, {name}!")

greet("World")
\`\`\``;

    const expected = `<p>A  example:</p>
<pre style="color:#212529;font-size:87.5%;display:inline;background: #f8f8f8;font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;padding-top:10px;padding-right:10px;padding-left:10px;padding-bottom:1px;margin-bottom:20px;word-wrap:break-word"><code>python
def greet(name):
print(f"Hello, {name}!")

greet("World")
</code></pre>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles blockquotes correctly", () => {
    const markdown = `A  example:
> Here's a block quote:
> Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

    const expected = `<p>A  example:</p>
<blockquote style="background:#f9f9f9;border-left:10px solid #ccc;margin:1.5em 10px;padding:1em 10px">
<p>Here's a block quote:
Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</blockquote>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles images correctly", () => {
    const markdown = `A  example:
![Image description](https://example.com/image.jpg)`;

    const expected = `<p>A  example:
<img src="https://example.com/image.jpg" alt="Image description"></p>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });

  it("handles links correctly", () => {
    const markdown = `A link example:
Here's a link to [OpenAI's website](https://openai.com/).`;

    const expected = `<p>A link example:
Here's a link to <a style="color:#007bff;text-decoration:underline;background-color:transparent" href="https://openai.com/" target="_blank">OpenAI's website</a>.</p>
`;

    const rendered = parseMarkdownToReactEmailJSX({
      markdown,
    });
    expect(rendered).toBe(expected);
  });
});
