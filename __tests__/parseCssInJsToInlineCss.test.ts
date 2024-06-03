import { parseCssInJsToInlineCss } from "../src/utils";

describe("parseCssInJsToInlineCss", () => {
  test("should return an empty string for undefined CSS properties", () => {
    expect(parseCssInJsToInlineCss(undefined)).toBe("");
  });

  test("should parse CSS properties to inline CSS", () => {
    const cssProperties = {
      backgroundColor: "red",
      fontSize: "12px",
      paddingTop: "20px",
    };

    const expectedOutput =
      "background-color:red;font-size:12px;padding-top:20px";
    expect(parseCssInJsToInlineCss(cssProperties)).toBe(expectedOutput);
  });

  test("should handle CSS properties with mixed cases", () => {
    const cssProperties = {
      backgroundColor: "red",
      "Font-size": "12px",
      paddingTop: "20px",
    };

    const expectedOutput =
      "background-color:red;font-size:12px;padding-top:20px";
    expect(parseCssInJsToInlineCss(cssProperties)).toBe(expectedOutput);
  });

  test("should handle empty CSS properties object", () => {
    const cssProperties = {};
    expect(parseCssInJsToInlineCss(cssProperties)).toBe("");
  });

  test("should handle CSS properties with escaped quotes", () => {
    const cssProperties = {
      font: '700 23px / 32px "Roobert PRO", system-ui, sans-serif',
      background: "url('path/to/image')",
    };

    const expectedOutput =
      "font:700 23px / 32px &#x27;Roobert PRO&#x27;, system-ui, sans-serif;background:url('path/to/image')";
    expect(parseCssInJsToInlineCss(cssProperties)).toBe(expectedOutput);
  });
});
