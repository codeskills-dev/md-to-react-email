# md-to-react-email

Read the documentation [here](https://md2re.codeskills.dev/)

## Description

md-to-react-email is a lightweight utility for converting [Markdown](https://www.markdownguide.org/) into valid JSX that can be used in [React-email](https://react.email) or [JSX-email](https://jsx.email) templates. This tool simplifies the process of creating responsive and customizable email templates by leveraging the power of React and Markdown.

**Note**: Starting from `version 4`, `md-to-react-email` uses [`Marked`](https://marked.js.org/) for markdown transformation. see all changes [here](/CHANGELOG.md)

### Support

The following markdown flavors are supported

- Offical markdown flavour

## Installation

Install from your command line.

#### With yarn

```sh
yarn add md-to-react-email
```

#### With npm

```sh
npm install md-to-react-email
```

## Features

### Functions:

- `camelToKebabCase`: converts strings from camelcase ['thisIsCamelCase'] to kebab case ['this-is-kebab-case']
- `parseCssInJsToInlineCss`: converts css styles from css-in-js to inline css e.g fontSize: "18px" => font-size: 18px;
- `parseMarkdownToJSX`: parses markdown to valid JSX for the client (i.e the browser)

### Components:

- `EmailMarkdown`: a react component that takes in markdown input and parses it directly in your code base

## Usage:

- Directly as [`React-email`](https://react.email) or [`JSX-email`](https://jsx.email) component

        ```
        import {EmailMarkdown} from "md-to-react-email"

        export default function EmailTemplate() {
        return (
                <Email>
                        <Head />
                        <Section>
                        <EmailMarkdown markdown={`# Hello, World!`} />
                        </Section>
                </Email>
        )
        }
        ```

- Directly into react-email template

        ```
        import {parseMarkdownToJSX} from "md-to-react-email"

        const markdown = `# Hello World`
        const parsedReactMail = parseMarkdownToJSX({markdown})

        console.log(parsedReactMail) // `<h1 style="...valid inline CSS...">Hello, World!</h1>`
        ```

## Components

md-to-react-email contains pre-defined react and html components for the email template structure and styling. You can modify these components to customize the look and feel of your email template.

The following components are available for customization:

- Headers (h1 - h6)
- BlockQuotes
- Text: paragraphs, bold and italic text
- Links
- Code: Code blocks and inline code
- Lists: ul, ol, li
- Image
- Line-breaks (br)
- Horizontal-rule (hr)
- Table: table, thead, tbody, th, td, tr
- Strikethrough

## Supported Email Clients

The provided React components and default styling are designed to work well across various email clients and providers. However, due to the inconsistent support for modern web standards in different email clients, it's recommended to test your email templates in multiple clients to ensure compatibility.

The following email clients are known to be supported:

- Gmail
- Apple Mail
- Outlook (desktop and web)
- Yahoo Mail
- HEY Mail
- Super Human

| <img src="https://react.email/static/icons/gmail.svg" width="48px" height="48px" alt="Gmail logo"> | <img src="https://react.email/static/icons/apple-mail.svg" width="48px" height="48px" alt="Apple Mail"> | <img src="https://react.email/static/icons/outlook.svg" width="48px" height="48px" alt="Outlook logo"> | <img src="https://react.email/static/icons/yahoo-mail.svg" width="48px" height="48px" alt="Yahoo! Mail logo"> | <img src="https://react.email/static/icons/hey.svg" width="48px" height="48px" alt="HEY logo"> | <img src="https://react.email/static/icons/superhuman.svg" width="48px" height="48px" alt="Superhuman logo"> |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Gmail ✔                                                                                            | Apple Mail ✔                                                                                            | Outlook ✔                                                                                              | Yahoo! Mail ✔                                                                                                 | HEY ✔                                                                                          | Superhuman ✔                                                                                                 |

## Contributing

Contributions to md-to-react-email are welcome! If you find a bug, have suggestions for improvements, or want to add new features, feel free to open an issue or submit a pull request. Please make sure to follow the existing coding style and conventions.

When submitting a pull request, provide a clear description of the changes made and ensure that all tests pass. Adding appropriate tests for new features or bug fixes is highly appreciated.

## Bugs and Feature Requests

For bugs and feature requests, [please create an issue](https://github.com/codeskills-dev/md-to-react-mail/issues/new/choose).

## Author

- Paul Ehikhuemen ([@pauloe_me](https://twitter.com/pauloe_me))

## License

`md-to-react-email` is licensed under the MIT License.
