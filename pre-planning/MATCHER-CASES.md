// Handle headings (e.g., # Heading)
(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  (/^##\s+(.+)$/gm, "<h2>$1</h2>");
  (/^###\s+(.+)$/gm, "<h3>$1</h3>");
  (/^####\s+(.+)$/gm, "<h4>$1</h4>");
  (/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  (/^######\s+(.+)$/gm, "<h6>$1</h6>");

// Handle paragraphs
(
/((\n|^)(?!\n)((?!<\/?(h|ul|ol|p|pre|div|blockquote)[>\s]).)+(\n|$)+)+/gm,
    "<p>$&</p>"
);

// Handle bold text (e.g., **bold**)
(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

// Handle italic text (e.g., _italic_)
(/\*(.+?)\*/g, "<em>$1</em>");

// Handle unordered lists
(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  (/<\/li>\n<li>/g, "</li><li>");
`<ul>${markdown}</ul>`;

// Handle ordered lists
(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>");
  (/<\/li>\n<li>/g, "</li><li>");
`<ol>${markdown}</ol>`;

// Handle links (e.g., [link text](url))
(/\[(.+?)\]\((.\*?)\)/g, '<a href="$2">$1</a>');

// Handle images (e.g., ![alt text](url))
(
/!\[(._?)\]\((._?)\)/g,
'<img src="$2" alt="$1">'
);

// Handle code blocks (e.g., `code`)
(/`(.+?)`/gs, "<pre><code>$1</code></pre>");

// Handle inline code (e.g., `code`)
(/`(.+?)`/g, "<code>$1</code>");

// Handle line breaks (e.g., <br />)
(/ \n/g, "<br />");

// Handle horizontal rules (e.g., ---)
(/^-{3,}$/gm, "<hr />");
