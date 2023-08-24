import { marked, RendererObject } from "marked";
import { StylesType } from "./types";
// import { styles } from "./styles";
import { CSSProperties } from "react";
// import { parseCssInJsToInlineCss } from "./utils";

function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined
): string {
  if (!cssProperties) return "";

  return Object.entries(cssProperties)
    .map(([property, value]) => `${camelToKebabCase(property)}:${value}`)
    .join(";");
}

interface initRendererProps {
  customStyles?: StylesType;
  withDataAttr?: boolean;
}

const initRenderer = ({
  customStyles,
  withDataAttr = false,
}: initRendererProps): RendererObject => {
  const finalStyles = { ...{}, ...customStyles };

  const customRenderer: RendererObject = {
    heading(text, level) {
      return `<h${level}${
        parseCssInJsToInlineCss(
          finalStyles[`h${level}` as keyof StylesType]
        ) !== ""
          ? ` style="${parseCssInJsToInlineCss(
              finalStyles[`h${level}` as keyof StylesType]
            )}"`
          : ""
      }${
        withDataAttr ? ' data-id="react-email-heading"' : ""
      }>${text}</h${level}>`;
    },
  };

  return customRenderer;
};

class MarkdownParser {
  private readonly renderer: RendererObject;

  constructor({
    customStyles,
    withDataAttr,
  }: {
    customStyles?: StylesType;
    withDataAttr?: boolean;
  }) {
    this.renderer = initRenderer({ customStyles, withDataAttr });
  }

  parse(markdown: string) {
    marked.use({ renderer: this.renderer });
    return marked.parse(markdown);
  }
}

const x = new MarkdownParser({
  customStyles: { h1: { fontWeight: "bold" } },
  withDataAttr: true,
});
console.log(x.parse("# Hello World!"));

/**
 code(string code, string infostring, boolean escaped)
blockquote(string quote)
html(string html, boolean block)
hr()
list(string body, boolean ordered, number start)
listitem(string text, boolean task, boolean checked)
checkbox(boolean checked)
paragraph(string text)
table(string header, string body)
tablerow(string content)
tablecell(string content, object flags)
Inline-level renderer methods
strong(string text)
em(string text)
codespan(string code)
br()
del(string text)
link(string href, string title, string text)
image(string href, string title, string text)
text(string text)
 */
