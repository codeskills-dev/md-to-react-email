import { marked, Renderer } from "marked";
import { StylesType } from "./types";
import { initRenderer } from "./utils";

export class MarkdownParser {
  private readonly renderer: Renderer;

  constructor({ customStyles }: { customStyles?: StylesType }) {
    this.renderer = initRenderer({ customStyles });
  }

  parse(markdown: string) {
    return marked.parse(markdown, {
      renderer: this.renderer,
      async: false,
    });
  }
}
