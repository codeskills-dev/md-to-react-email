import { CSSProperties } from "react";

export type StylesType = {
  h1: CSSProperties | undefined;
  h2: CSSProperties | undefined;
  h3: CSSProperties | undefined;
  h4: CSSProperties | undefined;
  h5: CSSProperties | undefined;
  h6: CSSProperties | undefined;
  blockQuote: CSSProperties | undefined;
  bold: CSSProperties | undefined;
  italic: CSSProperties | undefined;
  link: CSSProperties | undefined;
  codeBlock: CSSProperties | undefined;
  codeInline: CSSProperties | undefined;
  p: CSSProperties | undefined;
  li: CSSProperties | undefined;
  ul: CSSProperties | undefined;
  image: CSSProperties | undefined;
  br: CSSProperties | undefined;
  hr: CSSProperties | undefined;
};

export type Patterns = {
  h1: RegExp | undefined;
  h2: RegExp | undefined;
  h3: RegExp | undefined;
  h4: RegExp | undefined;
  h5: RegExp | undefined;
  h6: RegExp | undefined;
  blockQuote: RegExp | undefined;
  bold: RegExp | undefined;
  italic: RegExp | undefined;
  link: RegExp | undefined;
  codeBlock: RegExp | undefined;
  codeInline: RegExp | undefined;
  p: RegExp | undefined;
  li: RegExp | undefined;
  ul: RegExp | undefined;
  image: RegExp | undefined;
  br: RegExp | undefined;
  hr: RegExp | undefined;
};
