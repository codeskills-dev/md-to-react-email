import { camelToKebabCase } from "../src/utils";

describe("camelToKebabCase", () => {
  it("should convert camel case to kebab case", () => {
    expect(camelToKebabCase("helloWorld")).toBe("hello-world");
    expect(camelToKebabCase("helloWorldTest")).toBe("hello-world-test");
    expect(camelToKebabCase("helloWorld123")).toBe("hello-world123");
    expect(camelToKebabCase("HelloWorld")).toBe("hello-world");
    expect(camelToKebabCase("Hello1World")).toBe("hello1-world");
    expect(camelToKebabCase("h")).toBe("h");
    expect(camelToKebabCase("H")).toBe("h");
    expect(camelToKebabCase("")).toBe("");
  });

  it("should handle edge cases and special characters", () => {
    expect(camelToKebabCase("helloWorld_")).toBe("hello-world_");
    expect(camelToKebabCase("Hello")).toBe("hello");
    expect(camelToKebabCase("World")).toBe("world");
    expect(camelToKebabCase("hello123World")).toBe("hello123-world");
    expect(camelToKebabCase("H")).toBe("h");
    expect(camelToKebabCase("123")).toBe("123");
    expect(camelToKebabCase("aBc")).toBe("a-bc");
    expect(camelToKebabCase("aBcD")).toBe("a-bc-d");
    expect(camelToKebabCase("abcDefGhi")).toBe("abc-def-ghi");
  });
});
