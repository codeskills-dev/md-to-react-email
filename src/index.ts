import { patterns } from "./pattern";
import {
  bold,
  code,
  codeBlock,
  headerFive,
  headerFour,
  headerOne,
  headerSix,
  headerThree,
  headerTwo,
  italic,
  link,
} from "./styles";

function parseMarkdownToReactMail(markdown: string): string {
  markdown = markdown.replace(
    patterns.h1,
    `<Heading as="h1" style={${JSON.stringify(headerOne)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    patterns.h2,
    `<Heading as="h2" style={${JSON.stringify(headerTwo)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    patterns.h3,
    `<Heading as="h3" style={${JSON.stringify(headerThree)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    patterns.h4,
    `<Heading as="h4" style={${JSON.stringify(headerFour)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    patterns.h5,
    `<Heading as="h5" style={${JSON.stringify(headerFive)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    patterns.h6,
    `<Heading as="h6" style={${JSON.stringify(headerSix)}}>$1</Heading>`
  );
  markdown = markdown.replace(patterns.p, "<Text>$&</Text>");
  markdown = markdown.replace(
    patterns.bold,
    `<Text style={${JSON.stringify(bold)}}>$1</Text>`
  );
  markdown = markdown.replace(
    patterns.italic,
    `<Text style={${JSON.stringify(italic)}}>$1</Text>`
  );
  markdown = markdown.replace(patterns.li, `<li>$1</li>`);
  markdown = markdown.replace(patterns.ul, `<ul>$&</ul>`);
  markdown = markdown.replace(patterns.image, `<Img alt="$1" src="$2" />`);
  markdown = markdown.replace(
    patterns.link,
    `<Link href="$2" style={${JSON.stringify(link)}}>$1</Link>`
  );
  markdown = markdown.replace(
    patterns.codeBlocks,
    `<pre style={${JSON.stringify(codeBlock)}}><Text style={${JSON.stringify(
      code
    )}}>${`{\`$1\`}`}</Text></pre>`
  );
  markdown = markdown.replace(
    patterns.codeInline,
    `<Text style={${JSON.stringify(code)}}>$1</Text>`
  );
  markdown = markdown.replace(patterns.br, `<br />`);
  markdown = markdown.replace(patterns.hr, `<Hr />`);
  // Wrap content in a section tag✅
  markdown = `<Section>${markdown}</Section>`;

  return markdown;
}

// Example usage
const markdown = `# Hello, World!

This is a **markdown** example.

## Lists

- Item 1
- Item 2
- Item 3

## Ordered List

1. First item
2. Second item
3. Third item

## Link

[OpenAI](https://openai.com)

## Image

![Markdown Logo](https://example.com/markdown.png)

## Code Block

\`\`\`
function helloWorld() {
  console.log('Hello, World!');
}
\`\`\`

## Inline Code

You can use the \`console.log()\` function to print messages.

## Line Breaks

This is a line.  
This is another line.

## Horizontal Rule

---

`;
const reactMail = parseMarkdownToReactMail(markdown);
console.log(reactMail);
