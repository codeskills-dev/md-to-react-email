"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownToReactEmailJSX = exports.parseMarkdownToReactEmail = exports.parseCssInJsToInlineCss = exports.camelToKebabCase = void 0;
// import DOMPurify from "isomorphic-dompurify";
var patterns_1 = require("./patterns");
var styles_1 = require("./styles");
// // hook to handle target="_blank" in all links
// DOMPurify.addHook("afterSanitizeAttributes", (node) => {
//   if ("target" in node) {
//     node.setAttribute("target", "_blank");
//   }
// });
function camelToKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
exports.camelToKebabCase = camelToKebabCase;
function parseCssInJsToInlineCss(cssProperties) {
    if (!cssProperties)
        return "";
    return Object.entries(cssProperties)
        .map(function (_a) {
        var property = _a[0], value = _a[1];
        return "".concat(camelToKebabCase(property), ":").concat(value);
    })
        .join(";");
}
exports.parseCssInJsToInlineCss = parseCssInJsToInlineCss;
function parseMarkdownToReactEmail(markdown, customStyles) {
    var finalStyles = __assign(__assign({}, styles_1.styles), customStyles);
    var reactMailTemplate = "";
    // Handle paragraphs
    reactMailTemplate = markdown.replace(patterns_1.patterns.p, "<Text style={".concat(JSON.stringify(finalStyles.p), "}>$1</Text>"));
    // Handle headings (e.g., # Heading)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h1, "<Heading as=\"h1\" style={".concat(JSON.stringify(finalStyles.h1), "}>$1</Heading>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h2, "<Heading as=\"h2\" style={".concat(JSON.stringify(finalStyles.h2), "}>$1</Heading>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h3, "<Heading as=\"h3\" style={".concat(JSON.stringify(finalStyles.h3), "}>$1</Heading>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h4, "<Heading as=\"h4\" style={".concat(JSON.stringify(finalStyles.h4), "}>$1</Heading>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h5, "<Heading as=\"h5\" style={".concat(JSON.stringify(finalStyles.h5), "}>$1</Heading>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h6, "<Heading as=\"h6\" style={".concat(JSON.stringify(finalStyles.h6), "}>$1</Heading>"));
    // Handle Tables from GFM
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.table, function (match) {
        var rows = match.trim().split("\n");
        var headers = rows[0]
            .split("|")
            .slice(1, -1)
            .map(function (cell) { return cell.trim(); });
        var alignments = rows[1]
            .split("|")
            .slice(1, -1)
            .map(function (cell) {
            var align = cell.trim().toLowerCase();
            return align === ":--"
                ? "left"
                : align === "--:"
                    ? "right"
                    : "center";
        });
        var body = rows
            .slice(2)
            .map(function (row) {
            var cells = row
                .split("|")
                .slice(1, -1)
                .map(function (cell) { return cell.trim(); });
            return "<tr style={".concat(JSON.stringify(finalStyles.tr), "}>").concat(cells
                .map(function (cell, index) {
                return "<td style={".concat(JSON.stringify(finalStyles.td), "} align=\"").concat(alignments[index], "\">").concat(cell, "</td>");
            })
                .join(""), "</tr>");
        })
            .join("");
        var table = "<table style={".concat(JSON.stringify(finalStyles.table), "}><thead style={").concat(JSON.stringify(finalStyles.thead), "}><tr style={").concat(JSON.stringify(finalStyles.tr), "}>").concat(headers
            .map(function (header, index) {
            return "<th style={".concat(JSON.stringify(finalStyles.th), "} align=\"").concat(alignments[index], "\">").concat(header, "</th>");
        })
            .join(""), "</tr></thead><tbody style={").concat(JSON.stringify(finalStyles.tbody), "}>").concat(body, "</tbody></table>");
        return table;
    });
    // Handle strikethrough
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.strikethrough, "<del style={".concat(JSON.stringify(finalStyles.strikethrough), "}>$1</del>"));
    // Handle bold text (e.g., **bold**)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.bold, "<Text style={".concat(JSON.stringify(finalStyles.bold), "}>$1</Text>"));
    // Handle italic text (e.g., *italic*)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.italic, "<Text style={".concat(JSON.stringify(finalStyles.italic), "}>$1</Text>"));
    // Handle lists (unordered and ordered)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.li, "<li style={".concat(JSON.stringify(finalStyles.li), "}>$1</li>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.ul, "<ul style={".concat(JSON.stringify(finalStyles.ul), "}>$&</ul>"));
    // Handle images (e.g., ![alt text](url))
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.image, "<Img style={".concat(JSON.stringify(finalStyles.image), "} alt=\"$1\" src=\"$2\" />"));
    // Handle links (e.g., [link text](url))
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.link, "<Link href=\"$2\" style={".concat(JSON.stringify(finalStyles.link), "}>$1</Link>"));
    // Handle code blocks (e.g., ```code```)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.codeBlocks, "<pre style={".concat(JSON.stringify(finalStyles.codeBlock), "}><Text>").concat("{`$1`}", "</Text></pre>"));
    // Handle inline code (e.g., `code`)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.codeInline, "<Text style={".concat(JSON.stringify(finalStyles.codeInline), "}>$1</Text>"));
    // Handle block quotes
    reactMailTemplate = reactMailTemplate.replace(/^>\s+(.+)$/gm, "<Text style={".concat(JSON.stringify(finalStyles.blockQuote), "}>$1</Text>"));
    // Handle line breaks (e.g., <br />)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.br, "<br style={".concat(JSON.stringify(finalStyles.br), "} />"));
    // Handle horizontal rules (e.g., ---)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.hr, "<Hr style={".concat(JSON.stringify(finalStyles.hr), "} />"));
    // Wrap content in a section tag
    reactMailTemplate = "<Section>".concat(reactMailTemplate, "</Section>");
    return reactMailTemplate;
}
exports.parseMarkdownToReactEmail = parseMarkdownToReactEmail;
function parseMarkdownToReactEmailJSX(_a) {
    var markdown = _a.markdown, customStyles = _a.customStyles, _b = _a.withDataAttr, withDataAttr = _b === void 0 ? false : _b;
    if (markdown === undefined ||
        markdown === null ||
        markdown === "" ||
        typeof markdown !== "string") {
        return "";
    }
    var finalStyles = __assign(__assign({}, styles_1.styles), customStyles);
    var reactMailTemplate = "";
    // Handle inline code (e.g., `code`)
    reactMailTemplate = markdown.replace(patterns_1.patterns.codeInline, "<pre".concat(parseCssInJsToInlineCss(finalStyles.codeInline) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.codeInline), "\"")
        : "", ">$2</pre>"));
    // Handle code blocks (e.g., ```code```)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.codeBlocks, function (_, codeContent) {
        var indentedCodeContent = codeContent
            .split("\n")
            .map(function (line) { return "  ".concat(line); })
            .join("\n");
        return "<pre".concat(parseCssInJsToInlineCss(finalStyles.codeBlock) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.codeBlock), "\"")
            : "", ">\n").concat(indentedCodeContent, "\n</pre>");
    });
    // Handle blockquotes
    function parseMarkdownWithBlockQuotes(markdown) {
        var blockquoteRegex = /^(>\s*((?:.+\n?)+))(?!\n(?=>\s))/gm;
        function parseBlockQuote(match) {
            var nestedContent = match.replace(/^>\s*/gm, "");
            var nestedHTML = parseMarkdownWithBlockQuotes(nestedContent);
            return "<blockquote".concat(parseCssInJsToInlineCss(finalStyles.blockQuote) !== ""
                ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.blockQuote), "\"")
                : "", ">\n").concat(nestedHTML, "\n</blockquote>");
        }
        return markdown.replace(blockquoteRegex, parseBlockQuote);
    }
    reactMailTemplate = parseMarkdownWithBlockQuotes(reactMailTemplate);
    // Handle paragraphs
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.p, "<p".concat(parseCssInJsToInlineCss(finalStyles.p) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.p), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-text"' : "", ">$1</p>"));
    // Handle headings (e.g., # Heading)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h1, "<h1".concat(parseCssInJsToInlineCss(finalStyles.h1) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h1), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h1>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h2, "<h2".concat(parseCssInJsToInlineCss(finalStyles.h2) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h2), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h2>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h3, "<h3".concat(parseCssInJsToInlineCss(finalStyles.h3) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h3), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h3>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h4, "<h4".concat(parseCssInJsToInlineCss(finalStyles.h4) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h4), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h4>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h5, "<h5".concat(parseCssInJsToInlineCss(finalStyles.h5) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h5), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h5>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.h6, "<h6".concat(parseCssInJsToInlineCss(finalStyles.h6) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.h6), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-heading"' : "", ">$1</h6>"));
    // Handle Tables from GFM
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.table, function (match) {
        var rows = match.trim().split("\n");
        var headers = rows[0]
            .split("|")
            .slice(1, -1)
            .map(function (cell) { return cell.trim(); });
        var alignments = rows[1]
            .split("|")
            .slice(1, -1)
            .map(function (cell) {
            var align = cell.trim().toLowerCase();
            return align === ":--"
                ? "left"
                : align === "--:"
                    ? "right"
                    : "center";
        });
        var body = rows
            .slice(2)
            .map(function (row) {
            var cells = row
                .split("|")
                .slice(1, -1)
                .map(function (cell) { return cell.trim(); });
            return "<tr".concat(parseCssInJsToInlineCss(finalStyles.tr) !== ""
                ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.tr), "\"")
                : "", ">").concat(cells
                .map(function (cell, index) {
                return "<td  align=\"".concat(alignments[index], "\"").concat(parseCssInJsToInlineCss(finalStyles.td) !== ""
                    ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.td), "\"")
                    : "", ">").concat(cell, "</td>");
            })
                .join(""), "</tr>");
        })
            .join("");
        var table = "<table".concat(parseCssInJsToInlineCss(finalStyles.table) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.table), "\"")
            : "", "><thead").concat(parseCssInJsToInlineCss(finalStyles.thead) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.thead), "\"")
            : "", "><tr").concat(parseCssInJsToInlineCss(finalStyles.tr) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.tr), "\"")
            : "", ">").concat(headers
            .map(function (header, index) {
            return "<th align=\"".concat(alignments[index], "\"").concat(parseCssInJsToInlineCss(finalStyles.th) !== ""
                ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.th), "\"")
                : "", ">").concat(header, "</th>");
        })
            .join(""), "</tr></thead><tbody").concat(parseCssInJsToInlineCss(finalStyles.tbody) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.tbody), "\"")
            : "", ">").concat(body, "</tbody></table>");
        return table;
    });
    // Handle strikethrough
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.strikethrough, "<del".concat(parseCssInJsToInlineCss(finalStyles.strikethrough) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.strikethrough), "\"")
        : "", ">$1</del>"));
    // Handle bold text (e.g., **bold**)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.bold, "<strong".concat(parseCssInJsToInlineCss(finalStyles.bold) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.bold), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-text"' : "", ">$1</strong>"));
    // Handle italic text (e.g., *italic*)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.italic, "<em".concat(parseCssInJsToInlineCss(finalStyles.italic) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.italic), "\"")
        : "").concat(withDataAttr ? ' data-id="react-email-text"' : "", ">$2</em>"));
    // Handle lists (unordered)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.li, "<li".concat(parseCssInJsToInlineCss(finalStyles.li) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.li), "\"")
        : "", ">$1</li>"));
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.ul, "<ul".concat(parseCssInJsToInlineCss(finalStyles.ul) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.ul), "\"")
        : "", ">$&</ul>"));
    // Handle lists (ordered)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.ol, function (match) {
        var listItems = match
            .split("\n")
            .map(function (line) {
            var listItemContent = line.replace(/^\d+\.\s+/, "");
            return listItemContent
                ? "<li".concat(parseCssInJsToInlineCss(finalStyles.li) !== ""
                    ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.li), "\"")
                    : "", ">").concat(listItemContent, "</li>")
                : "";
        })
            .join("\n");
        return "<ol".concat(parseCssInJsToInlineCss(finalStyles.ol) !== ""
            ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.ol), "\"")
            : "", ">").concat(listItems, "</ol>");
    });
    // Handle images (e.g., ![alt text](url))
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.image, "<img src=\"$2\" alt=\"$1\"".concat(parseCssInJsToInlineCss(finalStyles.image) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.image), "\"")
        : "", ">"));
    // Handle links (e.g., [link text](url))
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.link, "<a".concat(withDataAttr ? ' data-id="react-email-link"' : "").concat(parseCssInJsToInlineCss(finalStyles.link) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.link), "\"")
        : "", " href=\"$2\" target=\"_blank\" >$1</a>"));
    // Handle line breaks (e.g., <br />)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.br, "<br".concat(parseCssInJsToInlineCss(finalStyles.br) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.br), "\"")
        : "", "/>"));
    // Handle horizontal rules (e.g., ---)
    reactMailTemplate = reactMailTemplate.replace(patterns_1.patterns.hr, "<hr".concat(withDataAttr ? ' data-id="react-email-hr"' : "").concat(parseCssInJsToInlineCss(finalStyles.hr) !== ""
        ? " style=\"".concat(parseCssInJsToInlineCss(finalStyles.hr), "\"")
        : "", "/>"));
    return reactMailTemplate;
    // return DOMPurify.sanitize(reactMailTemplate, {
    //   USE_PROFILES: { html: true },
    // });
}
exports.parseMarkdownToReactEmailJSX = parseMarkdownToReactEmailJSX;
