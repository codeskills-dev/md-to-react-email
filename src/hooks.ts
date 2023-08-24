import DOMPurify from "isomorphic-dompurify";

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if ("target" in node) {
    node.setAttribute("target", "_blank");
  }
});

function preprocess(markdown: string) {
  return markdown;
}

function postprocess(html: string): string {
  return DOMPurify.sanitize(html);
}

export const hooks = { preprocess, postprocess };
