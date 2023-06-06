# Project breakdown

## Functions:

- `camelToKebabCase`: converts strings from camelcase ['thisIsCamelCase'] to kebab case ['this-is-kebab-case']
- `parseCssInJsToInlineCss`: converts css styles from css-in-js to inline css e.g fontSize: "18px" => font-size: 18px;
- `parseMarkdownToReactEmail`: parses markdown to a valid react-email string that can be copied and pasted directly into your codebase
- `parseMarkdownToReactEmailJSX`: parses markdown to valid react-email JSX for the client (i.e the browser)

## Components:

- `ReactEmailMarkdown`: a react-email component that takes in markdown input and parses it directly in your code base

## Usage:

- Directly as react-email component

```
import {ReactEmailMarkdown} from "md-to-react-email"

export default function EmailTemplate() {
  return (
    <Email>
        <Head />
        <Section>
            <ReactEmailMarkdown markdown={`# Hello, World!`} />
        </Section>
    </Email>
    )
  }
```

- Directly into react-email template

```
import {parseMarkdownToReactEmailJSX} from "md-to-react-email"

const markdown = `# Hello World`
const parsedReactMail = parseMarkdownToReactEmail(markdown)

console.log(parsedReactMail) // `<Heading as="h1" style="...valid inline CSS..."></Heading>`

```

- For code generation (copy and paste)

```
import {parseMarkdownToReactEmail} from "md-to-react-email"

const markdown = `# Hello World`
const parsedReactMail = parseMarkdownToReactEmail(markdown)

console.log(parsedReactMail) // `<Heading as="h1" style={...styles go here...}></Heading>`

```
