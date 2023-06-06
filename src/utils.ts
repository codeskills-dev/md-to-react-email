import { patterns } from "./patterns";
import { styles } from "./styles";
import { StylesType } from "./types";

import { CSSProperties } from "react";

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined
): string {
  if (!cssProperties) return "";

  return Object.entries(cssProperties)
    .map(([property, value]) => `${camelToKebabCase(property)}:${value}`)
    .join(";");
}

export function parseMarkdownToReactEmail(
  markdown: string,
  customStyles?: StylesType
): string {
  const finalStyles = { ...styles, ...customStyles };
  let reactMailTemplate = "";

  // Handle headings (e.g., # Heading)
  reactMailTemplate = markdown.replace(
    patterns.h1,
    `<Heading as="h1" style={${JSON.stringify(finalStyles.h1)}}>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h2,
    `<Heading as="h2" style={${JSON.stringify(finalStyles.h2)}}>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h3,
    `<Heading as="h3" style={${JSON.stringify(finalStyles.h3)}}>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h4,
    `<Heading as="h4" style={${JSON.stringify(finalStyles.h4)}}>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h5,
    `<Heading as="h5" style={${JSON.stringify(finalStyles.h5)}}>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h6,
    `<Heading as="h6" style={${JSON.stringify(finalStyles.h6)}}>$1</Heading>`
  );

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(patterns.p, "$&");

  // Handle bold text (e.g., **bold**)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.bold,
    `<Text style={${JSON.stringify(finalStyles.bold)}}>$1</Text>`
  );

  // Handle italic text (e.g., *italic*)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.italic,
    `<Text style={${JSON.stringify(finalStyles.italic)}}>$1</Text>`
  );

  // Handle lists (unordered and ordered)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.li,
    `<li style={${JSON.stringify(finalStyles.li)}}>$1</li>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.ul,
    `<ul style={${JSON.stringify(finalStyles.ul)}}>$&</ul>`
  );

  // Handle images (e.g., ![alt text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.image,
    `<Img style={${JSON.stringify(finalStyles.image)}} alt="$1" src="$2" />`
  );

  // Handle links (e.g., [link text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.link,
    `<Link href="$2" style={${JSON.stringify(finalStyles.link)}}>$1</Link>`
  );

  // Handle code blocks (e.g., ```code```)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeBlocks,
    `<pre style={${JSON.stringify(
      finalStyles.codeBlock
    )}}><Text>${`{\`$1\`}`}</Text></pre>`
  );

  // Handle inline code (e.g., `code`)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeInline,
    `<Text style={${JSON.stringify(finalStyles.codeInline)}}>$1</Text>`
  );

  // Handle block quotes
  reactMailTemplate = reactMailTemplate.replace(
    /^>\s+(.+)$/gm,
    `<Text style={${JSON.stringify(finalStyles.blockQuote)}}>$1</Text>`
  );

  // Handle line breaks (e.g., <br />)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.br,
    `<br style={${JSON.stringify(finalStyles.br)}} />`
  );

  // Handle horizontal rules (e.g., ---)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.hr,
    `<Hr style={${JSON.stringify(finalStyles.hr)}} />`
  );

  // Wrap content in a section tag
  reactMailTemplate = `<Section>${reactMailTemplate}</Section>`;

  return reactMailTemplate;
}

export function parseMarkdownToReactEmailJSX(
  markdown: string,
  customStyles?: StylesType
): string {
  const finalStyles = { ...styles, ...customStyles };
  let reactMailTemplate = "";

  // Handle headings (e.g., # Heading)
  reactMailTemplate = markdown.replace(
    patterns.h1,
    `<Heading as="h1" style="${parseCssInJsToInlineCss(
      finalStyles.h1
    )}">$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h2,
    `<Heading as="h2" style="${parseCssInJsToInlineCss(
      finalStyles.h2
    )}">$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h3,
    `<Heading as="h3" style="${parseCssInJsToInlineCss(
      finalStyles.h3
    )}">$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h4,
    `<Heading as="h4" style="${parseCssInJsToInlineCss(
      finalStyles.h4
    )}">$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h5,
    `<Heading as="h5" style="${parseCssInJsToInlineCss(
      finalStyles.h5
    )}">$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h6,
    `<Heading as="h6" style="${parseCssInJsToInlineCss(
      finalStyles.h6
    )}">$1</Heading>`
  );

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(patterns.p, "$&");

  // Handle bold text (e.g., **bold**)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.bold,
    `<Text style="${parseCssInJsToInlineCss(finalStyles.bold)}">$1</Text>`
  );

  // Handle italic text (e.g., *italic*)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.italic,
    `<Text style="${parseCssInJsToInlineCss(finalStyles.italic)}">$1</Text>`
  );

  // Handle lists (unordered and ordered)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.li,
    `<li style="${parseCssInJsToInlineCss(finalStyles.li)}">$1</li>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.ul,
    `<ul style="${parseCssInJsToInlineCss(finalStyles.ul)}">$&</ul>`
  );

  // Handle images (e.g., ![alt text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.image,
    `<Img style="${parseCssInJsToInlineCss(
      finalStyles.image
    )}" alt="$1" src="$2" />`
  );

  // Handle links (e.g., [link text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.link,
    `<Link href="$2" style="${parseCssInJsToInlineCss(
      finalStyles.link
    )}">$1</Link>`
  );

  // Handle code blocks (e.g., ```code```)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeBlocks,
    `<pre style="${parseCssInJsToInlineCss(
      finalStyles.codeBlock
    )}"><Text>${`{\`$1\`}`}</Text></pre>`
  );

  // Handle inline code (e.g., `code`)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeInline,
    `<Text style="${parseCssInJsToInlineCss(finalStyles.codeInline)}">$1</Text>`
  );

  // Handle block quotes
  reactMailTemplate = reactMailTemplate.replace(
    /^>\s+(.+)$/gm,
    `<Text style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}">$1</Text>`
  );

  // Handle line breaks (e.g., <br />)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.br,
    `<br style="${parseCssInJsToInlineCss(finalStyles.br)}" />`
  );

  // Handle horizontal rules (e.g., ---)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.hr,
    `<Hr style="${parseCssInJsToInlineCss(finalStyles.hr)}" />`
  );

  // Wrap content in a section tag
  reactMailTemplate = `<Section>${reactMailTemplate}</Section>`;

  return reactMailTemplate;
}
