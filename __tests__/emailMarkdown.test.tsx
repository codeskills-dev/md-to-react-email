import React from "react";
import { render } from "@react-email/render";
import { EmailMarkdown } from "../src";

describe("ReactEmailMarkdown component renders correctly", () => {
  it("renders the markdown in the correct format for browsers", () => {
    const actualOutput = render(<EmailMarkdown markdown={`# Hello, World!`} />);
    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div><h1 style="font-weight:500;padding-top:20px;font-size:2.5rem">Hello, World!</h1></div>"`
    );
  });
});
