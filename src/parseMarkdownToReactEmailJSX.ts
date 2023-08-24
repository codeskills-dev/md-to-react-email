import { MarkdownParser } from "./parser";
import { StylesType } from "./types";

export type ParseMarkdownToReactEmailJSXProps = {
  markdown: string;
  customStyles?: StylesType;
  withDataAttr?: boolean;
};

export const parseMarkdownToReactEmailJSX = ({
  markdown,
  customStyles,
  withDataAttr,
}: ParseMarkdownToReactEmailJSXProps) => {
  const parser = new MarkdownParser({ customStyles, withDataAttr });
  return parser.parse(markdown);
};
