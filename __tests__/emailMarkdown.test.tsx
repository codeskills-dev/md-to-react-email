import React from "react";
import { render } from "@react-email/render";
import { EmailMarkdown } from "../src";

describe("ReactEmailMarkdown component renders correctly", () => {
  it.failing("renders the markdown in the correct format for browsers", () => {
    const actualOutput = render(
      <EmailMarkdown
        markdown={`# Hello, World!
## Hi, World`}
        markdownCustomStyles={{
          h1: { font: '700 23px / 32px "Roobert PRO", system-ui, sans-serif' },
          h2: { background: 'url("path/to/image")' },
        }}
      />
    );

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div><h1 style="font:700 23px / 32px 'Roobert PRO', system-ui, sans-serif">Hello, World!</h1><h2 style="background:url('path/to/image')">Hi, World</h2></div>"`
    );
  });
});
