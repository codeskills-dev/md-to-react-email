import * as React from "react";
import { StylesType } from "../types";
import { parseMarkdownToReactEmailJSX } from "../utils";

interface ReactEmailMarkdownProps {
  markdown: string;
  markdownCustomStyles?: StylesType;
  markdownContainerStyles?: React.CSSProperties;
  showDataAttributes?: boolean;
}

export const ReactEmailMarkdown: React.FC<ReactEmailMarkdownProps> = ({
  markdown,
  markdownCustomStyles,
  markdownContainerStyles,
  showDataAttributes = true,
}) => {
  const parsedMarkdown = parseMarkdownToReactEmailJSX({
    markdown,
    customStyles: markdownCustomStyles,
    withDataAttr: showDataAttributes,
  });

  return (
    <div
      style={markdownContainerStyles}
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    />
  );
};
