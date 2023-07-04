import { sanitize } from "isomorphic-dompurify";
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

  // Handle Tables from GFM
  reactMailTemplate = reactMailTemplate.replace(
    patterns.table,
    (match: string) => {
      const rows = match.trim().split("\n");
      const headers = rows[0]
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const alignments = rows[1]
        .split("|")
        .slice(1, -1)
        .map((cell) => {
          const align = cell.trim().toLowerCase();
          return align === ":--"
            ? "left"
            : align === "--:"
            ? "right"
            : "center";
        });
      const body = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim());
          return `<tr style={${JSON.stringify(finalStyles.tr)}}>${cells
            .map(
              (cell, index) =>
                `<td style={${JSON.stringify(finalStyles.td)}} align="${
                  alignments[index]
                }">${cell}</td>`
            )
            .join("")}</tr>`;
        })
        .join("");

      const table = `<table style={${JSON.stringify(
        finalStyles.table
      )}}><thead style={${JSON.stringify(
        finalStyles.thead
      )}}><tr style={${JSON.stringify(finalStyles.tr)}}>${headers
        .map(
          (header, index) =>
            `<th style={${JSON.stringify(finalStyles.th)}} align="${
              alignments[index]
            }">${header}</th>`
        )
        .join("")}</tr></thead><tbody style={${JSON.stringify(
        finalStyles.tbody
      )}}>${body}</tbody></table>`;
      return table;
    }
  );

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(patterns.p, "$&");

  // Handle strikethrough
  reactMailTemplate = reactMailTemplate.replace(
    patterns.strikethrough,
    `<del style={${JSON.stringify(finalStyles.strikethrough)}}>$1</del>`
  );

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

interface ParseMarkdownToReactEmailJSXProps {
  markdown: string;
  customStyles?: StylesType;
  withDataAttr?: boolean;
}

export function parseMarkdownToReactEmailJSX({
  markdown,
  customStyles,
  withDataAttr = false,
}: ParseMarkdownToReactEmailJSXProps): string {
  const finalStyles = { ...styles, ...customStyles };
  let reactMailTemplate = "";

  // Handle headings (e.g., # Heading)
  reactMailTemplate = markdown.replace(
    patterns.h1,
    `<h1 style="${parseCssInJsToInlineCss(finalStyles.h1)}"${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    }>$1</h1>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h2,
    `<h2 style="${parseCssInJsToInlineCss(finalStyles.h2)}"${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    }>$1</h2>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h3,
    `<h3${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.h3)}">$1</h3>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h4,
    `<h4${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.h4)}">$1</h4>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h5,
    `<h5${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.h5)}">$1</h5>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h6,
    `<h6${
      withDataAttr ? ' data-id="react-email-heading"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.h6)}">$1</h6>`
  );

  // Handle Tables from GFM
  reactMailTemplate = reactMailTemplate.replace(
    patterns.table,
    (match: string) => {
      const rows = match.trim().split("\n");
      const headers = rows[0]
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const alignments = rows[1]
        .split("|")
        .slice(1, -1)
        .map((cell) => {
          const align = cell.trim().toLowerCase();
          return align === ":--"
            ? "left"
            : align === "--:"
            ? "right"
            : "center";
        });
      const body = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim());
          return `<tr style="${parseCssInJsToInlineCss(finalStyles.tr)}">${cells
            .map(
              (cell, index) =>
                `<td  align="${
                  alignments[index]
                }" style="${parseCssInJsToInlineCss(
                  finalStyles.td
                )}">${cell}</td>`
            )
            .join("")}</tr>`;
        })
        .join("");

      const table = `<table style="${parseCssInJsToInlineCss(
        finalStyles.table
      )}"><thead style="${parseCssInJsToInlineCss(
        finalStyles.thead
      )}"><tr style="${parseCssInJsToInlineCss(finalStyles.tr)}">${headers
        .map(
          (header, index) =>
            `<th align="${alignments[index]}" style="${parseCssInJsToInlineCss(
              finalStyles.th
            )}">${header}</th>`
        )
        .join("")}</tr></thead><tbody style="${parseCssInJsToInlineCss(
        finalStyles.tbody
      )}">${body}</tbody></table>`;
      return table;
    }
  );

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(patterns.p, "$&");

  // Handle strikethrough
  reactMailTemplate = reactMailTemplate.replace(
    patterns.strikethrough,
    `<del style="${parseCssInJsToInlineCss(
      finalStyles.strikethrough
    )}">$1</del>`
  );

  // Handle bold text (e.g., **bold**)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.bold,
    `<p${
      withDataAttr ? ' data-id="react-email-text"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.bold)}">$1</p>`
  );

  // Handle italic text (e.g., *italic*)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.italic,
    `<p${
      withDataAttr ? ' data-id="react-email-text"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.italic)}">$1</p>`
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
    `<img src="$2" alt="$1" style="${parseCssInJsToInlineCss(
      finalStyles.image
    )}">`
  );

  // Handle links (e.g., [link text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.link,
    `<a${
      withDataAttr ? ' data-id="react-email-link"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.link)}"  href="$2" >$1</a>`
  );

  // Handle code blocks (e.g., ```code```)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeBlocks,
    `<pre style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"><p${
      withDataAttr ? ' data-id="react-email-text"' : ""
    }>${`{\`$1\`}`}</p></pre>`
  );

  // Handle inline code (e.g., `code`)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeInline,
    `<p${
      withDataAttr ? ' data-id="react-email-text"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.codeInline)}">$1</p>`
  );

  // Handle block quotes
  reactMailTemplate = reactMailTemplate.replace(
    /^>\s+(.+)$/gm,
    `<p${
      withDataAttr ? ' data-id="react-email-text"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}">$1</p>`
  );

  // Handle line breaks (e.g., <br />)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.br,
    `<br style="${parseCssInJsToInlineCss(finalStyles.br)}" />`
  );

  // Handle horizontal rules (e.g., ---)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.hr,
    `<hr${
      withDataAttr ? ' data-id="react-email-hr"' : ""
    } style="${parseCssInJsToInlineCss(finalStyles.hr)}" />`
  );

  return sanitize(reactMailTemplate, { USE_PROFILES: { html: true } });
}
