import DOMPurify from "isomorphic-dompurify";
import { patterns } from "./patterns";
import { styles } from "./styles";
import { StylesType } from "./types";
import { CSSProperties } from "react";

// hook to handle target="_blank" in all links
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if ("target" in node) {
    node.setAttribute("target", "_blank");
  }
});

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

  // Handle inline code (e.g., `code`)
  reactMailTemplate = markdown.replace(
    patterns.codeInline,
    `<Text${
      JSON.stringify(finalStyles.codeInline) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.codeInline)}}`
        : ""
    }>$2</Text>`
  );

  // Handle code blocks (e.g., ```code```)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeBlocks,
    function (_, codeContent: string) {
      const indentedCodeContent = codeContent
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return `<pre${
        JSON.stringify(finalStyles.codeBlock) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.codeBlock)}}`
          : ""
      }>\n${indentedCodeContent}\n</pre>`;
    }
  );

  // Handle blockquotes
  function parseMarkdownWithBlockQuotes(markdown: string): string {
    const blockquoteRegex = /^(>\s*((?:.+\n?)+))(?!\n(?=>\s))/gm;

    function parseBlockQuote(match: string) {
      const nestedContent = match.replace(/^>\s*/gm, "");
      const nestedHTML = parseMarkdownWithBlockQuotes(nestedContent);
      return `<Text${
        JSON.stringify(finalStyles.blockQuote) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.blockQuote)}}`
          : ""
      }>\n${nestedHTML}\n</Text>`;
    }

    return markdown.replace(blockquoteRegex, parseBlockQuote);
  }

  reactMailTemplate = parseMarkdownWithBlockQuotes(reactMailTemplate);

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(
    patterns.p,
    `<Text${
      JSON.stringify(finalStyles.p) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.p)}}`
        : ""
    }>$1</Text>`
  );

  // Handle headings (e.g., # Heading)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h1,
    `<Heading as="h1"${
      JSON.stringify(finalStyles.h1) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h1)}}`
        : ""
    }>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h2,
    `<Heading as="h2"${
      JSON.stringify(finalStyles.h2) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h2)}}`
        : ""
    }>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h3,
    `<Heading as="h3"${
      JSON.stringify(finalStyles.h3) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h3)}}`
        : ""
    }>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h4,
    `<Heading as="h4"${
      JSON.stringify(finalStyles.h4) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h4)}}`
        : ""
    }>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h5,
    `<Heading as="h5"${
      JSON.stringify(finalStyles.h5) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h5)}}`
        : ""
    }>$1</Heading>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h6,
    `<Heading as="h6"${
      JSON.stringify(finalStyles.h6) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.h6)}}`
        : ""
    }>$1</Heading>`
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
          return `<tr${
            JSON.stringify(finalStyles.tr) !== "{}"
              ? ` style={${JSON.stringify(finalStyles.tr)}}`
              : ""
          }>${cells
            .map(
              (cell, index) =>
                `<td align="${alignments[index]}"${
                  JSON.stringify(finalStyles.td) !== "{}"
                    ? ` style={${JSON.stringify(finalStyles.td)}}`
                    : ""
                }>${cell}</td>`
            )
            .join("")}</tr>`;
        })
        .join("");

      const table = `<table${
        JSON.stringify(finalStyles.table) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.table)}}`
          : ""
      }><thead${
        JSON.stringify(finalStyles.thead) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.thead)}}`
          : ""
      }><tr${
        JSON.stringify(finalStyles.tr) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.tr)}}`
          : ""
      }>${headers
        .map(
          (header, index) =>
            `<th align="${alignments[index]}"${
              JSON.stringify(finalStyles.th) !== "{}"
                ? ` style={${JSON.stringify(finalStyles.th)}}`
                : ""
            }>${header}</th>`
        )
        .join("")}</tr></thead><tbody${
        JSON.stringify(finalStyles.tbody) !== "{}"
          ? ` style={${JSON.stringify(finalStyles.tbody)}}`
          : ""
      }>${body}</tbody></table>`;
      return table;
    }
  );

  // Handle strikethrough
  reactMailTemplate = reactMailTemplate.replace(
    patterns.strikethrough,
    `<del${
      JSON.stringify(finalStyles.strikethrough) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.strikethrough)}}`
        : ""
    }>$1</del>`
  );

  // Handle bold text (e.g., **bold**)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.bold,
    `<strong${
      JSON.stringify(finalStyles.bold) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.bold)}}`
        : ""
    }>$1</strong>`
  );

  // Handle italic text (e.g., *italic*)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.italic,
    `<em${
      JSON.stringify(finalStyles.italic) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.italic)}}`
        : ""
    }>$2</em>`
  );

  // Handle lists (unordered)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.li,
    `<li${
      JSON.stringify(finalStyles.li) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.li)}}`
        : ""
    }>$1</li>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.ul,
    `<ul${
      JSON.stringify(finalStyles.ul) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.ul)}}`
        : ""
    }>$&</ul>`
  );

  // Handle lists (ordered)
  reactMailTemplate = reactMailTemplate.replace(patterns.ol, function (match) {
    const listItems = match
      .split("\n")
      .map((line) => {
        const listItemContent = line.replace(/^\d+\.\s+/, "");
        return listItemContent
          ? `<li${
              JSON.stringify(finalStyles.li) !== "{}"
                ? ` style={${JSON.stringify(finalStyles.li)}}`
                : ""
            }>${listItemContent}</li>`
          : "";
      })
      .join("\n");
    return `<ol${
      JSON.stringify(finalStyles.ol) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.ol)}}`
        : ""
    }>${listItems}</ol>`;
  });

  // Handle images (e.g., ![alt text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.image,
    `<Img src="$2" alt="$1"${
      JSON.stringify(finalStyles.image) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.image)}}`
        : ""
    } />`
  );

  // Handle links (e.g., [link text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.link,
    `<Link${
      JSON.stringify(finalStyles.link) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.link)}}`
        : ""
    } href="$2" target="_blank" >$1</Link>`
  );

  // Handle line breaks (e.g., <br />)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.br,
    `<br${
      JSON.stringify(finalStyles.br) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.br)}}`
        : ""
    }/>`
  );

  // Handle horizontal rules (e.g., ---)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.hr,
    `<hr${
      JSON.stringify(finalStyles.hr) !== "{}"
        ? ` style={${JSON.stringify(finalStyles.hr)}}`
        : ""
    }/>`
  );

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
  if (
    markdown === undefined ||
    markdown === null ||
    markdown === "" ||
    typeof markdown !== "string"
  ) {
    return "";
  }

  const finalStyles = { ...styles, ...customStyles };
  let reactMailTemplate = "";

  // Handle inline code (e.g., `code`)
  reactMailTemplate = markdown.replace(
    patterns.codeInline,
    `<code${
      parseCssInJsToInlineCss(finalStyles.codeInline) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"`
        : ""
    }>$2</code>`
  );

  // Handle code blocks (e.g., ```code```)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.codeBlocks,
    function (_, codeContent: string) {
      const indentedCodeContent = codeContent
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return `<pre${
        parseCssInJsToInlineCss(finalStyles.codeBlock) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"`
          : ""
      }>\n${indentedCodeContent}\n</pre>`;
    }
  );

  // Handle blockquotes
  function parseMarkdownWithBlockQuotes(markdown: string): string {
    const blockquoteRegex = /^(>\s*((?:.+\n?)+))(?!\n(?=>\s))/gm;

    function parseBlockQuote(match: string) {
      const nestedContent = match.replace(/^>\s*/gm, "");
      const nestedHTML = parseMarkdownWithBlockQuotes(nestedContent);
      return `<blockquote${
        parseCssInJsToInlineCss(finalStyles.blockQuote) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"`
          : ""
      }>\n${nestedHTML}\n</blockquote>`;
    }

    return markdown.replace(blockquoteRegex, parseBlockQuote);
  }

  reactMailTemplate = parseMarkdownWithBlockQuotes(reactMailTemplate);

  // Handle paragraphs
  reactMailTemplate = reactMailTemplate.replace(
    patterns.p,
    `<p${
      parseCssInJsToInlineCss(finalStyles.p) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-text"' : ""}>$1</p>`
  );

  // Handle headings (e.g., # Heading)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h1,
    `<h1${
      parseCssInJsToInlineCss(finalStyles.h1) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h1)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h1>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h2,
    `<h2${
      parseCssInJsToInlineCss(finalStyles.h2) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h2)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h2>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h3,
    `<h3${
      parseCssInJsToInlineCss(finalStyles.h3) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h3)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h3>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h4,
    `<h4${
      parseCssInJsToInlineCss(finalStyles.h4) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h4)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h4>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h5,
    `<h5${
      parseCssInJsToInlineCss(finalStyles.h5) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h5)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h5>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.h6,
    `<h6${
      parseCssInJsToInlineCss(finalStyles.h6) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h6)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-heading"' : ""}>$1</h6>`
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
          return `<tr${
            parseCssInJsToInlineCss(finalStyles.tr) !== ""
              ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
              : ""
          }>${cells
            .map(
              (cell, index) =>
                `<td  align="${alignments[index]}"${
                  parseCssInJsToInlineCss(finalStyles.td) !== ""
                    ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
                    : ""
                }>${cell}</td>`
            )
            .join("")}</tr>`;
        })
        .join("");

      const table = `<table${
        parseCssInJsToInlineCss(finalStyles.table) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"`
          : ""
      }><thead${
        parseCssInJsToInlineCss(finalStyles.thead) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"`
          : ""
      }><tr${
        parseCssInJsToInlineCss(finalStyles.tr) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
          : ""
      }>${headers
        .map(
          (header, index) =>
            `<th align="${alignments[index]}"${
              parseCssInJsToInlineCss(finalStyles.th) !== ""
                ? ` style="${parseCssInJsToInlineCss(finalStyles.th)}"`
                : ""
            }>${header}</th>`
        )
        .join("")}</tr></thead><tbody${
        parseCssInJsToInlineCss(finalStyles.tbody) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.tbody)}"`
          : ""
      }>${body}</tbody></table>`;
      return table;
    }
  );

  // Handle strikethrough
  reactMailTemplate = reactMailTemplate.replace(
    patterns.strikethrough,
    `<del${
      parseCssInJsToInlineCss(finalStyles.strikethrough) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"`
        : ""
    }>$1</del>`
  );

  // Handle bold text (e.g., **bold**)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.bold,
    `<strong${
      parseCssInJsToInlineCss(finalStyles.bold) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-text"' : ""}>$1</strong>`
  );

  // Handle italic text (e.g., *italic*)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.italic,
    `<em${
      parseCssInJsToInlineCss(finalStyles.italic) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"`
        : ""
    }${withDataAttr ? ' data-id="react-email-text"' : ""}>$2</em>`
  );

  // Handle lists (unordered)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.li,
    `<li${
      parseCssInJsToInlineCss(finalStyles.li) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
        : ""
    }>$1</li>`
  );
  reactMailTemplate = reactMailTemplate.replace(
    patterns.ul,
    `<ul${
      parseCssInJsToInlineCss(finalStyles.ul) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.ul)}"`
        : ""
    }>$&</ul>`
  );

  // Handle lists (ordered)
  reactMailTemplate = reactMailTemplate.replace(patterns.ol, function (match) {
    const listItems = match
      .split("\n")
      .map((line) => {
        const listItemContent = line.replace(/^\d+\.\s+/, "");
        return listItemContent
          ? `<li${
              parseCssInJsToInlineCss(finalStyles.li) !== ""
                ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
                : ""
            }>${listItemContent}</li>`
          : "";
      })
      .join("\n");
    return `<ol${
      parseCssInJsToInlineCss(finalStyles.ol) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.ol)}"`
        : ""
    }>${listItems}</ol>`;
  });

  // Handle images (e.g., ![alt text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.image,
    `<img src="$2" alt="$1"${
      parseCssInJsToInlineCss(finalStyles.image) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"`
        : ""
    }>`
  );

  // Handle links (e.g., [link text](url))
  reactMailTemplate = reactMailTemplate.replace(
    patterns.link,
    `<a${withDataAttr ? ' data-id="react-email-link"' : ""}${
      parseCssInJsToInlineCss(finalStyles.link) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"`
        : ""
    } href="$2" target="_blank" >$1</a>`
  );

  // Handle line breaks (e.g., <br />)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.br,
    `<br${
      parseCssInJsToInlineCss(finalStyles.br) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"`
        : ""
    }/>`
  );

  // Handle horizontal rules (e.g., ---)
  reactMailTemplate = reactMailTemplate.replace(
    patterns.hr,
    `<hr${withDataAttr ? ' data-id="react-email-hr"' : ""}${
      parseCssInJsToInlineCss(finalStyles.hr) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"`
        : ""
    }/>`
  );

  return DOMPurify.sanitize(reactMailTemplate, {
    USE_PROFILES: { html: true },
  });
}
