import { patterns } from "./patterns";
import {
  blockQuote,
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

export function parseMarkdownToReactMail(markdown: string): string {
  let html = "";

  // Handle headings (e.g., # Heading)
  html = markdown.replace(
    patterns.h1,
    `<Heading as="h1" style={${JSON.stringify(headerOne)}}>$1</Heading>`
  );
  html = html.replace(
    patterns.h2,
    `<Heading as="h2" style={${JSON.stringify(headerTwo)}}>$1</Heading>`
  );
  html = html.replace(
    patterns.h3,
    `<Heading as="h3" style={${JSON.stringify(headerThree)}}>$1</Heading>`
  );
  html = html.replace(
    patterns.h4,
    `<Heading as="h4" style={${JSON.stringify(headerFour)}}>$1</Heading>`
  );
  html = html.replace(
    patterns.h5,
    `<Heading as="h5" style={${JSON.stringify(headerFive)}}>$1</Heading>`
  );
  html = html.replace(
    patterns.h6,
    `<Heading as="h6" style={${JSON.stringify(headerSix)}}>$1</Heading>`
  );

  // Handle paragraphs
  html = html.replace(patterns.p, "$&");

  // Handle bold text (e.g., **bold**)
  html = html.replace(
    patterns.bold,
    `<Text style={${JSON.stringify(bold)}}>$1</Text>`
  );

  // Handle italic text (e.g., *italic*)
  html = html.replace(
    patterns.italic,
    `<Text style={${JSON.stringify(italic)}}>$1</Text>`
  );

  // Handle lists (unordered and ordered)
  html = html.replace(patterns.li, `<li>$1</li>`);
  html = html.replace(patterns.ul, `<ul>$&</ul>`);

  // Handle images (e.g., ![alt text](url))
  html = html.replace(patterns.image, `<Img alt="$1" src="$2" />`);

  // Handle links (e.g., [link text](url))
  html = html.replace(
    patterns.link,
    `<Link href="$2" style={${JSON.stringify(link)}}>$1</Link>`
  );

  // Handle code blocks (e.g., ```code```)
  html = html.replace(
    patterns.codeBlocks,
    `<pre style={${JSON.stringify(codeBlock)}}><Text style={${JSON.stringify(
      code
    )}}>${`{\`$1\`}`}</Text></pre>`
  );

  // Handle inline code (e.g., `code`)
  html = html.replace(
    patterns.codeInline,
    `<Text style={${JSON.stringify(code)}}>$1</Text>`
  );

  // Handle block quotes
  html = html.replace(
    /^>\s+(.+)$/gm,
    `<Text style={${JSON.stringify(blockQuote)}}>$1</Text>`
  );

  // Handle line breaks (e.g., <br />)
  html = html.replace(patterns.br, `<br />`);

  // Handle horizontal rules (e.g., ---)
  html = html.replace(patterns.hr, `<Hr />`);

  // Wrap content in a section tag
  html = `<Section>${html}</Section>`;

  return html;
}

const x = '```javascript\nconsole.log("Hello, World!");\n```';
const y = parseMarkdownToReactMail(x);
console.log(y);
