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
exports.styles = void 0;
var emptyStyle = {};
var baseHeaderStyles = {
    fontWeight: "500",
    paddingTop: 20,
};
var h1 = __assign(__assign({}, baseHeaderStyles), { fontSize: "2.5rem" });
var h2 = __assign(__assign({}, baseHeaderStyles), { fontSize: "2rem" });
var h3 = __assign(__assign({}, baseHeaderStyles), { fontSize: "1.75rem" });
var h4 = __assign(__assign({}, baseHeaderStyles), { fontSize: "1.5rem" });
var h5 = __assign(__assign({}, baseHeaderStyles), { fontSize: "1.25rem" });
var h6 = __assign(__assign({}, baseHeaderStyles), { fontSize: "1rem" });
var bold = {
    fontWeight: "bold",
};
var italic = {
    fontStyle: "italic",
};
var blockQuote = {
    background: "#f9f9f9",
    borderLeft: "10px solid #ccc",
    margin: "1.5em 10px",
    padding: "1em 10px",
};
var codeInline = {
    color: "#212529",
    fontSize: "87.5%",
    display: "inline",
    background: " #f8f8f8",
    fontFamily: "SFMono-Regular,Menlo,Monaco,Consolas,monospace",
};
var codeBlock = __assign(__assign({}, codeInline), { paddingTop: 10, paddingRight: 10, paddingLeft: 10, paddingBottom: 1, marginBottom: 20, background: " #f8f8f8" });
var link = {
    color: "#007bff",
    textDecoration: "underline",
    backgroundColor: "transparent",
};
exports.styles = {
    h1: h1,
    h2: h2,
    h3: h3,
    h4: h4,
    h5: h5,
    h6: h6,
    blockQuote: blockQuote,
    bold: bold,
    italic: italic,
    link: link,
    codeBlock: __assign(__assign({}, codeBlock), { wordWrap: "break-word" }),
    codeInline: __assign(__assign({}, codeInline), { wordWrap: "break-word" }),
    p: emptyStyle,
    li: emptyStyle,
    ul: emptyStyle,
    image: emptyStyle,
    br: emptyStyle,
    hr: emptyStyle,
    table: emptyStyle,
    thead: emptyStyle,
    tbody: emptyStyle,
    th: emptyStyle,
    td: emptyStyle,
    tr: emptyStyle,
    strikethrough: emptyStyle,
};
