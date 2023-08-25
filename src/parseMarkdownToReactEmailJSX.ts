import { MarkdownParser } from "./parser";
import { ParseMarkdownToReactEmailJSXProps } from "./types";

export const parseMarkdownToReactEmailJSX = ({
  markdown,
  customStyles,
  withDataAttr,
}: ParseMarkdownToReactEmailJSXProps) => {
  const parser = new MarkdownParser({ customStyles, withDataAttr });
  return parser.parse(markdown);
};
