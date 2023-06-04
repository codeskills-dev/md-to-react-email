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
  // Handle headings (e.g., # Heading)✅
  markdown = markdown.replace(
    /^#\s+(.+)$/gm,
    `<Heading as="h1" style={${JSON.stringify(headerOne)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    /^##\s+(.+)$/gm,
    `<Heading as="h2" style={${JSON.stringify(headerTwo)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    /^###\s+(.+)$/gm,
    `<Heading as="h3" style={${JSON.stringify(headerThree)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    /^####\s+(.+)$/gm,
    `<Heading as="h4" style={${JSON.stringify(headerFour)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    /^#####\s+(.+)$/gm,
    `<Heading as="h5" style={${JSON.stringify(headerFive)}}>$1</Heading>`
  );
  markdown = markdown.replace(
    /^######\s+(.+)$/gm,
    `<Heading as="h6" style={${JSON.stringify(headerSix)}}>$1</Heading>`
  );

  // Handle paragraphs✅
  markdown = markdown.replace(
    /((\n|^)(?!\n)((?!<\/?(h|ul|ol|pre|div|blockquote)[>\s]).)+(\n|$)+)+/gm,
    "<Text>$&</Text>"
  );

  // Handle bold text (e.g., **bold**)✅
  markdown = markdown.replace(
    /\*\*(.+?)\*\*/g,
    `<Text style={${JSON.stringify(bold)}}>$1</Text>`
  );

  // Handle italic text (e.g., *italic*)✅
  markdown = markdown.replace(
    /\*(.+?)\*/g,
    `<Text style={${JSON.stringify(italic)}}>$1</Text>`
  );

  // Handle lists (unordered and ordered)✅
  markdown = markdown.replace(/^\s*[-|\*]\s+(.*)$/gm, `<li>$1</li>`);
  markdown = markdown.replace(
    /(<li>.*<\/li>)(?![\s\S]*<\/ul>)/gs,
    `<ul>$&</ul>`
  );

  // Handle images (e.g., ![alt text](url))✅
  markdown = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    `<Img alt="$1" src="$2" />`
  );

  // Handle links (e.g., [link text](url))✅
  markdown = markdown.replace(
    /\[(.+?)\]\((.*?)\)/g,
    `<Link href="$2" style={${JSON.stringify(link)}}>$1</Link>`
  );

  // Handle code blocks (e.g., ```code```)✅
  markdown = markdown.replace(
    /```(.+?)```/gs,
    `<pre style={${JSON.stringify(codeBlock)}}><Text style={${JSON.stringify(
      code
    )}}>${`{\`$1\`}`}</Text></pre>`
  );

  // Handle inline code (e.g., `code`)✅
  markdown = markdown.replace(
    /`(.+?)`/g,
    `<Text style={${JSON.stringify(code)}}>$1</Text>`
  );

  // Handle line breaks (e.g., <br />)✅
  markdown = markdown.replace(/  \n/g, `<br />`);

  // Handle horizontal rules (e.g., ---)✅
  markdown = markdown.replace(/^-{3,}$/gm, `<Hr />`);

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
