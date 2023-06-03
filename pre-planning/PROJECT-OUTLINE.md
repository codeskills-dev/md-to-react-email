# Project breakdown

### Note: This is a non opinionated project.

- Create some basic styles for all our components

  - Headers h1-h6
  - Paragraphs
  - Quotes
  - Lists - ordered and unordered
  - Code Blocks
  - Images
  - Horizontal Rules
  - Line breaks
  - Links

- ReactMail (rm)
- Input markdown (md)
- Function mdToRm
- Output valid RM e.g (# A boy => <Text style={{...header1}}>A boy</Text>)

# General file structure

- Styles file(css-in-js): contains all the basic styles

  > CSS<br>
  > .header{<br>
  > font-size: 16px<br>
  > }<br> ><br>
  > CSS-in-JS<br>
  > const header = {<br>
  > fontSize: 16<br>
  > }<br>

- Index.js: one function that takes in md and spits out rm with styles already in place
