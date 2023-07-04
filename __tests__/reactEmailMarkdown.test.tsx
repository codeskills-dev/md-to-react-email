import React from "react";
import { render } from "@react-email/render";
import { ReactEmailMarkdown } from "../src/components";

describe("ReactEmailMarkdown component renders correctly", () => {
  it("renders the markdown in the correct format for browsers", () => {
    const actualOutput = render(
      <ReactEmailMarkdown markdown={`# Hello, World!`} />
    );
    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div><h1 style="font-weight:500;padding-top:20;font-size:2.5rem" data-id="react-email-heading">Hello, World!</h1></div>"`
    );
  });
});
