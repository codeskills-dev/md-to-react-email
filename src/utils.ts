import { CSSProperties } from "react";
import { StylesType, initRendererProps } from "./types";
import { Renderer } from "marked";
import { styles } from "./styles";

function escapeQuotes(value: unknown) {
  if (typeof value === "string" && value.includes('"')) {
    return value.replace(/"/g, "&#x27;");
  }
  return value;
}

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined
): string {
  if (!cssProperties) return "";

  const numericalCssProperties = [
    "width",
    "height",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "outlineWidth",
    "top",
    "right",
    "bottom",
    "left",
    "fontSize",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "maxWidth",
    "minWidth",
    "maxHeight",
    "minHeight",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "textIndent",
    "gridColumnGap",
    "gridRowGap",
    "gridGap",
    "translateX",
    "translateY",
  ];

  return Object.entries(cssProperties)
    .map(([property, value]) => {
      if (
        typeof value === "number" &&
        numericalCssProperties.includes(property)
      ) {
        return `${camelToKebabCase(property)}:${value}px`;
      } else {
        const escapedValue = escapeQuotes(value);
        return `${camelToKebabCase(property)}:${escapedValue}`;
      }
    })
    .join(";");
}

export const initRenderer = ({ customStyles }: initRendererProps) => {
  const finalStyles = { ...styles, ...customStyles };

  const customRenderer = new Renderer();

  customRenderer.blockquote = ({ tokens }) => {
    const text = customRenderer.parser.parse(tokens);

    return `<blockquote${
      parseCssInJsToInlineCss(finalStyles.blockQuote) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"`
        : ""
    }>\n${text}</blockquote>\n`;
  };

  customRenderer.br = () => {
    return `<br${
      parseCssInJsToInlineCss(finalStyles.br) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"`
        : ""
    } />`;
  };

  // TODO: Support all options
  customRenderer.code = ({ text }) => {
    text = text.replace(/\n$/, "") + "\n";

    return `<pre${
      parseCssInJsToInlineCss(finalStyles.codeBlock) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"`
        : ""
    }><code>${text}</code></pre>\n`;
  };

  customRenderer.codespan = ({ text }) => {
    return `<code${
      parseCssInJsToInlineCss(finalStyles.codeInline) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"`
        : ""
    }>${text}</code>`;
  };

  customRenderer.del = ({ tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<del${
      parseCssInJsToInlineCss(finalStyles.strikethrough) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"`
        : ""
    }>${text}</del>`;
  };

  customRenderer.em = ({ tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<em${
      parseCssInJsToInlineCss(finalStyles.italic) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"`
        : ""
    }>${text}</em>`;
  };

  customRenderer.heading = ({ tokens, depth }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<h${depth}${
      parseCssInJsToInlineCss(finalStyles[`h${depth}` as keyof StylesType]) !==
      ""
        ? ` style="${parseCssInJsToInlineCss(
            finalStyles[`h${depth}` as keyof StylesType]
          )}"`
        : ""
    }>${text}</h${depth}>`;
  };

  customRenderer.hr = () => {
    return `<hr${
      parseCssInJsToInlineCss(finalStyles.hr) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"`
        : ""
    } />\n`;
  };

  customRenderer.image = ({ href, text, title }) => {
    return `<img src="${href}" alt="${text}"${
      title ? ` title="${title}"` : ""
    }${
      parseCssInJsToInlineCss(finalStyles.image) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"`
        : ""
    }>`;
  };

  customRenderer.link = ({ href, title, tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<a href="${href}" target="_blank"${
      title ? ` title="${title}"` : ""
    }${
      parseCssInJsToInlineCss(finalStyles.link) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"`
        : ""
    }>${text}</a>`;
  };

  customRenderer.listitem = ({ tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<li${
      parseCssInJsToInlineCss(finalStyles.li) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
        : ""
    }>${text}</li>\n`;
  };

  customRenderer.list = ({ items, ordered, start }) => {
    const type = ordered ? "ol" : "ul";
    const startAt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    const styles = parseCssInJsToInlineCss(finalStyles[ordered ? "ol" : "ul"]);

    return (
      "<" +
      type +
      startAt +
      `${styles !== "" ? ` style="${styles}"` : ""}>\n` +
      items.map((item) => customRenderer.listitem(item)).join("") +
      "</" +
      type +
      ">\n"
    );
  };

  customRenderer.paragraph = ({ tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<p${
      parseCssInJsToInlineCss(finalStyles.p) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"`
        : ""
    }>${text}</p>\n`;
  };

  customRenderer.strong = ({ tokens }) => {
    const text = customRenderer.parser.parseInline(tokens);

    return `<strong${
      parseCssInJsToInlineCss(finalStyles.bold) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"`
        : ""
    }>${text}</strong>`;
  };

  customRenderer.table = ({ header, rows }) => {
    const styleTable = parseCssInJsToInlineCss(finalStyles.table);
    const styleThead = parseCssInJsToInlineCss(finalStyles.thead);
    const styleTbody = parseCssInJsToInlineCss(finalStyles.tbody);

    const theadRow = customRenderer.tablerow({
      text: header.map((cell) => customRenderer.tablecell(cell)).join(""),
    });

    const tbodyRows = rows
      .map((row) =>
        customRenderer.tablerow({
          text: row.map((cell) => customRenderer.tablecell(cell)).join(""),
        })
      )
      .join("");

    const thead = `<thead${styleThead ? ` style="${styleThead}"` : ""}>\n${theadRow}</thead>`;
    const tbody = `<tbody${styleTbody ? ` style="${styleTbody}"` : ""}>${tbodyRows}</tbody>`;

    return `<table${styleTable ? ` style="${styleTable}"` : ""}>\n${thead}\n${tbody}</table>\n`;
  };

  customRenderer.tablecell = ({ tokens, align, header }) => {
    const text = customRenderer.parser.parseInline(tokens);
    const type = header ? "th" : "td";
    const tag = align
      ? `<${type} align="${align}"${
          parseCssInJsToInlineCss(finalStyles.td) !== ""
            ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
            : ""
        }>`
      : `<${type}${
          parseCssInJsToInlineCss(finalStyles.td) !== ""
            ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
            : ""
        }>`;
    return tag + text + `</${type}>\n`;
  };

  customRenderer.tablerow = ({ text }) => {
    return `<tr${
      parseCssInJsToInlineCss(finalStyles.tr) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
        : ""
    }>\n${text}</tr>\n`;
  };

  return customRenderer;
};
