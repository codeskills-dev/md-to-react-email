import { marked, RendererObject } from "marked";
import { StylesType } from "./types";
import { initRenderer } from "./utils";
import { hooks } from "./hooks";

export class MarkdownParser {
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
    marked.use({
      renderer: this.renderer,
      hooks,
    });

    return marked.parse(markdown);
  }
}
