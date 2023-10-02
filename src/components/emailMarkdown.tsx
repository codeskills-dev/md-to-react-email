import * as React from "react";
import { StylesType } from "../types";
import { parseMarkdownToJSX } from "../parseMarkdownToJSX";

interface EmailMarkdownProps {
  markdown: string;
  markdownCustomStyles?: StylesType;
  markdownContainerStyles?: React.CSSProperties;
}

export const EmailMarkdown: React.FC<EmailMarkdownProps> = ({
  markdown,
  markdownCustomStyles,
  markdownContainerStyles,
}) => {
  const parsedMarkdown = parseMarkdownToJSX({
    markdown,
    customStyles: markdownCustomStyles,
  });

  return (
    <div
      style={markdownContainerStyles}
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    />
  );
};
